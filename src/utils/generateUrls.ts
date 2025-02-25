export const generateUrls = (
  year: string,
  period: string,
  level: string,
  subject: string
) => {
  const basePath = `api/erettsegi/feladatok_${year}${period}_${level}`;
  const month = (() => {
    if (period === "osz") {
      return "okt";
    } else if (period === "tavasz") {
      return "maj";
    }
  })();

  return {
    task: `${basePath}/${level.substring(0, 1)}_${subject}_${year.substring(
      2,
      4
    )}${month}_fl.pdf`,
    guide: `${basePath}/${level.substring(0, 1)}_${subject}_${year.substring(
      2,
      4
    )}${month}_ut.pdf`,
    audio: `${basePath}/${level.substring(0, 1)}_${subject}_${year.substring(
      2,
      4
    )}${month}_fl.mp3`,
    zip: `${basePath}/${level.substring(0, 1)}_${subject}for_${year.substring(
      2,
      4
    )}${month}_fl.zip`,
    zipUt: `${basePath}/${level.substring(0, 1)}_${subject}meg_${year.substring(
      2,
      4
    )}${month}_ut.zip`,
  };
};
