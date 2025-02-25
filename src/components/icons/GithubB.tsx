import { Github } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

const GithubB = ({ darkMode }: { darkMode: boolean }) => {
  const openGithub = () => {
    window.open("https://github.com/bqnce/erettsegi-kereso");
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger
          className={`p-2 rounded-lg border  transition-colors duration-300 cursor-pointer ${
            darkMode
              ? "border-[#1f1f1f] hover:bg-[#090909]"
              : "border-[#dcdcdc] hover:bg-[#eeeeee]"
          }`}
          onClick={openGithub}
        >
          <Github color={darkMode ? "#dbdbdb" : "#090909"} />
        </TooltipTrigger>
        <TooltipContent
          className={`border select-none dark:border-[#2f2f2f] dark:text-[#dbdbdb] dark:bg-[#121212] border-[#dcdcdc] text-[#070707] bg-[#f5f5f5]"}`}
        >
          <p>Forráskód</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GithubB;
