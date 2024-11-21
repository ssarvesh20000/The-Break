import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Header.css';
import '../Styles/NavBar.css';

const HeaderNav: React.FC = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div>
            <header className="header">
                <div className="header-content">
                    <h1 className="header-title">The Break</h1>
                    <p className="header-date">{formattedDate}</p>
                </div>
            </header>
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
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className="icon-social" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} className="icon-social" />
                    </a>
                    <a href="mailto:contact@yourwebsite.com">
                        <FontAwesomeIcon icon={faEnvelope} className="icon-social" />
                    </a>
                </div>
            </nav>
            </div>

    );
};

export default HeaderNav;
