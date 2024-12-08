"use client";

import React from "react";
import "./Styles/Home.css";
import "./Styles/Video.css";
import Image from "next/image";
import galaxyimg from "../public/assets/galaxyimg.jpeg";
import Video from "./components/video";
// import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="body">
      <div className="home-container">
        {/* Main Content Wrapper */}
        <div className="content-wrapper">
          {/* Left Sidebar */}
          <aside className="left-sidebar">
            <div className="left-sidebar-article">
              <Image src={galaxyimg} alt="Left Sidebar Article" />
              <div>
                {/* <Link
                  to="/article/id:102"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Midwestern Roots, National Ambitions
                </Link> */}
              </div>
              <p className="article-author">Logan Day-Richter - Oct 29, 2024</p>
            </div>
            <div className="left-sidebar-article">
              <Image src={galaxyimg} alt="Left Sidebar Article" />
              <div>
                {/* <Link
                  to="/article/id:202"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Power to the People: Ohio’s Issue 1
                </Link> */}
              </div>
              <p className="article-author">Emi Glass - Oct 29, 2024</p>
            </div>
          </aside>

          {/* Main Content */}
          <section className="main-content">
            <div className="main-article">
              <Image src={galaxyimg} alt="Main Article" className="main-image" />
              <div className="main_title">
                {/* <Link
                  to="/article/id:302"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  It gives Everyone a shot Albany’s Democratic Primary"
                </Link> */}
              </div>
              <p className="main-description">
                With an 80-degree summer heat hanging thick, perspiring
                attendees bite their nails at Dustin Reidy’s campaign watch
                party...
              </p>
              <p className="main-author">Conor Webb - Aug 30, 2024</p>
            </div>
          </section>

          {/* Right Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-article">
              <Image
                src={galaxyimg}
                alt="Sidebar Article"
                className="sidebar-image"
              />
              <div>
                {/* <Link
                  to="/article/id:402"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  A Fiscal Playground: California K-12 Funding
                </Link> */}
              </div>
              <p className="article-author">
                Natalia Armas Perez - Aug 30, 2024
              </p>
            </div>
            <div className="sidebar-article">
              <Image
                src={galaxyimg}
                alt="Sidebar Article"
                className="sidebar-image"
              />
              <div>
                {/* <Link
                  to="/article/id:502"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Never Again is Right Now
                </Link> */}
              </div>
              <p className="article-author">The Politic - May 19, 2024</p>
            </div>
            <div className="sidebar-article">
              <Image
                src={galaxyimg}
                alt="Sidebar Article"
                className="sidebar-image"
              />
              <div>
                {/* <Link
                  to="/article/id:602"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  The Rise of the AFD in Germany
                </Link> */}
              </div>
              <p className="article-author">Nicole Chen - Apr 28, 2024</p>
            </div>
            <div className="sidebar-article">
              <Image
                src={galaxyimg}
                alt="Sidebar Article"
                className="sidebar-image"
              />
              <div>
                {/* <Link
                  to="/article/id:702"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Journalism Isn’t Dying, it’s Transforming
                </Link> */}
              </div>
              <p className="article-author">Lily Belle Poling - Apr 28, 2024</p>
            </div>

            {/* Read More Section inside Right Sidebar */}
            <footer className="read-more">Read More</footer>
          </aside>
        </div>

        {/* Video Section */}
        <section className="video-section">
          <Video />
        </section>
      </div>
    </div>
  );
};

export default Home;
