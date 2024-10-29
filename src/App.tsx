import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SanDiego from './pages/SanDiego';
import UnitedStates from './pages/UnitedStates';
import WorldOpinion from './pages/WorldOpinion';
import Multimedia from './pages/Multimedia';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/san-diego" element={<SanDiego />} />
                <Route path="/united-states" element={<UnitedStates />} />
                <Route path="/world-opinion" element={<WorldOpinion />} />
                <Route path="/multimedia" element={<Multimedia />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;

