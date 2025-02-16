//FRONTEND FOR HOW TO VIEW MEDIA UPLOADS 
'use client';
import { useEffect, useState } from "react";
import "@styles/MediaView.css"; // TODO changing style file if needed
//import Image from "next/image";
import HeaderNav from "@components/HeaderNav";
import Footer from "@components/Footer";
import { useParams } from "next/navigation";
import { Media } from "@interfaces/Media";
import Loading from "@components/Loading";

const MediaView = () => {
  console.log("MediaView");
  const router = useParams();
  const id = router.id; // Use useParams to get the dynamic route parameter
  console.log("Media ID:", id);
  const [media, setMedia] = useState<Media>();

  useEffect(() => {
    if (!id) return;

    const fetchMedia = async () => {
      try {

        console.log("Fetching Media with ID:", id);
        const response = await fetch(`/api/mediaView/${id}`);
        const data = await response.json();
        setMedia(data.data);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchMedia();
  }, [id]); 

  if (!media) {
    return <Loading />;
  }

    // Extract YouTube Video ID
    const extractVideoID = (url: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
      };

  return (
    <div className="media-view-outer-container">
      <div className="media-view-body">
        <HeaderNav />
        <div className="media-view-page">
            <div className="media-view-container">
                <h3 className="media-view-title">{media.title}</h3>
                <p className="media-view-author">
                    {media.author} - {new Date(media.date).toLocaleDateString()}
                </p>
                <div className="media-view-image">
                    <iframe
                        width="800"
                        height="450"
                        src={`https://www.youtube.com/embed/${extractVideoID(media.youtubeLink)}`}
                        title={media.title}
                        //frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="media-view-video"
                    ></iframe>
                <p className="media-view-content">{media.description}</p>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
);

}; 

export default MediaView;