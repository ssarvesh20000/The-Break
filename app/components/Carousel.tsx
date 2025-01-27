import React, { useState } from 'react';
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
  const [currentIndices, setCurrentIndices] = useState(new Array(blogs.length).fill(0));

  const handleArticleClick = (id: string) => {
    router.push(`/pages/articleView/${id}`);
  };

  const handleNext = (index: number) => {
    const newIndices = [...currentIndices];
    if (newIndices[index] < Math.ceil(blogs[index].length / 3) - 1) {
      newIndices[index] += 1;
      setCurrentIndices(newIndices);
    }
  };

  const handlePrev = (index: number) => {
    const newIndices = [...currentIndices];
    if (newIndices[index] > 0) {
      newIndices[index] -= 1;
      setCurrentIndices(newIndices);
    }
  };

  return (
    <div className="blog-carousel-container">
      <h2 className="carousel-title">{title}</h2>
      {blogs.slice(0, 5).map((categoryBlogs, idx) => (
        <div className="carousel" key={idx}>
          <h3>{['San Diego', 'United States', 'World', 'Opinion', 'Multimedia'][idx]}</h3>
          <aside className="carousel-sidebar">
            <button onClick={() => handlePrev(idx)}> ← </button>
            <div className="carousel-inner">
              {categoryBlogs.slice(currentIndices[idx] * 3, currentIndices[idx] * 3 + 3).map((blog: Blog) => (
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
              {/* Render empty divs if less than three articles */}
              {Array(3 - categoryBlogs.slice(currentIndices[idx] * 3, currentIndices[idx] * 3 + 3).length).fill(null).map((_, index) => (
                <div key={index} className="carousel-article empty">
                  <div className="carousel-image placeholder"></div>
                  <h3>---</h3>
                  <p className="article-author">---</p>
                </div>
              ))}
            </div>
            <button onClick={() => handleNext(idx)}> → </button>
          </aside>
        </div>
      ))}
    </div>
  );
};

export default BlogCarousel;