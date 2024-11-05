import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Multimedia from './pages/Multimedia.jsx';
import SanDiego from './pages/SanDiego.jsx';
import UnitedStates from './pages/UnitedStates.jsx';
import WorldOpinions from './pages/WorldOpinions.jsx';

const Main = () => {
  return (
    <Router>
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/multimedia" element={<Multimedia />} />
        <Route path="/sandiego" element={<SanDiego />} />
        <Route path="/unitedstates" element={<UnitedStates />} />
        <Route path="/worldopinions" element={<WorldOpinions />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>,
);
