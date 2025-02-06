import { optionsTargy, optionsEv, optionsSzint, optionsIdoszak } from '../utils/options';
import { useEffect, useState } from "react";
import { fetchFile }  from '../utils/fetch';
import { Search } from 'lucide-react';
import { generateUrls } from '../utils/generateUrls';
import SelectComponent from "./SelectComponent";
import ButtonComponent from "./ButtonComponent";
import Confirmation from './Confirmation';
import Header from './Header';

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
  const isDisabled = !targy || !ev || !idoszak || !szint;

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
  
  return (
    <>
      <div className='h-auto w-screen md:h-[650px] md:w-[500px] rounded md:border-r md:border-l md:border-[#1f1f1f] overflow-hidden'>
      <div className="h-[100px] w-[100px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-spin absolute left-[33%] top-[75%] blur-3xl opacity-0 2xl:opacity-75"></div>
      <div className="h-[125px] w-[125px] rounded-full bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 animate-spin absolute right-[33%] top-[8%] blur-3xl opacity-0 2xl:opacity-75"></div>


      <div className='h-[80px] flex justify-center items-center rounded-t border-t border-b border-[#1f1f1f]'>
          <Header />
        </div>
        <div className='h-[490px] flex justify-center items-center gap-4 flex-col'>
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
          <div className='mt-6'>
            <ButtonComponent onClick={handleSearch} title="Keresés" disabled={isDisabled} icon={<Search className="mr-2 size-5"/>}/>
          </div>
        </div>
         <div className="h-[80px] rounded-b border-b border-t border-[#1f1f1f] flex justify-center items-center gap-4">
            {isTask && urls?.task && (
              <ButtonComponent title="Feladat" onClick={() => window.open(urls.task as string)} disabled={isDisabled} />
            )}
            {isGuide && urls?.guide && (
              <ButtonComponent title="Útmutató" onClick={() => window.open(urls.guide as string)} disabled={isDisabled} />
            )}
            {isAudio && urls?.audio && (
              <ButtonComponent title="Hanganyag" onClick={() => window.open(urls.audio as string)} disabled={isDisabled} />
            )}
            {isZip && urls?.zip && (
            <Confirmation title="Segédlet" onClick={() => window.open(urls.zip as string)} disabled={isDisabled}/>
            )}
        </div>
      </div>
    </>
  );
};

export default MainComponent;
