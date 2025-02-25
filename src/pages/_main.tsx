import { optionsSubject, optionsYear, optionsLevel, optionsPeriod } from '../utils/options'
import { useState } from "react"
import { fetchFile }  from '@/utils/fetch'
import { generateUrls } from '@/utils/generateUrls'
import ButtonComponent from "@/components/inputs/Button.tsx"
import Header from '@/components/layout/Header.tsx'
import Combobox from '@/components/inputs/Combobox.tsx'
import GithubB from '@/components/icons/GithubB.tsx'
import InfoModal from '@/components/icons/InfoModal.tsx'
import ErrorFooter from '@/components/footer/ErrorFooter'
import { Sun, Moon, HandCoins } from 'lucide-react'
import '@/App.css'

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
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark" ? true : true;
  });

  const urls = generateUrls(year, period, level, subject);
  const isDisabled = !subject || !year || !period || !level;

  const handleSearch = async () => {
    const taskAvailable = await fetchFile(urls.task);
    const guideAvailable = await fetchFile(urls.guide);
    const audioAvailable = await fetchFile(urls.audio);
    const zipAvailable = await fetchFile(urls.zip);
    const zipUtAvailable = await fetchFile(urls.zipUt);

    setIsTask(taskAvailable);
    setIsGuide(guideAvailable);
    setIsAudio(audioAvailable);
    setIsZip(zipAvailable);
    setIsZipUt(zipUtAvailable);

    if (!taskAvailable && !guideAvailable && !audioAvailable && !zipAvailable && !zipUtAvailable) {
      setErrormsg(true);
    } else {
      setErrormsg(false);
    }
  };

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
        <div className={`h-auto w-screen md:h-auto md:w-[500px] rounded md:border-r md:border-l  ${darkMode ? "md:border-[#1f1f1f]" : "md:border-[#b5b5b5]"}`}>
          <Header darkMode={darkMode} />
          <section className='h-[490px] flex justify-center items-center gap-4 flex-col'>
            <Combobox title="Tárgy" errorMsg="A tárgy nem elérhető" options={optionsSubject} onValueChange={setSubject} darkMode={darkMode} />
            <Combobox title="Év" errorMsg="Az év nem elérhető" options={optionsYear} onValueChange={setYear} darkMode={darkMode} />
            <Combobox title="Időszak" errorMsg="Az időszak nem elérhető" options={optionsPeriod} onValueChange={setPeriod} darkMode={darkMode} />
            <Combobox title="Szint" errorMsg="A szint nem elérhető" options={optionsLevel} onValueChange={setLevel} darkMode={darkMode} />
            <div className='flex flex-col gap-2 justify-center items-center mb-2'>
              <ButtonComponent onClick={handleSearch} disabled={isDisabled} darkMode={darkMode} title="Keresés" />
            </div>
          </section>
          <footer className={`sm:h-auto lg:h-[80px] p-4 rounded-b border-b border-t flex justify-center items-center gap-3 flex-wrap ${darkMode ? "border-[#1f1f1f]" : "border-[#b5b5b5]"}`}>
            {isTask && urls?.task && (<ButtonComponent title="Feladat" onClick={() => window.open(urls.task as string)} disabled={isDisabled} darkMode={darkMode} />)}
            {isGuide && urls?.guide && (<ButtonComponent title="Útmutató" onClick={() => window.open(urls.guide as string)} disabled={isDisabled} darkMode={darkMode} />)}
            {isAudio && urls?.audio && (<ButtonComponent title="Hanganyag" onClick={() => window.open(urls.audio as string)} disabled={isDisabled} darkMode={darkMode} />)}
            {isZip && urls?.zip && (<ButtonComponent title="Forrás" onClick={() => window.open(urls.zip as string)} disabled={isDisabled} darkMode={darkMode} />)}
            {isZipUt && urls?.zipUt && (<ButtonComponent title="Megoldás" onClick={() => window.open(urls.zipUt as string)} disabled={isDisabled} darkMode={darkMode} />)}
            {errormsg && (<ErrorFooter />)}
          </footer>
          <div className="absolute flex justify-center items-center left-0 w-full top-3 gap-2">
            <GithubB darkMode={darkMode} />
            <InfoModal darkMode={darkMode} />
            <div className={`p-2 rounded-lg border  transition-colors duration-300 cursor-pointer ${darkMode ? "border-[#1f1f1f] hover:bg-[#090909]" : "border-[#dcdcdc] hover:bg-[#eeeeee]"}`} onClick={handleModes}>
              {darkMode ? <Sun color={darkMode ? "#dbdbdb" : "#090909"} /> : <Moon color={darkMode ? "#dbdbdb" : "#090909"} />}
            </div>
          </div>
        </div>
        <div className="fixed bottom-3 left-0 p-2 w-full flex justify-center items-center">
          <button className="bg-indigo-700 rounded-md p-2 font-semibold cursor-pointer flex justify-center items-center hover:bg-indigo-900 transition-all duration-300" onClick={() => {window.open("https://buymeacoffee.com/erettsegikereso")}}>
            <HandCoins color="#ffffff" size={25} className="mr-2" />
            BuyMeACoffee
          </button>
        </div>
      </>
  );
};

export default MainComponent;
