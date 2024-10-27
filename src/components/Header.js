import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
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
