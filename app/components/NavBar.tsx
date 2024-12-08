//UNUSED

import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NavBar.css';

const NavBar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/san-diego">San Diego</Link></li>
                <li><Link to="/united-states">United States</Link></li>
                <li><Link to="/world-opinion">World Opinion</Link></li>
                <li><Link to="/culture">Culture</Link></li>
                <li><Link to="/multimedia">Multimedia</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <div className="nav-icons">
                <i className="icon-search">🔍</i>
                <i className="icon-social">📘</i>
                <i className="icon-social">📷</i>
                <i className="icon-social">🐦</i>
            </div>
        </nav>
    );
};

export default NavBar;
