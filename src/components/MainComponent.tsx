import { useEffect, useState } from "react";
import SelectComponent from "./SelectComponent";
import ButtonComponent from "./ButtonComponent";

const MainComponent = () => {
  const [targy, setTargy] = useState<string>("");
  const [ev, setEv] = useState<string>("");
  const [szint, setSzint] = useState<string>("");
  const [idoszak, setIdoszak] = useState<string>("");
  const [honap, setHonap] = useState<string>("");

  useEffect(() => {
    if (idoszak === "osz") {
      setHonap("okt");
    } else if (idoszak === "tavasz") {
      setHonap("maj");
    }
  }, [idoszak]);

  const url = `https://dload-oktatas.educatio.hu/erettsegi/feladatok_${ev}${idoszak}_${szint}/${szint.substring(
    0,
    1
  )}_${targy}_${ev.substring(2, 4)}${honap}_fl.pdf`;

  const handleSearch = () => {
    if (
      targy.length === 0 ||
      ev.length === 0 ||
      idoszak.length === 0 ||
      szint.length === 0
    ) {
      alert("Adj meg valami értéket!");
    } else {
      window.open(url, "_blank");
    }
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
          Érettségi Browser
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
        <ButtonComponent onClick={handleSearch} disabled={isDisabled} />
      </div>
      <div className="border-t border-[#1f1f1f] h-[10%]"></div>
    </div>
  );
};

export default MainComponent;
