export const generateUrls = (ev: string, idoszak: string, szint: string, targy: string, honap: string) => {
    const basePath = `api/erettsegi/feladatok_${ev}${idoszak}_${szint}`;
  
    return {
      task: `${basePath}/${szint.substring(0, 1)}_${targy}_${ev.substring(2, 4)}${honap}_fl.pdf`,
      guide: `${basePath}/${szint.substring(0, 1)}_${targy}_${ev.substring(2, 4)}${honap}_ut.pdf`,
      audio: `${basePath}/${szint.substring(0, 1)}_${targy}_${ev.substring(2, 4)}${honap}_fl.mp3`,
      zip: `${basePath}/${szint.substring(0, 1)}_${targy}for_${ev.substring(2, 4)}${honap}_fl.zip`,
    };
};