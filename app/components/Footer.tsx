import React from 'react';
import '@styles/Footer.css';
// import logoImage from '../../public/assets/logo.png';
//////import Image from 'next/image';
//import logopdf from '../../public/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';  

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section logo">
      <Image src="/assets/logo.png" alt="The Politic Logo" className="logo-image" width='120' height='40' />
        {/*<Link href="../../../public/assets/logo.png"target="_blank" rel="noopener noreferrer"></Link>*/}
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
          <i className="fab fa-facebook-square"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
