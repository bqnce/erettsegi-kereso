import { optionsTargy, optionsEv, optionsSzint, optionsIdoszak } from '../utils/options'
import { useEffect, useState } from "react"
import { fetchFile }  from '@/utils/fetch'
import { generateUrls } from '@/utils/generateUrls'
import ButtonComponent from "@/components/inputs/Button.tsx"
import Header from '@/components/layout/Header.tsx'
import Combobox from '@/components/inputs/Combobox.tsx'
import GithubB from '@/components/icons/GithubB.tsx'
import InfoModal from '@/components/icons/InfoModal.tsx'
import ErrorFooter from '@/components/ErrorFooter'
import '@/App.css'
import { Sun, Moon } from 'lucide-react'
//import Topbar from "@/components/Topbar.tsx";

const MainComponent = () => {
  const [targy, setTargy] = useState<string>("");
  const [ev, setEv] = useState<string>("");
  const [szint, setSzint] = useState<string>("");
  const [idoszak, setIdoszak] = useState<string>("");
  const [honap, setHonap] = useState<string>("");
  const [isTask, setIsTask] = useState<boolean>(false);
  const [isGuide, setIsGuide] = useState<boolean>(false);
  const [isAudio, setIsAudio] = useState<boolean>(false);
  const [isZip, setIsZip] = useState<boolean>(false);
  const [isZipUt, setIsZipUt] = useState<boolean>(false);
  const [errormsg, setErrormsg] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Alapértelmezetten dark mode, ha nincs mentett beállítás
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark" ? true : true; // Ha nincs tárolt érték, alapból dark mode
  });

  const urls = generateUrls(ev, idoszak, szint, targy, honap);
  const isDisabled = !targy || !ev || !idoszak || !szint;

  useEffect(() => {
    if (idoszak === "osz") {
      setHonap("okt");
    } else if (idoszak === "tavasz") {
      setHonap("maj");
    }
  }, [idoszak]);

  useEffect(() => {
    if (targy && ev && idoszak && szint) {
      handleSearch().then(() => console.log("Search completed"))
          .catch((err) => console.log(err));
    }
  }, [targy, ev, idoszak, szint]);

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

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
      document.body.style.backgroundColor = darkMode ? "#070707" : "#ffffff";
    } else {
      localStorage.setItem("theme", "light");
      document.body.style.backgroundColor = darkMode ? "#070707" : "#ffffff";
    }
  }, [darkMode]);

  return (
      <>
        <div className={`h-auto w-screen md:h-[650px] md:w-[500px] rounded md:border-r md:border-l  overflow-hidden ${darkMode ? "md:border-[#1f1f1f]" : "md:border-[#b5b5b5]"}`}>
          <Header darkMode={darkMode} />
          <section className='h-[490px] flex justify-center items-center gap-4 flex-col'>
            <Combobox title="Tárgy" errorMsg="A tárgy nem elérhető" options={optionsTargy} onValueChange={setTargy} darkMode={darkMode} />
            <Combobox title="Év" errorMsg="Az év nem elérhető" options={optionsEv} onValueChange={setEv} darkMode={darkMode} />
            <Combobox title="Időszak" errorMsg="Az időszak nem elérhető" options={optionsIdoszak} onValueChange={setIdoszak} darkMode={darkMode} />
            <Combobox title="Szint" errorMsg="A szint nem elérhető" options={optionsSzint} onValueChange={setSzint} darkMode={darkMode} />
            <div className='flex gap-3'>
              <GithubB darkMode={darkMode} />
              <InfoModal darkMode={darkMode} />
              <div className={`p-2 rounded-lg border  transition-colors duration-300 cursor-pointer ${darkMode ? "border-[#1f1f1f] hover:bg-[#090909]" : "border-[#dcdcdc] hover:bg-[#eeeeee]"}`} onClick={handleModes}>
                {darkMode ? <Sun color={darkMode ? "#dbdbdb" : "#090909"} /> : <Moon color={darkMode ? "#dbdbdb" : "#090909"} />}
              </div>
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
        </div>
      </>
  );
};

export default MainComponent;
