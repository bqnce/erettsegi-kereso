import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainComponent from "./pages/_main";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainComponent />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  );
};

export default App;
