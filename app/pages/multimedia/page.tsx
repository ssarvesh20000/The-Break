'use client'
import React from "react";
import "@styles/Catergory.css";
import Image from "next/image";
import HeaderNav from "@components/HeaderNav";
import Footer from "@components/Footer";
import { useEffect, useState } from "react";
import { Media } from "@interfaces/Media";
import { useRouter } from "next/navigation";
import Loading from "@components/Loading";

const Multimedia: React.FC = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const Media = await fetch(`/api/Media/${encodeURIComponent("Multimedia")}`);
        const data = await Media.json();
        if (data.success) {
          setMedia(data.data);
          console.log(data.data);
        } else {
          console.error("Failed to fetch blogs:", data.error);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } 
    };
    fetchMedia().then(() => setLoading(false));
  }, []);

  const handleArticleClick = (id: string) => {
    router.push(`/pages/articleView/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
    <div className="body">
      <HeaderNav></HeaderNav>
      <div className="san-diego-page">
        <h2 className="category-title">Category</h2>
        <h1 className="page-title">Multimedia</h1>

        <div className="articles">
          {media.map((Media: Media) => (
            <div 
              className="article"
              key={Media._id}
              onClick={() => handleArticleClick(Media._id)}
            >
              <Image
                src={`/api/image/${Media.youtubeLink}`} 
                alt="Article Image"
                className="article-image"
                width={300}
                height={200}
              />
              <div className="article-content">
                <h3 className="article-title">
                  {Media.title}
                </h3>
                <p className="article-author">{Media.author} - {new Date(Media.date).toLocaleDateString()}</p>
                <div style={{ position: "relative", paddingTop: "1.5rem" }}>
                  <div
                      dangerouslySetInnerHTML={{ __html: Media.description }}
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
                      height: "50px", // Adjust height of fade
                      background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)",
                    }}
                  > </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Multimedia;
