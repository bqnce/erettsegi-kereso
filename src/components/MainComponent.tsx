import { useEffect, useState } from "react";
import SelectComponent from "./SelectComponent";
import ButtonComponent from "./ButtonComponent";
import RecentLinks from './RecentLinks';
import { Search } from 'lucide-react';

const MainComponent = () => {
  const [targy, setTargy] = useState<string>("");
  const [ev, setEv] = useState<string>("");
  const [szint, setSzint] = useState<string>("");
  const [idoszak, setIdoszak] = useState<string>("");
  const [honap, setHonap] = useState<string>("");
  const [isTask, setIsTask] = useState<Boolean>(false);
  const [isGuide, setIsGuide] = useState<Boolean>(false);
  const [isAudio, setIsAudio] = useState<Boolean>(false);
  const [isZip, setIsZip] = useState<Boolean>(false);


  const url = `api/erettsegi/feladatok_${ev}${idoszak}_${szint}/${szint.substring(
    0,
    1
  )}_${targy}_${ev.substring(2, 4)}${honap}_fl.pdf`;
  
  const url_guide = `api/erettsegi/feladatok_${ev}${idoszak}_${szint}/${szint.substring(
    0,
    1
  )}_${targy}_${ev.substring(2, 4)}${honap}_ut.pdf`;
  
  const url_voice = `api/erettsegi/feladatok_${ev}${idoszak}_${szint}/${szint.substring(
    0,
    1
  )}_${targy}_${ev.substring(2, 4)}${honap}_fl.mp3`;
  
  const url_zip = `api/erettsegi/feladatok_${ev}${idoszak}_${szint}/${szint.substring(
    0,
    1
  )}_${targy}for_${ev.substring(2, 4)}${honap}_fl.zip`;

  useEffect(() => {
    if (idoszak === "osz") {
      setHonap("okt");
    } else if (idoszak === "tavasz") {
      setHonap("maj");
    }
  }, [idoszak]);

  const fetchFile = async (url: string) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      console.error("Error fetching file:", error);
      return false;
    }
  };

  const handleSearch = async () => {
    const taskAvailable = await fetchFile(url);
    const guideAvailable = await fetchFile(url_guide);
    const audioAvailable = await fetchFile(url_voice);
    const zipAvailable = await fetchFile(url_zip);
  
    setIsTask(taskAvailable);
    setIsGuide(guideAvailable);
    setIsAudio(audioAvailable);
    setIsZip(zipAvailable);
  
    // Save the selected options to LocalStorage
    const recentItem = {
      targy: { value: targy, label: optionsTargy.find(o => o.value === targy)?.label },
      ev: { value: ev, label: optionsEv.find(o => o.value === ev)?.label },
      idoszak: { value: idoszak, label: optionsIdoszak.find(o => o.value === idoszak)?.label },
      szint: { value: szint, label: optionsSzint.find(o => o.value === szint)?.label },
      links: {
        task: taskAvailable ? url : null,
        guide: guideAvailable ? url_guide : null,
        audio: audioAvailable ? url_voice : null,
        zip: zipAvailable ? url_zip : null,
      },
    };
  
    const recentLinks = JSON.parse(localStorage.getItem('recentLinks') || '[]');
    localStorage.setItem('recentLinks', JSON.stringify([recentItem, ...recentLinks].slice(0, 10)));
  };
  

  const isDisabled =
    targy.length === 0 ||
    ev.length === 0 ||
    idoszak.length === 0 ||
    szint.length === 0;

    const optionsTargy = [
      { value: "magyir", label: "Magyar nyelv és irodalom" },
      { value: "mat", label: "Matematika" },
      { value: "tort", label: "Történelem" },
      { value: "angol", label: "Angol nyelv" },
      { value: "nemet", label: "Német nyelv" },
      { value: "digkult", label: "Digitális kultúra" },
    ];
    
    const optionsEv = [
      { value: "2025", label: "2025" },
      { value: "2024", label: "2024" },
      { value: "2023", label: "2023" },
      { value: "2022", label: "2022" },
      { value: "2021", label: "2021" },
      { value: "2020", label: "2020" },
      { value: "2019", label: "2019" },
      { value: "2018", label: "2018" },
      { value: "2017", label: "2017" },
      { value: "2016", label: "2016" },
      { value: "2015", label: "2015" },
      { value: "2014", label: "2014" },
      { value: "2013", label: "2013" },
    ];
    
    const optionsIdoszak = [
      { value: "osz", label: "Ősz" },
      { value: "tavasz", label: "Tavasz" },
    ];
    
    const optionsSzint = [
      { value: "kozep", label: "Közép" },
      { value: "emelt", label: "Emelt" },
    ];
    

  return (
    <div className="border border-[#1f1f1f] rounded-lg h-[650px] w-[500px]">

      <div className="border-b border-[#1f1f1f] h-[10%] flex justify-center items-center">
        <span className="font-medium text-xl hover:text-[#8a8a8a] transition-colors duration-300">
          Érettségi Segéd
        </span>
      </div>

      <div className="h-[80%] flex justify-center items-center flex-col gap-3">
        <SelectComponent
          placeholder="Tárgy"
          options={optionsTargy}
          onValueChange={setTargy}
        />
        <SelectComponent
          placeholder="Év"
          options={optionsEv}
          onValueChange={setEv}
        />
        <SelectComponent
          placeholder="Időszak"
          options={optionsIdoszak}
          onValueChange={setIdoszak}
        />
        <SelectComponent
          placeholder="Szint"
          options={optionsSzint}
          onValueChange={setSzint}
        />
        <ButtonComponent onClick={handleSearch} title="Keresés" disabled={isDisabled} icon={<Search className="mr-2"/>}/>
      </div>

      <div className="border-t border-[#1f1f1f] flex justify-center items-center gap-4 h-[8%]">
          {isTask ? <ButtonComponent title="Feladat" onClick={() => { window.open(url) }} disabled={isDisabled} /> : ""}
          {isGuide ? <ButtonComponent title="Útmutató" onClick={() => { window.open(url_guide) }} disabled={isDisabled} /> : ""}
          {isAudio ? <ButtonComponent title="Hanganyag" onClick={() => { window.open(url_voice) }} disabled={isDisabled} /> : ""}
          {isZip ? <ButtonComponent title="Segédlet" onClick={() => { window.open(url_zip) }} disabled={isDisabled} /> : ""}
      </div>
      <div className="h-full flex justify-center items-center">
        <RecentLinks />
      </div>
    </div>
  );
};

export default MainComponent;
