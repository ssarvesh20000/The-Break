//What we want is multimedia: an area for videos 
//Videos not hyperlink but you watch them on the website 
import React from 'react';
import '@styles/Video.css';

const Video: React.FC = () => {
return (
  <div className="video-container">
      <h2>Multimedia (Coming Soon!)</h2>
          <p>Watch our latest video content right here on our website.</p>

      {/* Video Section */}
      <div className="video-grid">
        {/* Video 1 */}
      <div className="video-item">
        <video controls>
          <source src="/path/to/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h4>Video Title 1</h4>
            <p>Brief description of the video content.</p>
        </div>

        {/* Video 2 */}
        <div className="video-item">
          <video controls>
            <source src="/path/to/video2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h4>Video Title 2</h4>
          <p>Brief description of the video content.</p>
        </div>

        {/* Add more video items as needed */}
        </div>
        </div>
  );
};

export default Video;
