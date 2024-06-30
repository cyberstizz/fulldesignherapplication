import React from 'react';
import './ReviewComponent.scss';

const ReviewComponent = ({ headline, rating, review, userName }) => {
  return (
    <div className="reviewComponent">
      {/* Display the review headline */}
      <h3 className="headline">{headline}</h3>
      {/* Display the rating */}
      <div className="rating">Rating: {rating}</div>
      {/* Display the review text */}
      <p className="review">{review}</p>
      {/* Display the reviewer's username */}
      <p className="userName">- {userName}</p>
    </div>
  );
};

export default ReviewComponent;
