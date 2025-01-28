import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../app/page';
//the-break/app/page.tsx
import SanDiego from './pages/sanDiego/page';
import UnitedStates from './pages/unitedStates/page';
import World from './pages/world/page';
import Opinion from './pages/opinion/page';
import Multimedia from './pages/multimedia/page';
import About from './pages/about/page';
//import Header from './components/Header';
//import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HeaderNav from './components/HeaderNav';
//import Darkmode from './components/Darkmode';
import './App.css';
import { Analytics } from "@vercel/analytics/react"

const App: React.FC = () => {
    return (
        <Router>
            <HeaderNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/san-diego" element={<SanDiego />} />
                <Route path="/united-states" element={<UnitedStates />} />
                <Route path="/world" element={<World />} />
                <Route path="/opinion" element={<Opinion />} />
                <Route path="/multimedia" element={<Multimedia />} />
                <Route path="/about" element={<About />} />
            </Routes>
            
            <Footer />
        </Router>
    );
};

export default App;