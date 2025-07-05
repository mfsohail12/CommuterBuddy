import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UniversitySelectPage from './pages/UniversitySelectPage';
import TransitSelectPage from './pages/TransitSelectPage';
import ConnectPage from './pages/ConnectPage';
import MapPage from './pages/MapPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/university" element={<UniversitySelectPage />} />
        <Route path="/transit" element={<TransitSelectPage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default App;
