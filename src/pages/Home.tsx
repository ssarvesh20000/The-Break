import React from 'react';
import '../Styles/Home.css';
import galaxyimg from '../assets/galaxyimg.jpeg';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            {/* Left Sidebar */}
            <aside className="left-sidebar">
                <div className="left-sidebar-article">
                    <img src={galaxyimg} alt="Left Sidebar Article" />
                    <h4>Midwestern Roots, National Ambitions</h4>
                    <p className="article-author">Logan Day-Richter - Oct 29, 2024</p>
                </div>
                <div className="left-sidebar-article">
                    <img src={galaxyimg} alt="Left Sidebar Article" />
                    <h4>Power to the People: Ohio’s Issue 1</h4>
                    <p className="article-author">Emi Glass - Oct 29, 2024</p>
                </div>
            </aside>

            {/* Main Content */}
            <section className="main-content">
                <div className="main-article">
                    <img src={galaxyimg} alt="Main Article" className="main-image" />
                    <h2 className="main-title">"It Gives Everyone a Shot": Albany’s Democratic Primary</h2>
                    <p className="main-description">With an 80-degree summer heat hanging thick, perspiring attendees bite their nails at Dustin Reidy’s campaign watch party...</p>
                    <p className="main-author">Conor Webb - Aug 30, 2024</p>
                </div>
                <div className="secondary-articles">
                    <div className="article">
                        <img src={galaxyimg} alt="Secondary Article" className="article-image" />
                        <h3>Graffiti, an Artistic and Political Tool</h3>
                        <p className="article-author">Rory Schoenberger - Aug 30, 2024</p>
                    </div>
                    <div className="article">
                        <img src={galaxyimg} alt="Secondary Article" className="article-image" />
                        <h3>A Congressional Battleground: Orange County</h3>
                        <p className="article-author">Bryant Pranboonpluk - Aug 30, 2024</p>
                    </div>
                </div>
            </section>

            {/* Right Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-article">
                    <img src={galaxyimg} alt="Sidebar Article" className="sidebar-image" />
                    <h4>A Fiscal Playground: California K-12 Funding</h4>
                    <p className="article-author">Natalia Armas Perez - Aug 30, 2024</p>
                </div>
                <div className="sidebar-article">
                    <img src={galaxyimg} alt="Sidebar Article" className="sidebar-image" />
                    <h4>Never Again is Right Now</h4>
                    <p className="article-author">The Politic - May 19, 2024</p>
                </div>
                <div className="sidebar-article">
                    <img src={galaxyimg} alt="Sidebar Article" className="sidebar-image" />
                    <h4>The Rise of the AFD in Germany</h4>
                    <p className="article-author">Nicole Chen - Apr 28, 2024</p>
                </div>
                <div className="sidebar-article">
                    <img src={galaxyimg} alt="Sidebar Article" className="sidebar-image" />
                    <h4>Journalism Isn’t Dying, it’s Transforming</h4>
                    <p className="article-author">Lily Belle Poling - Apr 28, 2024</p>
                </div>

                {/* Read More Section inside Right Sidebar */}
                <footer className="read-more">Read More</footer>
            </aside>
        </div>
    );
};

export default Home;
