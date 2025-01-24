"use client";
import React, { useEffect, useState } from "react";
import "@styles/Home.css";
import "@styles/Video.css";
import Image from "next/image";
import galaxyimg from "../public/assets/galaxyimg.jpeg";
import Video from "@components/Video";
import HeaderNav from "@components/HeaderNav";
import Footer from "@components/Footer";
import { useRouter } from "next/navigation";
import { Blog } from "@interfaces/Blog";

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categoryBlogs, setCategoryBlogs] = useState<Blog[]>([]); // TODO, sarvesh use this variable when setting up the carousel for the blogs in each category
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Update with api endpoint from recentBlogs
        const recentBlogs = await fetch("/api/recentBlogs");
        let data;
        data = await recentBlogs.json();
        if (data.success) {
          setBlogs(data.data);
        } else {
          console.error("Failed to fetch blogs:", data.error);
        }
        // get most recent blog in each category
        const categoryBlogs = await fetch("/api/categoryBlogs");
        data = await categoryBlogs.json();
        if (data.success) {
          setCategoryBlogs(data.data);
        } else {
          console.error("Failed to fetch category blogs:", data.error);
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
    router.push(`pages/articleView/${id}`);
  };

  return (
    <div className="body">
      <div className="home-container">
        <HeaderNav />
        <div className="content-wrapper">
          {/* Left Sidebar */}
          <aside className="left-sidebar">
            {blogs.slice(0, 2).map((blog: Blog) => (
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
                <p className="article-author">
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
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={`/api/image/${blogs[0].image}`}
                  alt={blogs[0].title}
                  className="main-image"
                  width={600}
                  height={400}
                />
                <p className="main-description">{blogs[0].description}</p>
                <h2>{blogs[0].title}</h2>
                <p className="main-author">
                  {blogs[0].author} -{" "}
                  {new Date(blogs[0].date).toLocaleDateString()}
                </p>
              </div>
            )}
          </section>

          {/* Right Sidebar */}
          <aside className="sidebar">
            {blogs.slice(2).map((blog: Blog) => (
              <div
                className="sidebar-article"
                key={blog._id}
                onClick={() => handleArticleClick(blog._id)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={`/api/image/${blog.image}`}
                  alt={blog.title}
                  className="sidebar-image"
                  width={300}
                  height={200}
                />
                <h3>{blog.title}</h3>
                <p className="article-author">
                  {blog.author} - {new Date(blog.date).toLocaleDateString()}
                </p>
              </div>
            ))}
            <footer className="read-more">Read More</footer>
          </aside>
        </div>

        <div>
          {/* TODO Fix/ format this section, this is placeholder to see where the data is coming from */}
          <h1>Category Blogs</h1>
          <aside className="sidebar">
            {categoryBlogs.map((blog: Blog) => (
              <div
                className="sidebar-article"
                key={blog._id}
                onClick={() => handleArticleClick(blog._id)}
                style={{ cursor: "pointer" }}
              >
                <p> {blog.category} </p>
                <Image
                  src={`/api/image/${blog.image}`}
                  alt={blog.title}
                  className="sidebar-image"
                  width={300}
                  height={200}
                />
                <h3>{blog.title}</h3>
                <p className="article-author">
                  {blog.author} - {new Date(blog.date).toLocaleDateString()}
                </p>
              </div>
            ))}
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
