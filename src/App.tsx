import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SanDiego from './pages/SanDiego';
import UnitedStates from './pages/UnitedStates';
import WorldOpinion from './pages/WorldOpinion';
import Culture from './pages/Culture';
import Multimedia from './pages/Multimedia';
import About from './pages/About';
//import Header from './components/Header';
//import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HeaderNav from './components/HeaderNav';
import Darkmode from './components/Darkmode';
import './App.css';
import ArticleView from './pages/ArticleView';


const App: React.FC = () => {
    return (
        <Router>
            <HeaderNav />
            <Darkmode />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/san-diego" element={<SanDiego />} />
                <Route path="/united-states" element={<UnitedStates />} />
                <Route path="/world-opinion" element={<WorldOpinion />} />
                <Route path="/culture" element={<Culture />} />
                <Route path="/multimedia" element={<Multimedia />} />
                <Route path="/about" element={<About />} />
                <Route path="/article/id:102" element= {<ArticleView />} />
                <Route path="/article/id:202" element= {<ArticleView />} />
                <Route path="/article/id:302" element= {<ArticleView />} />
                <Route path="/article/id:402" element= {<ArticleView />} />
                <Route path="/article/id:502" element= {<ArticleView />} />
                <Route path="/article/id:602" element= {<ArticleView />} />
                <Route path="/article/id:702" element= {<ArticleView />} />

            </Routes>
            
            <Footer />
        </Router>
    );
};

export default App;

