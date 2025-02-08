import React from 'react';
import '@styles/Video.css';
import { Media } from '@interfaces/Media';
import { useRouter } from 'next/navigation';

interface VideoProps {
  media: Media[];
  title: string;
}

const Video: React.FC<VideoProps> = ({ media }) => {
  const router = useRouter();

  const handleMediaClick = (id: string) => {
    router.push(`/pages/mediaView/${id}`);
  };

  return (
    <div className="video-container">
      <h2>Multimedia</h2>
      <p>Watch our latest video form content right here on our website.</p>

      {/* Video Grid Section */}
      <div className="video-grid">
        {media.length > 0 ? (
          media.map((mediaItem) => (
            <div 
              key={mediaItem._id} 
              className="video-item"
              onClick={() => handleMediaClick(mediaItem._id)}
              style={{ cursor: "pointer" }}
            >
              {/* YouTube Embedded Video */}
              <div className="video-wrapper">
              <iframe
                width="550"
                height="350"
                src={`https://www.youtube.com/embed/${new URL(mediaItem.youtubeLink).searchParams.get("v")}`}
                title={mediaItem.title}
                //frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              </div>
              {/* Title */}
              <p className = "video-title">
              {mediaItem.title}
              </p>
              {/* Author & Date */}
              <p className="video-meta">
                {mediaItem.author} - {new Date(mediaItem.date).toLocaleDateString()}
              </p>

              {/* Description with fade effect */}
              <div className="video-description-container">
                <p className="video-description">{mediaItem.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No recent media available.</p>
        )}
      </div>
    </div>
  );
};

export default Video;
