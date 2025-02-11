import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Info } from 'lucide-react'

const InfoModal = () => {

  return (
    <Dialog>
        <DialogTrigger asChild>
            <div className='p-2 rounded-lg border border-[#1f1f1f] hover:bg-[#090909] transition-colors duration-300 cursor-pointer'>
                <Info />
            </div>
        </DialogTrigger>
        <DialogContent className="bg-[#050505] text-[#dbdbdb] border-[#141414] shadow-[#040404] sm:w-[500px]">
            <DialogHeader>
                <DialogTitle className="flex flex-row items-center gap-2">
                    Érettségi Kereső - 2025
                </DialogTitle>
                <br />
                <DialogDescription className="text-wrap text-start">
                    Az <span className="font-normal text-white">Érettségi Kereső</span> gyors és egyszerű megoldást kínál az érettségi feladatok böngészésére és letöltésére.
                    <br />
                    <br />
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">Szűrés tárgy, év, időszak és szint alapján,</span> hogy gyorsan megtaláld a szükséges feladatokat, útmutatókat és hanganyagokat.
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  );
};

export default InfoModal;