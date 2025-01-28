'use client';
import { useEffect, useState } from "react";
import "@styles/ArticleView.css";
import Image from "next/image";
import HeaderNav from "@components/HeaderNav";
import Footer from "@components/Footer";
import { useParams } from "next/navigation";
import { Blog } from "@interfaces/Blog";

const ArticleView = () => {
  console.log("ArticleView");
  const router = useParams();
  const id = router.id; // Use useParams to get the dynamic route parameter
  console.log("Article ID:", id);
  const [article, setArticle] = useState<Blog>();

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        console.log("Fetching article with ID:", id);
        const response = await fetch(`/api/blog/${id}`);
        const data = await response.json();
        setArticle(data.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]); 

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-view-outer-container">
      <div className="article-view-body">
        <HeaderNav />
        <div className="article-view-page">
            <div className="article-view-container">
                <h3 className="article-view-title">{article.title}</h3>
                <p className="article-view-author">
                    {article.author} - {new Date(article.date).toLocaleDateString()}
                </p>
                <div className="view-image-description-wrapper">
                    <Image
                        src={`/api/image/${article.image}`}
                        alt={article.title}
                        className="article-view-image"
                        width={800}
                        height={600}
                    />
                    <p className="article-view-description">{article.description}</p>
                </div>
                <div
                    className="article-view-content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>
        </div>
      </div>
      <Footer />
    </div>
);


}; 

export default ArticleView;