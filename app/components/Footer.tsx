import React from 'react';
import '@styles/Footer.css';
import Image from 'next/image';
import Link from 'next/link';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
import '@fortawesome/fontawesome-free/css/all.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <Image 
          className="logo" 
          src="/assets/logo.png" 
          alt="The Break Logo"
          layout="responsive"
          width={100}
          height={50}
        />
      </div>
      <div className="footer-section read-more">
        <h4>Read More</h4>
        <ul className='footer-bar'>
            <li><Link href="/pages/sanDiego">San Diego</Link></li>
            <li><Link href="/pages/unitedStates">United States</Link></li>
            <li><Link href="/pages/world">World</Link></li>
            <li><Link href="/pages/opinion">Opinion</Link></li>
            <li><Link href="/pages/multimedia">Multimedia</Link></li>
            <li><Link href="/pages/about">About</Link></li>
        </ul>
      </div>
      <div className="footer-section find-us">
        <h4>Find Us</h4>
        <ul className = 'find-bar'>
          <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram </a> </li>
          <li><Link href = "/pages/about">Masthead</Link></li>
          <li><a href="mailto:contact@yourwebsite.com">Contact Us</a></li>
        </ul>
        <div className="social-icons">
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-youtube"></i>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram"></i>
    </a>
    <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-spotify"></i>
    </a>
</div>
      </div>
    </footer>
  );
}

export default Footer;
