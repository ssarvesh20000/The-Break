import React from 'react';
import '@styles/Footer.css';
// import logoImage from '../../public/assets/logo.png';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section logo">
        {/* <Image src={logoImage} alt="The Politic Logo" className="logo-image" /> */}
      </div>
      <div className="footer-section read-more">
        <h4>Read More</h4>
        <ul>
          <li>Local</li>
          <li>National</li>
          <li>World</li>
          <li>Culture</li>
          <li>Opinion</li>
          <li>Columnists</li>
          <li>Documentary</li>
        </ul>
      </div>
      <div className="footer-section find-us">
        <h4>Find Us</h4>
        <ul>
          <li>Mag</li>
          <li>Masthead</li>
          <li>Our History</li>
          <li>Contact Us</li>
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
