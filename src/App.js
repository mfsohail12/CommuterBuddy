import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UniversitySelectPage from "./pages/UniversitySelectPage";
import TransitSelectPage from "./pages/TransitSelectPage";
import ConnectPage from "./pages/ConnectPage";
import MapPage from "./pages/MapPage";
import BusPage from "./pages/BusPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/university" element={<UniversitySelectPage />} />
          <Route path="/transit" element={<TransitSelectPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/bus" element={<BusPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default App;
