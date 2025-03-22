"use client";
import React, { useEffect, useState } from "react";
import "@styles/Home.css";
import "@styles/Video.css";
import Image from "next/image";
import Video from "@components/video";
import HeaderNav from "@components/HeaderNav";
import Footer from "@components/Footer";
import { useRouter } from "next/navigation";
import { Blog } from "@interfaces/Blog";
import { Media } from "@interfaces/Media";
import Carousel from "@components/Carousel";
import Loading from "@components/Loading";
//import logo from "@public/logo.png";

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categoryBlogs, setCategoryBlogs] = useState<Blog[][]>([]);
  //const [media, setMedia] = useState<Media[]>([]);
  const [recentMedia, setRecentMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch recent blogs
        const recentBlogsRes = await fetch("/api/recentBlogs");
        const recentBlogsData = await recentBlogsRes.json();
        if (recentBlogsData.success) {
          setBlogs(recentBlogsData.data);
        } else {
          console.error("Failed to fetch blogs:", recentBlogsData.error);
        }

        // Fetch category blogs
        const categoryBlogsRes = await fetch("/api/categoryBlogs");
        const categoryBlogsData = await categoryBlogsRes.json();
        if (categoryBlogsData.success) {
          setCategoryBlogs(categoryBlogsData.data);
        } else {
          console.error("Failed to fetch category blogs:", categoryBlogsData.error);
        }

        // Fetch recent media (latest two media uploads)
        const recentMediaRes = await fetch("/api/recentMedia");
        const recentMediaData = await recentMediaRes.json();
        if (recentMediaData.success) {
          setRecentMedia(recentMediaData.data.slice(0, 2)); // trim returned media to only have first two items
        } else {
          console.error("Failed to fetch media:", recentMediaData.error);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <Loading />;
  }  

  const handleArticleClick = (id: string) => {
    router.push(`/pages/articleView/${id}`);
  };

  return (
    <>
      <div className="home-container">
        <HeaderNav />
        <div className="recent-blogs">
        <div className="content-wrapper">
          {/* Left Sidebar */}
          <aside className="left-sidebar">
            {blogs.slice(1, 3).map((blog: Blog) => (
              <div
                className="left-sidebar-article"
                key={blog._id}
                onClick={() => handleArticleClick(blog._id)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={`/api/image/${blog.image}`}
                  alt={blog.title}
                  width={400}
                  height={300}
                />
                <h2>{blog.title}</h2>
                <p className="article-card-author">
                  {blog.author} - {new Date(blog.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </aside>


          {/* Main Content, shows first blog in returned json list */}
          <section className="main-content">
            {blogs[0] && (
              <div
                className="main-article"
                onClick={() => handleArticleClick(blogs[0]._id)}
              >
                <Image
                  src={`/api/image/${blogs[0].image}`}
                  alt={blogs[0].title}
                  className="main-image"
                  width={400}
                  height={300}
                />
                <p className="main-title">{blogs[0].title}</p>
                <p className="main-author">
                  {blogs[0].author} -{" "}
                  {new Date(blogs[0].date).toLocaleDateString()}
                </p>
                <div style={{ position: "relative" }}>
                  <div
                      dangerouslySetInnerHTML={{ __html: blogs[0].content }}
                      style={{
                        maxHeight: "5.75rem",
                        overflow: "hidden",
                      }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "5em", // Adjust height of fade
                      background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)",
                    }}
                  > </div>
                </div>
              </div>
            )}
          </section>

          {/* Right Sidebar */}
          <aside className="sidebar">
            {blogs.slice(3).map((blog: Blog) => (
              <div
                className="sidebar-article"
                key={blog._id}
                onClick={() => handleArticleClick(blog._id)}
                style={{
                  display: "flex", // Enables flexbox
                  flexDirection: "row", // Arranges children in a row
                  cursor: "pointer",
                  marginBottom: "20px", // Adds space between items
                  alignItems: "flex-start" // Aligns items to the start of the flex container
                }}
              >
                <div style={{
                  flex: "1",
                  paddingRight: "20px" // Adds spacing between text and image
                }}>
                  <h3>{blog.title}</h3>
                  <p className="article-card-author">
                    {blog.author} - {new Date(blog.date).toLocaleDateString()}
                  </p>
                </div>
                <Image
                  src={`/api/image/${blog.image}`}
                  alt={blog.title}
                  className="sidebar-image"
                  width={300}
                  height={200}
                  style={{
                    flex: "none", // The image doesn't grow or shrink
                    alignSelf: "flex-start" // Aligns the image at the start of the flex container
                  }}
                />
              </div>
            ))}
            {/*<footer className="read-more">Read More</footer>*/}
          </aside>
        </div>
        </div>

        <Carousel 
          blogs={categoryBlogs} 
          title="Latest by Category"
        />

        <section className="video-section">
          <Video 
          media={recentMedia} title={""}     
          />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
