import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { CloudDownload, ShieldAlert } from 'lucide-react';

type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
  title: string;
  fileName: string;
};

const ButtonComponent: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  title,
  fileName
}) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={`border border-[#1f1f1f] p-2 rounded hover:bg-[#090909] transition-all duration-300 flex ${disabled ? "flex opacity-50 cursor-not-allowed" : ""}`} >{title}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#030303] text-[#dbdbdb] border-[#141414] shadow-[#040404] w-[330px]">
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
          <Button type="submit" className="bg-[#090909] hover:bg-[#101010]" onClick={onClick}>
            <CloudDownload color="#2ecc71" className="mr-1"/>
            Letöltés
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonComponent;
