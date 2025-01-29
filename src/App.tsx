import "./App.css";
import MainComponent from "./components/MainComponent";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


const App = () => {
  return (
    <>
      <div className="text-[#dbdbdb] flex justify-center items-center h-screen">
        <MainComponent />
        <Analytics />
        <SpeedInsights />
      </div>
    </>
  );
};

export default App;
