import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Materials } from "./pages/Materials";
import { Machines } from "./pages/Machines";
import { Tracking } from "./pages/Tracking";
import { Deposits } from "./pages/Deposits";
import { ConstructionWork } from "./pages/ConstructionWork";
import { Enterprises } from "./pages/Enterprises";
import { Stadistics } from "./pages/Stadistics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/machines" element={<Machines />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/deposits" element={<Deposits />} />
        <Route path="/construction-work" element={<ConstructionWork />} />
        <Route path="/enterprises" element={<Enterprises />} />
        <Route path="/stadistics" element={<Stadistics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
