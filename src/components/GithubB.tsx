import { Github } from 'lucide-react'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const GithubB = () => {
    
    const openGithub = () => {
        window.open("https://github.com/bqnce/erettsegi-kereso")
    }

    return(
        <TooltipProvider>
            <Tooltip delayDuration={150}>
                <TooltipTrigger className='p-2 rounded-lg border border-[#1f1f1f] hover:bg-[#090909] transition-colors duration-300 cursor-pointer' onClick={openGithub}>
                    <Github />
                </TooltipTrigger>
                <TooltipContent className='bg-[#121212] border border-[#2f2f2f] text-[#dbdbdb] select-none'>
                <p>Forráskód</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default GithubB;