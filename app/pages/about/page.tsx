import React from 'react';
import '@styles/About.css';
import HeaderNav from "@components/HeaderNav";
import Footer from "@components/Footer";

const About: React.FC = () => {
  return (
    <>
      <div className="body">
        <HeaderNav />

        {/* Who We Are - Full Width */}
        <section className="about-section mission full-width">
          <h2>Who We Are</h2>
          <p>
            Our mission is to inform, inspire, and engage our readers through impactful
            storytelling and critical analysis. We believe in the power of journalism to drive
            positive change and provide our audience with the tools to understand the world
            around them.
          </p>
        </section>

        {/* Masthead Section */}
        <div className="masthead-container">
          <section className="about-section masthead">
            {/* Editors Row */}
            <div className="masthead-row">
              <h3 className="role-title">Editors</h3>
              <div className="masthead-grid two-items">
                <div className="headshot-container">
                  <div className="headshot-placeholder">Image 1</div>
                  <p className="headshot-name">Name 1</p>
                </div>
                <div className="headshot-container">
                  <div className="headshot-placeholder">Image 2</div>
                  <p className="headshot-name">Name 2</p>
                </div>
              </div>
            </div>

            {/* Writers Row */}
            <div className="masthead-row">
              <h3 className="role-title">Writers</h3>
              <div className="masthead-grid">
                <div className="headshot-container">
                  <div className="headshot-placeholder">Image 3</div>
                  <p className="headshot-name">Name 3</p>
                </div>
                <div className="headshot-container">
                  <div className="headshot-placeholder">Image 4</div>
                  <p className="headshot-name">Name 4</p>
                </div>
                <div className="headshot-container">
                  <div className="headshot-placeholder">Image 5</div>
                  <p className="headshot-name">Name 5</p>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default About;
