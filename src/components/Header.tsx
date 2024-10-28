import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const article = ['what', 'yeah', 'no', 'you']
  for (let i = 0; i < article.length; i++){
    
  }

  return (
    <header>
      <h1>The Break</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/san-diego">San Diego</Link>
        <Link to="/united-states">United States</Link>
        <Link to="/world-opinion">World Opinion</Link>
        <Link to="/multimedia">Multimedia</Link>
      </nav>
    </header>
  );
}

export default Header;
