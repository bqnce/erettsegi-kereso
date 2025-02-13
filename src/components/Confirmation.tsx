import { Button } from "@/components/ui/button"
import { CloudDownload, ShieldAlert } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  darkMode: boolean;
  title: string;
  fileName: string;
}

export default function ButtonComponent({
  onClick, disabled, title, fileName, darkMode
}: ButtonProps): React.ReactNode {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={`border p-2 rounded transition-all duration-300 flex ${disabled ? "flex opacity-50 cursor-not-allowed" : ""} ${darkMode ? "border-[#1f1f1f] hover:bg-[#090909]" : "border-[#9f9f9f] hover:bg-[#979797] text-[#070707]"}`} >{title}</button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] w-[330px] ${darkMode ? "bg-[#050505] text-[#dbdbdb] border-[#141414] shadow-[#040404]": "bg-[#f1f1f1] text-[#050505] shadow-[#f1f1f1]"}`}>
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center gap-2">
            <ShieldAlert color="#e74c3c"/>
            Figyelem!
          </DialogTitle>
          <br />
          <DialogDescription>
            Kérlek erősítsd meg, hogy le szeretnéd tölteni a következő fájlt: 
            <span className="font-medium mt-4"> {fileName.split('/').pop()}</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" className={`${darkMode? "bg-[#090909] hover:bg-[#101010]": "bg-[#dbdbdb] hover-[#cdcdcd] text-[#050505]"}`} onClick={onClick}>
            <CloudDownload color={`${darkMode ? "#2ecc71": "#008e3c"}`} className="mr-1"/>
            Letöltés
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}