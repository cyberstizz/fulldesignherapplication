import React from 'react';
import './ReviewComponent.scss';

const ReviewComponent = ({ headline, rating, review, userName }) => {
  return (
    <div className="reviewComponent">
      <h3 className="headline">{headline}</h3>
      <div className="rating">Rating: {rating}</div>
      <p className="review">{review}</p>
      <p className="userName">- {userName}</p>
    </div>
  );
};

export default ReviewComponent;
