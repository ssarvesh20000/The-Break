import React from 'react';

function Footer() {
  return (
    <footer>
      <div>
        <h4>Find Us</h4>
        <button onClick={() => alert('Masthead page')}>Masthead</button>
        <button onClick={() => alert('History page')}>History</button>
        <button onClick={() => alert('Contact Us page')}>Contact Us</button>
      </div>
    </footer>
  );
}

export default Footer;
