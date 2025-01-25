'use client'
import React from "react";
import "@styles/Catergory.css";
import Image from "next/image";
import HeaderNav from "@components/HeaderNav";
import Footer from "@components/Footer";
import { useEffect, useState } from "react";
import { Blog } from "@interfaces/Blog";
import { useRouter } from "next/navigation";

const UnitedStates: React.FC = () => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await fetch(`/api/categoryBlogs/${encodeURIComponent("United States")}`);
        const data = await blogs.json();
        if (data.success) {
          setBlogs(data.data);
          console.log(data.data);
        } else {
          console.error("Failed to fetch blogs:", data.error);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } 
    };
    fetchBlogs();
  }, []);

  const handleArticleClick = (id: string) => {
    router.push(`/pages/articleView/${id}`);
  };

  return (
    <div className="body">
      <HeaderNav></HeaderNav>
      <div className="san-diego-page">
        <h2 className="category-title">Category</h2>
        <h1 className="page-title">United States</h1>

        <div className="articles">
          {blogs.map((blog: Blog) => (
            <div 
              className="article"
              key={blog._id}
              onClick={() => handleArticleClick(blog._id)}
            >
              <Image
                src={`/api/image/${blog.image}`} 
                alt="Article Image"
                className="article-image"
                width={300}
                height={200}
              />
              <div className="article-content">
                <h3 className="article-title">
                  {blog.title}
                </h3>
                <p className="article-author">{blog.author} - {new Date(blog.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UnitedStates;
