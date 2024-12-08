import React from "react";
import "../../Styles/Catergory.css";
// import { Link } from 'react-router-dom';
import galaxyimg from "../../../public/assets/galaxyimg.jpeg";
import Image from "next/image";

const UnitedStates: React.FC = () => {
  return (
    <div className="body">
      <div className="san-diego-page">
        <h2 className="category-title">Category</h2>
        <h1 className="page-title">United States</h1>
        <div className="articles">
          <div className="article">
            <Image
              src={galaxyimg}
              alt="Interview with Candidate"
              className="article-image"
            />
            <div className="article-content">
              <h3 className="article-title">
                {/* <Link
                  to="/article/id:102"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  An Interview with San Diego Candidate John Doe
                </Link> */}
              </h3>
              <p className="article-author">Jane Smith - Oct 29, 2024</p>
              <p className="article-excerpt">
                Can you tell me a little bit about your background? Where are
                you from? What is your major? What are your primary activities
                outside of class? I’m an E&EB major...
              </p>
            </div>
          </div>
          <div className="article">
            <Image
              src={galaxyimg}
              alt="Interview with Team Members"
              className="article-image"
            />
            <div className="article-content">
              <h3 className="article-title">
                {/* <Link
                  to="/article/id:102"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Interview with San Diego Council Members
                </Link> */}
              </h3>
              <p className="article-author">Alex Johnson - Oct 29, 2024</p>
              <p className="article-excerpt">
                Council members shared insights about the upcoming election and
                their plans for the city. They focused on community engagement
                and sustainable development...
              </p>
            </div>
          </div>
          {/* Add more articles as needed */}
        </div>
      </div>
    </div>
  );
};

export default UnitedStates;
