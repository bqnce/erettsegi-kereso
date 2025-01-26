import { useEffect, useState } from "react";
import axios from "axios";
import SelectComponent from "./SelectComponent";
import ButtonComponent from "./ButtonComponent";
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

  //https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok_2024osz_kozep/k_digkultfor_24okt_fl.zip

  useEffect(() => {
    if (idoszak === "osz") {
      setHonap("okt");
    } else if (idoszak === "tavasz") {
      setHonap("maj");
    }
  }, [idoszak]);

  // Ellenőrzi, hogy az adott URL elérhető-e
  const checkLink = async (url: string): Promise<boolean> => {
    try {
      const response = await axios.head(url);
      return response.status >= 200 && response.status < 300;
    } catch {
      return false;
    }
  };

  const handleSearch = async () => {
    // Ellenőrzés az URL-ekre
    const taskAvailable = await checkLink(url);
    const guideAvailable = await checkLink(url_guide);
    const audioAvailable = await checkLink(url_voice);
    const zipAvailable = await checkLink(url_zip);

    // Állapotok frissítése
    setIsTask(taskAvailable);
    setIsGuide(guideAvailable);
    setIsAudio(audioAvailable);
    setIsZip(zipAvailable);
  };

  // Ellenőrzés, hogy minden szükséges mező ki van-e töltve
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

      <div className="h-[80%] flex justify-center items-center flex-col">
        <SelectComponent
          placeholder="Tárgy"
          options={[
            { value: "magyir", label: "Magyar nyelv és irodalom" },
            { value: "mat", label: "Matematika" },
            { value: "tort", label: "Történelem" },
            { value: "angol", label: "Angol nyelv" },
            { value: "nemet", label: "Német nyelv" },
            { value: "digkult", label: "Digitális kultúra" },
          ]}
          onValueChange={setTargy}
        />
        <div className="m-2" />
        <SelectComponent
          placeholder="Év"
          options={[
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
          ]}
          onValueChange={setEv}
        />
        <div className="m-2" />
        <SelectComponent
          placeholder="Időszak"
          options={[
            { value: "osz", label: "Ősz" },
            { value: "tavasz", label: "Tavasz" },
          ]}
          onValueChange={setIdoszak}
        />
        <div className="m-2" />
        <SelectComponent
          placeholder="Szint"
          options={[
            { value: "kozep", label: "Közép" },
            { value: "emelt", label: "Emelt" },
          ]}
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
    </div>
  );
};

export default MainComponent;
