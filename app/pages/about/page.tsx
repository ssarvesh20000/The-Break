import React from 'react';
import '../../Styles/about.css';

const About: React.FC = () => {
  return (
    <div className="body3">
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
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
