'use client';
import React, { useEffect, useState } from "react";
import "@styles/Catergory.css";
import HeaderNav from "@components/HeaderNav";
import Footer from "@components/Footer";
import { Media } from "@interfaces/Media";
import { useRouter } from "next/navigation";
import Loading from "@components/Loading";

const Multimedia: React.FC = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`/api/media`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          // Sort media by date (newest first)
          const sortedMedia = data.data.sort(
            (a: Media, b: Media) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setMedia(sortedMedia);
          console.log("Fetched and sorted media:", sortedMedia);
        } else {
          console.error("Failed to fetch media:", data.error);
        }
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const handleMediaClick = (id: string) => {
    router.push(`/pages/mediaView/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page-container">
      <HeaderNav />
      <main className="main-content">
        <div className="san-diego-page">
          <h2 className="category-title">Category</h2>
          <h1 className="page-title">Multimedia</h1>

          <div className="content">
            {media.length > 0 ? (
              media.map((mediaItem: Media) => (
                <div
                  className="article"
                  key={mediaItem._id}
                  onClick={() => handleMediaClick(mediaItem._id)}
                >
                  <div className="article-image">
                    <iframe
                      width="300"
                      height="200"
                      src={`https://www.youtube.com/embed/${new URL(mediaItem.youtubeLink).searchParams.get("v")}`}
                      title={mediaItem.title}
                      frameBorder="0"
                      className="article-image"
                    ></iframe>
                  </div>

                  <div className="article-content">
                    <h3 className="article-title">{mediaItem.title}</h3>
                    <p className="article-author">
                      {mediaItem.author} - {new Date(mediaItem.date).toLocaleDateString()}
                    </p>
                    <div style={{ position: "relative", paddingTop: "1.5rem" }}>
                      <div
                        dangerouslySetInnerHTML={{ __html: mediaItem.description }}
                        style={{
                          maxHeight: "9rem",
                          overflow: "hidden",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "50px",
                          background:
                            "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No media uploads available.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Multimedia;
