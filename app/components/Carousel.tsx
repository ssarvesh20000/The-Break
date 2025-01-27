'use client';
import React from 'react';
import Image from 'next/image';
import { Blog } from "@interfaces/Blog";
import { useRouter } from 'next/navigation';
import '@styles/Carousel.css';

interface BlogCarouselProps {
  blogs: Blog[][];
  title: string;
}

const BlogCarousel: React.FC<BlogCarouselProps> = ({ blogs, title }) => {
  const router = useRouter();
  console.log(blogs);

  const handleArticleClick = (id: string) => {
    router.push(`/pages/articleView/${id}`);
  };

  // TODO look into duplicates may be weird if not entire row is full
  return (
    <div className="blog-carousel-container">
      <h2 className="carousel-title">{title}</h2>
      {/* San diego blogs */}
      <h3> San Diego Blogs </h3>
      <aside className="carousel-sidebar">
        <div className="carousel-inner">
          {blogs[0].map((blog: Blog) => (
            <div
              className="carousel-article"
              key={blog._id}
              onClick={() => handleArticleClick(blog._id)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={`/api/image/${blog.image}`}
                alt={blog.title}
                className="carousel-image"
                width={300}
                height={200}
              />
              <h3>{blog.title}</h3>
              <p className="article-author">
                {blog.author} - {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>
          ))}
          {/* Duplicate of blog content for continuous scroll effect */}
          {blogs[0].map((blog: Blog, index) => (
            <div
              className="carousel-article"
              key={`duplicate-${blog._id || index}`}
              onClick={() => handleArticleClick(blog._id)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={`/api/image/${blog.image}`}
                alt={blog.title}
                className="carousel-image"
                width={300}
                height={200}
              />
              <h3>{blog.title}</h3>
              <p className="article-author">
                {blog.author} - {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </aside>

      {/* USA blogs */}
      <h3> United States Blogs </h3>
      <aside className="carousel-sidebar">
        <div className="carousel-inner">
          {blogs[1].map((blog: Blog) => (
            <div
              className="carousel-article"
              key={blog._id}
              onClick={() => handleArticleClick(blog._id)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={`/api/image/${blog.image}`}
                alt={blog.title}
                className="carousel-image"
                width={300}
                height={200}
              />
              <h3>{blog.title}</h3>
              <p className="article-author">
                {blog.author} - {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>
          ))}
          {/* Duplicate of blog content for continuous scroll effect */}
          {blogs[1].map((blog: Blog, index) => (
            <div
              className="carousel-article"
              key={`duplicate-${blog._id || index}`}
              onClick={() => handleArticleClick(blog._id)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={`/api/image/${blog.image}`}
                alt={blog.title}
                className="carousel-image"
                width={300}
                height={200}
              />
              <h3>{blog.title}</h3>
              <p className="article-author">
                {blog.author} - {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </aside>

      {/* World blogs */}
      <h3> World Blogs </h3>
      <aside className="carousel-sidebar">
        <div className="carousel-inner">
          {blogs[2].map((blog: Blog) => (
            <div
              className="carousel-article"
              key={blog._id}
              onClick={() => handleArticleClick(blog._id)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={`/api/image/${blog.image}`}
                alt={blog.title}
                className="carousel-image"
                width={300}
                height={200}
              />
              <h3>{blog.title}</h3>
              <p className="article-author">
                {blog.author} - {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>
          ))}
          {/* Duplicate of blog content for continuous scroll effect */}
          {blogs[2].map((blog: Blog, index) => (
            <div
              className="carousel-article"
              key={`duplicate-${blog._id || index}`}
              onClick={() => handleArticleClick(blog._id)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={`/api/image/${blog.image}`}
                alt={blog.title}
                className="carousel-image"
                width={300}
                height={200}
              />
              <h3>{blog.title}</h3>
              <p className="article-author">
                {blog.author} - {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </aside>

      {/* Opinion blogs */}
      <h3> Opinion Blogs </h3>
      <aside className="carousel-sidebar">
        <div className="carousel-inner">
          {blogs[3].map((blog: Blog) => (
            <div
              className="carousel-article"
              key={blog._id}
              onClick={() => handleArticleClick(blog._id)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={`/api/image/${blog.image}`}
                alt={blog.title}
                className="carousel-image"
                width={300}
                height={200}
              />
              <h3>{blog.title}</h3>
              <p className="article-author">
                {blog.author} - {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>
          ))}
          {/* Duplicate of blog content for continuous scroll effect */}
          {blogs[3].map((blog: Blog, index) => (
            <div
              className="carousel-article"
              key={`duplicate-${blog._id || index}`}
              onClick={() => handleArticleClick(blog._id)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={`/api/image/${blog.image}`}
                alt={blog.title}
                className="carousel-image"
                width={300}
                height={200}
              />
              <h3>{blog.title}</h3>
              <p className="article-author">
                {blog.author} - {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </aside>

      {/* Multimedia blogs */}
      <h3> Multimedia Blogs </h3>
      <aside className="carousel-sidebar">
        <div className="carousel-inner">
          {blogs[4].map((blog: Blog) => (
            <div
              className="carousel-article"
              key={blog._id}
              onClick={() => handleArticleClick(blog._id)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={`/api/image/${blog.image}`}
                alt={blog.title}
                className="carousel-image"
                width={300}
                height={200}
              />
              <h3>{blog.title}</h3>
              <p className="article-author">
                {blog.author} - {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>
          ))}
          {/* Duplicate of blog content for continuous scroll effect */}
          {blogs[4].map((blog: Blog, index) => (
            <div
              className="carousel-article"
              key={`duplicate-${blog._id || index}`}
              onClick={() => handleArticleClick(blog._id)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={`/api/image/${blog.image}`}
                alt={blog.title}
                className="carousel-image"
                width={300}
                height={200}
              />
              <h3>{blog.title}</h3>
              <p className="article-author">
                {blog.author} - {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </aside>

    </div>
  );
};

export default BlogCarousel;