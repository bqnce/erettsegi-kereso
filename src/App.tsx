import "./App.css";
import MainComponent from "./components/MainComponent";
import { Analytics } from "@vercel/analytics/react"


const App = () => {
  return (
    <>
      <div className="text-[#dbdbdb] flex justify-center items-center min-h-[100vh] flex-col overflow-hidden">
      <div className='absolute w-screen top-0 h-[10px] bg-indigo-500 blur-2xl sm:hidden'></div>
      <div className='absolute w-screen bottom-0 h-[5px] bg-indigo-400 blur-2xl sm:hidden'></div>
        <MainComponent />
        <Analytics />
      </div>
    </>
  );
};

export default App;
