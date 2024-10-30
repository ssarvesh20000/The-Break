import React from 'react';
import '../Styles/Header.css';

const Header: React.FC = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="header-title">The Break</h1>
                <p className="header-date">{formattedDate}</p>
            </div>
        </header>
    );
};

export default Header;
