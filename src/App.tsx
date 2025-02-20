import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainComponent from "./pages/_main";
//import Login from './pages/_login.tsx'
//import Register from "@/pages/_register.tsx";
import "./App.css";

const App = () => {
    const darkMode: boolean = localStorage.getItem("theme") === "dark";

    return (
    <>
      <div className={`text-[#dbdbdb] flex justify-center items-center min-h-[100vh] flex-col overflow-hidden ${darkMode ? "text-[#dbdbdb]" : "text-[#070707]"}`}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<MainComponent />} />
                  {/*<Route path="/login" element={<Login />} />*/}
                  {/*<Route path="/register" element={<Register />} />*/}
              </Routes>
          </BrowserRouter>
          <Analytics />
      </div>
    </>
  );
};

export default App;
