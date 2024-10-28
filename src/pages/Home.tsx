import React from 'react';
import MainStory from '../components/MainStory';
import ArticleList from '../components/ArticleList';

const Home: React.FC = () => {
  return (
    <div>
      <MainStory />
      <ArticleList title="prop of whatever?" />
      <ArticleList title="prop of whoever?" />
      <ArticleList title="prop of wherever?" />
      <ArticleList title="prop of whenever?" />
    </div>
  );
}

export default Home;
