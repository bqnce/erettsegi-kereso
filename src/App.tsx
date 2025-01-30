import "./App.css";
import MainComponent from "./components/MainComponent";
import { Analytics } from "@vercel/analytics/react"


const App = () => {
  return (
    <>
      <div className="text-[#dbdbdb] flex justify-center items-center h-screen">
        <MainComponent />
        <Analytics />
      </div>
    </>
  );
};

export default App;
