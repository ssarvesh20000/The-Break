import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import galaxyimg from "../../../public/assets/galaxyimg.jpeg";
import "../../../Styles/ArticleView.css";
import Image from "next/image";
import HeaderNav from "@components/HeaderNav";
import Footer from "@components/Footer";

const ArticleView = () => {
  const router = useRouter();
  const { id } = router.query; // Get the article ID from the URL
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`);
        const data = await response.json();
        setArticle(data);
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
    <div className="body">
      <HeaderNav />
      <div className="article-page">
        <div className="article-container">
          <h3 className="article-title">{article.title}</h3>
          <p className="article-author">
            {article.author} - {new Date(article.createdAt).toLocaleDateString()}
          </p>
          <Image
            src={article.image || galaxyimg}
            alt={article.title}
            className="article-image"
            width={800}
            height={600}
          />
          <p className="article-content">{article.content}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArticleView;
