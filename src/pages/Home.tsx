import React from 'react';
import '../Styles/Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <section className="main-content">
                <div className="main-article">
                    <img src="main-image.jpg" alt="Main Article" className="main-image" />
                    <h2 className="main-title">"It Gives Everyone a Shot": Albany’s Democratic Primary</h2>
                    <p className="main-description">With an 80-degree summer heat hanging thick, perspiring attendees bite their nails at Dustin Reidy’s campaign watch party...</p>
                    <p className="main-author">Conor Webb - Aug 30, 2024</p>
                </div>
                <div className="secondary-articles">
                    <div className="article">
                        <img src="secondary-image1.jpg" alt="Secondary Article" className="article-image" />
                        <h3>Graffiti, an Artistic and Political Tool: Interviews with Craig Costello and Lee Quiñones</h3>
                        <p className="article-author">Rory Schoenberger - Aug 30, 2024</p>
                    </div>
                    <div className="article">
                        <img src="secondary-image2.jpg" alt="Secondary Article" className="article-image" />
                        <h3>A Congressional Battleground: Orange County’s Instrumental Role in Control of the House of Representatives</h3>
                        <p className="article-author">Bryant Pranboonpluk - Aug 30, 2024</p>
                    </div>
                </div>
            </section>
            <aside className="sidebar">
                <div className="sidebar-article">
                    <img src="sidebar-image1.jpg" alt="Sidebar Article" className="sidebar-image" />
                    <h4>A Fiscal Playground: The Past and Present of California K-12 Funding</h4>
                    <p className="sidebar-author">Natalia Armas Perez - Aug 30, 2024</p>
                </div>
                <div className="sidebar-article">
                    <img src="sidebar-image2.jpg" alt="Sidebar Article" className="sidebar-image" />
                    <h4>Never Again is Right Now</h4>
                    <p className="sidebar-author">The Politic - May 19, 2024</p>
                </div>
                <div className="sidebar-article">
                    <img src="sidebar-image3.jpg" alt="Sidebar Article" className="sidebar-image" />
                    <h4>Never Again is Right Now: The Rise of the AFD in Germany</h4>
                    <p className="sidebar-author">Nicole Chen - Apr 28, 2024</p>
                </div>
                <div className="sidebar-article">
                    <img src="sidebar-image4.jpg" alt="Sidebar Article" className="sidebar-image" />
                    <h4>Journalism Isn’t Dying, it’s Transforming: The Metamorphosis of Journalism in a Digital Age</h4>
                    <p className="sidebar-author">Lily Belle Poling - Apr 28, 2024</p>
                </div>
            </aside>
            <footer className="read-more">Read More</footer>
        </div>
    );
};

export default Home;
