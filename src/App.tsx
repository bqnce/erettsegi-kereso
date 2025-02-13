import { Analytics } from "@vercel/analytics/react"
import MainComponent from "./pages/_main";
import "./App.css";

const App = () => {
    const darkMode: boolean = localStorage.getItem("theme") === "dark";

    return (
    <>
      <div className={`text-[#dbdbdb] flex justify-center items-center min-h-[100vh] flex-col overflow-hidden ${darkMode ? "text-[#dbdbdb]" : "text-[#070707]"}`}>
        <MainComponent />
        <Analytics />
      </div>
    </>
  );
};

export default App;
