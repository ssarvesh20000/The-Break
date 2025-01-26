'use client';
import React from 'react';
import Image from 'next/image';
import { Blog } from "@interfaces/Blog";
import { useRouter } from 'next/navigation';
import '@styles/Carousel.css';

interface BlogCarouselProps {
  blogs: Blog[];
  title?: string;
}

const BlogCarousel: React.FC<BlogCarouselProps> = ({ blogs, title = "Read More" }) => {
  const router = useRouter();

  const handleArticleClick = (id: string) => {
    router.push(`/pages/articleView/${id}`);
  };

  return (
    <div className="blog-carousel-container">
      <h2 className="carousel-title">{title}</h2>
      <aside className="carousel-sidebar">
        {blogs.map((blog: Blog) => (
          <div
            className="carousel-article"
            key={blog._id}
            onClick={() => handleArticleClick(blog._id)}
            style={{ cursor: "pointer" }}
          >
            {blog.category && <p className="article-category">{blog.category}</p>}
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
      </aside>
    </div>
  );
};

export default BlogCarousel;