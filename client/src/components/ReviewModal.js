import React, { useState, useEffect } from 'react';
import './ReviewModal.scss';

const ReviewModal = ({ isOpen, onClose, userId, onReviewSubmit }) => {
  const [headline, setHeadline] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  


  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      alert('Please sign in to write a review.');
      return;
    }
    onReviewSubmit({ userId, headline, rating, review });
    onClose();
  };




  return (
    <div className="reviewModal-overlay" onClick={onClose}>
      <div className="reviewModal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="headline">Headline</label>
            <input
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Rating</label>
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <input
                  key={index}
                  type="radio"
                  name="rating"
                  value={index + 1}
                  onChange={(e) => setRating(e.target.value)}
                />
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="review">Review</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
