import "./App.css";
import MainComponent from "./pages/_main";
import { Analytics } from "@vercel/analytics/react"


const App = () => {
  return (
    <>
      <div className="text-[#dbdbdb] flex justify-center items-center min-h-[100vh] flex-col overflow-hidden">
        <MainComponent />
        <Analytics />
      </div>
    </>
  );
};

export default App;
