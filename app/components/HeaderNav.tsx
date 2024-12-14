'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import '@styles/Header.css';
import '@styles/NavBar.css';
import Link from 'next/link';

const HeaderNav: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <header className="header">
            <div className="header-content">
                {/* Make "The Break" a homepage link */}
                <Link href="/" className="header-title-link">
                <h1 className="header-title">The Break</h1>
                </Link>
            </div>
            </header>
            <nav className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
            <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
                <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
            </button>
            <ul className={`nav-links ${menuOpen ? 'visible' : ''}`}>
                {/* Removed "Home" button */}
                <li><Link href="/pages/sanDiego">San Diego</Link></li>
                <li><Link href="/pages/unitedStates">United States</Link></li>
                <li><Link href="/pages/world">World</Link></li>
                <li><Link href="/pages/opinion">Opinion</Link></li>
                <li><Link href="/pages/multimedia">Multimedia</Link></li>
                <li><Link href="/pages/about">About</Link></li>
            </ul>
            <div className="nav-icons">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                <FontAwesomeIcon icon={faTwitter} className="icon-social" />
                </a>
                <a href="https://www.spotify.com" target="_blank" rel="noopener noreferrer" title="Spotify">
                <FontAwesomeIcon icon={faSpotify} className="icon-social" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="icon-social" />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
                <FontAwesomeIcon icon={faYoutube} className="icon-social" />
                </a>
                <a href="mailto:contact@yourwebsite.com" title="Email">
                <FontAwesomeIcon icon={faEnvelope} className="icon-social" />
                </a>
            </div>
            </nav>
        </div>
    );
};

export default HeaderNav;
