"use client";

import React, { useEffect, useState } from "react";
import "@styles/Home.css";
import "@styles/Video.css";
import Image from "next/image";
import galaxyimg from "../public/assets/galaxyimg.jpeg";
import Video from "./components/video";
import HeaderNav from "@components/HeaderNav";
import Footer from "@components/Footer";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog");
        const data = await response.json();
        if (data.success) {
          setBlogs(data.data);
        } else {
          console.error("Failed to fetch blogs:", data.error);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleArticleClick = (id: string) => {
    router.push(`/articleView/${id}`);
  };

  return (
    <div className="body">
      <div className="home-container">
        <HeaderNav />
        <div className="content-wrapper">
          {/* Left Sidebar */}
          <aside className="left-sidebar">
            {blogs.slice(0, 2).map((blog: any) => (
              <div
                className="left-sidebar-article"
                key={blog._id}
                onClick={() => handleArticleClick(blog._id)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={galaxyimg}
                  alt={blog.title}
                  width={400}
                  height={300}
                />
                <h2>{blog.title}</h2>
                <p className="article-author">
                  {blog.author} - {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </aside>

          {/* Main Content */}
          <section className="main-content">
            {blogs[0] && (
              <div
                className="main-article"
                onClick={() => handleArticleClick(blogs[0]._id)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={`/api/blog/${blogs[blogs.length - 1].image}`} // old {blogs[0].image || galaxyimg}
                  alt={blogs[0].title}
                  className="main-image"
                  width={600}
                  height={400}
                />
                <h2>{blogs[0].title}</h2>
                <p className="main-description">{blogs[0].description}</p>
                <p className="main-author">
                  {blogs[0].author} -{" "}
                  {new Date(blogs[0].createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </section>

          {/* Right Sidebar */}
          <aside className="sidebar">
            {blogs.slice(2).map((blog: any) => (
              <div
                className="sidebar-article"
                key={blog._id}
                onClick={() => handleArticleClick(blog._id)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={galaxyimg}
                  alt={blog.title}
                  className="sidebar-image"
                  width={300}
                  height={200}
                />
                <h3>{blog.title}</h3>
                <p className="article-author">
                  {blog.author} - {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
            <footer className="read-more">Read More</footer>
          </aside>
        </div>

        <section className="video-section">
          <Video />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
