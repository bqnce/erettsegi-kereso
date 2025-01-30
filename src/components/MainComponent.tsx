import { optionsTargy, optionsEv, optionsSzint, optionsIdoszak } from '../utils/options';
import { useEffect, useState } from "react";
import { fetchFile }  from '../utils/fetch';
import { Search } from 'lucide-react';
import { generateUrls } from '../utils/generateUrls';
import SelectComponent from "./SelectComponent";
import ButtonComponent from "./ButtonComponent";
import RecentLinks from './RecentLinks';

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

  const urls = generateUrls(ev, idoszak, szint, targy, honap);

  useEffect(() => {
    if (idoszak === "osz") {
      setHonap("okt");
    } else if (idoszak === "tavasz") {
      setHonap("maj");
    }
  }, [idoszak]);

  const handleSearch = async () => {
    const taskAvailable = await fetchFile(urls.task);
    const guideAvailable = await fetchFile(urls.guide);
    const audioAvailable = await fetchFile(urls.audio);
    const zipAvailable = await fetchFile(urls.zip);
  
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
        task: taskAvailable ? urls.task : null,
        guide: guideAvailable ? urls.guide : null,
        audio: audioAvailable ? urls.audio : null,
        zip: zipAvailable ? urls.zip : null,
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
          {isTask ? <ButtonComponent title="Feladat" onClick={() => { window.open(urls.task) }} disabled={isDisabled} /> : ""}
          {isGuide ? <ButtonComponent title="Útmutató" onClick={() => { window.open(urls.guide) }} disabled={isDisabled} /> : ""}
          {isAudio ? <ButtonComponent title="Hanganyag" onClick={() => { window.open(urls.audio) }} disabled={isDisabled} /> : ""}
          {isZip ? <ButtonComponent title="Segédlet" onClick={() => { window.open(urls.zip) }} disabled={isDisabled} /> : ""}
      </div>
      <div className="h-full flex justify-center items-center">
        <RecentLinks />
      </div>
    </div>
  );
};

export default MainComponent;
