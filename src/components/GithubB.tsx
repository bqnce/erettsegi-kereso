import { Github } from 'lucide-react'

const GithubB = () => {
    
    const openGithub = () => {
        window.open("https://github.com/bqnce/erettsegi-kereso")
    }

    return(
        <div className='p-2 rounded-lg border border-[#1f1f1f] hover:bg-[#090909] transition-colors duration-300 cursor-pointer' onClick={openGithub}>
        <Github />
      </div>
    )
}

export default GithubB;