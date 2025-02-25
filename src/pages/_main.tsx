import {
  optionsSubject,
  optionsYear,
  optionsLevel,
  optionsPeriod,
} from "../utils/options";
import { useState } from "react";
import { fetchFile } from "@/utils/fetch";
import { generateUrls } from "@/utils/generateUrls";
import ButtonComponent from "@/components/inputs/Button.tsx";
import Header from "@/components/layout/Header.tsx";
import Combobox from "@/components/inputs/Combobox.tsx";
import ErrorFooter from "@/components/footer/ErrorFooter";
import { Sun, Moon, HandCoins, Loader2 } from "lucide-react";
import "@/App.css";

const MainComponent = () => {
  const [subject, setSubject] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [isTask, setIsTask] = useState<boolean>(false);
  const [isGuide, setIsGuide] = useState<boolean>(false);
  const [isAudio, setIsAudio] = useState<boolean>(false);
  const [isZip, setIsZip] = useState<boolean>(false);
  const [isZipUt, setIsZipUt] = useState<boolean>(false);
  const [errormsg, setErrormsg] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastSearch, setLastSearch] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark" ? true : true;
  });

  const urls = generateUrls(year, period, level, subject);
  const isDisabled = !subject || !year || !period || !level;
  const searchKey = `${subject}-${year}-${period}-${level}`;

  const handleSearch = async () => {
    if(searchKey === lastSearch){
      return;
    }

    setIsLoading(true);
    setLastSearch(searchKey)
    
    setIsTask(false);
    setIsGuide(false);
    setIsAudio(false);
    setIsZip(false);
    setIsZipUt(false);
    setErrormsg(false);

    try {

      const baseSubjects = ["mat", "tort", "magyir"];
      const languageSubjects = ["angol", "nemet"];
      
      let results: boolean[] = [];

      if (baseSubjects.includes(subject)) {
        const [taskAvailable, guideAvailable] = await Promise.all([
          fetchFile(urls.task),
          fetchFile(urls.guide)
        ]);
        setIsTask(taskAvailable);
        setIsGuide(guideAvailable);
        results = [taskAvailable, guideAvailable];
      }

      else if (languageSubjects.includes(subject)) {
        const [taskAvailable, guideAvailable, audioAvailable] = await Promise.all([
          fetchFile(urls.task),
          fetchFile(urls.guide),
          fetchFile(urls.audio)
        ]);
        setIsTask(taskAvailable);
        setIsGuide(guideAvailable);
        setIsAudio(audioAvailable);
        results = [taskAvailable, guideAvailable, audioAvailable];
      }

      else if (subject === "digkult") {
        const [taskAvailable, guideAvailable, zipAvailable, zipUtAvailable] = await Promise.all([
          fetchFile(urls.task),
          fetchFile(urls.guide),
          fetchFile(urls.zip),
          fetchFile(urls.zipUt)
        ]);
        setIsTask(taskAvailable);
        setIsGuide(guideAvailable);
        setIsZip(zipAvailable);
        setIsZipUt(zipUtAvailable);
        results = [taskAvailable, guideAvailable, zipAvailable, zipUtAvailable];
      }

      setErrormsg(!results.some(result => result === true));
    } catch (error) {
      setErrormsg(true);
      console.error('Error fetching files:', error);
    } finally {
      setIsLoading(false);
    }  };

  const handleModes = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");

    if (newMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#070707";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
    }
  };

  return (
    <>
      <div className="absolute w-screen top-0 h-[10px] bg-indigo-500 blur-2xl"></div>
      <div className="min-h-screen w-screen flex flex-col justify-center items-center">
        <div
          className={`w-screen md:w-[500px] rounded md:border-r md:border-l ${
            darkMode
              ? "md:border-[#1f1f1f] text-[#dbdbdb]"
              : "md:border-[#b5b5b5] text-[#070707]"
          }`}
        >
          <Header darkMode={darkMode} />
          <section className="min-h-[450px] py-6 flex justify-center items-center gap-3 flex-col">
            <Combobox
              title="Tárgy"
              errorMsg="A tárgy nem elérhető"
              options={optionsSubject}
              onValueChange={setSubject}
              darkMode={darkMode}
            />
            <Combobox
              title="Év"
              errorMsg="Az év nem elérhető"
              options={optionsYear}
              onValueChange={setYear}
              darkMode={darkMode}
            />
            <Combobox
              title="Időszak"
              errorMsg="Az időszak nem elérhető"
              options={optionsPeriod}
              onValueChange={setPeriod}
              darkMode={darkMode}
            />
            <Combobox
              title="Szint"
              errorMsg="A szint nem elérhető"
              options={optionsLevel}
              onValueChange={setLevel}
              darkMode={darkMode}
            />
            <div className="flex flex-col gap-2 justify-center items-center mt-2">
              <ButtonComponent
                onClick={handleSearch}
                disabled={isDisabled || searchKey === lastSearch}
                darkMode={darkMode}
                title={isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Keresés...
                  </div>
                ) : (
                  "Keresés"
                )}
              />
            </div>
          </section>
          <footer
            className={`min-h-[80px] p-4 rounded-b border-b border-t flex justify-center items-center gap-3 flex-wrap ${
              darkMode ? "border-[#1f1f1f]" : "border-[#b5b5b5]"
            }`}
          >
            {isTask && urls?.task && (
              <ButtonComponent
                title="Feladat"
                onClick={() => window.open(urls.task as string)}
                disabled={isDisabled}
                darkMode={darkMode}
              />
            )}
            {isGuide && urls?.guide && (
              <ButtonComponent
                title="Útmutató"
                onClick={() => window.open(urls.guide as string)}
                disabled={isDisabled}
                darkMode={darkMode}
              />
            )}
            {isAudio && urls?.audio && (
              <ButtonComponent
                title="Hanganyag"
                onClick={() => window.open(urls.audio as string)}
                disabled={isDisabled}
                darkMode={darkMode}
              />
            )}
            {isZip && urls?.zip && (
              <ButtonComponent
                title="Forrás"
                onClick={() => window.open(urls.zip as string)}
                disabled={isDisabled}
                darkMode={darkMode}
              />
            )}
            {isZipUt && urls?.zipUt && (
              <ButtonComponent
                title="Megoldás"
                onClick={() => window.open(urls.zipUt as string)}
                disabled={isDisabled}
                darkMode={darkMode}
              />
            )}
            {errormsg && <ErrorFooter />}
          </footer>
        </div>
        <div className="flex mt-8 text-white gap-4">
          <button
            className="bg-indigo-700 rounded-md p-2 font-semibold cursor-pointer flex justify-center items-center hover:bg-indigo-900 transition-all duration-300"
            onClick={() => {
              window.open("https://buymeacoffee.com/erettsegikereso");
            }}
          >
            <HandCoins color="#ffffff" size={25} className="mr-2" />
            BuyMeACoffee
          </button>
          <div
            className={`p-2 rounded-lg border transition-all duration-300 cursor-pointer ${
              darkMode
                ? "border-[#1f1f1f] hover:bg-[#090909]"
                : "border-[#dcdcdc] hover:bg-[#eeeeee]"
            }`}
            onClick={handleModes}
          >
            {darkMode ? (
              <Sun color={darkMode ? "#dbdbdb" : "#090909"} />
            ) : (
              <Moon color={darkMode ? "#dbdbdb" : "#090909"} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;
