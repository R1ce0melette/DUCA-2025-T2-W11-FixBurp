import React from 'react';
import Card from './Card';
import articleList from '../articleList';

const Articles = () => {
  return (
    <div className="articles-section">
      <h2>Featured Articles</h2>
      <div className="row">
        {articleList.map(article => (
          <Card
            key={article.id}
            article={article.title}
            description={article.description}
            name={article.author}
            grade={article.rating}
            image={article.image}
          />
        ))}
      </div>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button className="seeMore">See all articles</button>
      </div>
    </div>
  );
};

export default Articles;