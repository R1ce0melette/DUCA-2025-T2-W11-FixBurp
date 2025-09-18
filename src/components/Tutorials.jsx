import React from 'react';
import Card from './Card';
import tutorialList from '../tutorialList';

const Tutorials = () => {
  return (
    <div className="tutorials-section">
      <h2>Featured Tutorials</h2>
      <div className="row">
        {tutorialList.map(tutorial => (
          <Card
            key={tutorial.id}
            tutorial={tutorial.title}
            description={tutorial.description}
            name={tutorial.author}
            grade={tutorial.rating}
            image={tutorial.image}
          />
        ))}
      </div>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button className="seeMore">See all tutorials</button>
      </div>
    </div>
  );
};

export default Tutorials;