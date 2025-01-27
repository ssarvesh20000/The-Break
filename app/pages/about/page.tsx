import React from 'react';
import '@styles/About.css';
import HeaderNav from "@components/HeaderNav";
import Footer from "@components/Footer";

const About: React.FC = () => {
  return (
    <>
    <div className="body">
      <HeaderNav></HeaderNav>
      <div className="about-container">
        <div className="about-columns">
          {/* Left Column: Who We Are and Contact Us */}
          <div className="left-column">
            <section className="about-section mission">
              <h2>Who We Are</h2>
              <p>
                Our mission is to inform, inspire, and engage our readers through impactful
                storytelling and critical analysis. We believe in the power of journalism to drive
                positive change and provide our audience with the tools to understand the world
                around them.
              </p>
            </section>
            <section className="about-section contact">
              <h2>Contact Us</h2>
              <p>Have questions, comments, or feedback? We’d love to hear from you. Please reach out to us at:</p>
              <p>Email: contact@ourwebsite.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Address: 1234 News Lane, Media City, Country</p>
            </section>
          </div>

          {/* Right Column: Masthead */}
          <div className="right-column">
            <section className="about-section masthead">
              <h2>Masthead</h2>
              <p>
                Meet our dedicated team of writers, editors, and contributors who bring insightful
                stories and thoughtful analysis to our readers. Our masthead represents the voices
                behind every article.
              </p>

              {/* Editors Row */}
              <div className="masthead-row">
                <h3 className="role-title">Editors</h3>
                <div className="masthead-grid two-items"> {/* Added two-items class */}
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
      </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default About;
