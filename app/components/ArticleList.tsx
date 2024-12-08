import React from 'react';

interface ArticleListProps {
  title: string;
}

const ArticleList: React.FC<ArticleListProps> = ({ title }) => {
  return (
    <section className="article-list">
      <h3>Other Articles</h3>
      <ul>
        <li>{title}</li>
        <li>Article 2</li>
        <li>Article 3</li>
      </ul>
    </section>
  );
}

export default ArticleList;

