import galaxyimg from '../../../public/assets/galaxyimg.jpeg';
import '../../Styles/ArticleView.css';
import Image from 'next/image';
import HeaderNav from "@components/HeaderNav";
import Footer from "@components/Footer";

const ArticleView: React.FC = () => {
    return (
        <div className="body"><HeaderNav></HeaderNav>
            <div className="article-page">
                
                <div className="article-container">
                    <h3 className="article-title">ARTICLE NAME HERE</h3>
                    <p className="article-author">Jane Smith - Oct 29, 2024</p>
                    <Image 
                        src={galaxyimg} 
                        alt="Galaxy Image for Interview with Candidate" 
                        className="article-image" 
                    />
                    <p className="article-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                        officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus 
                        ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent 
                        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et 
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                        eu 
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                        mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus 
                        ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent 
                        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                    </p>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ArticleView;
