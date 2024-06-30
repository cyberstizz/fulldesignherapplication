import React, { useState, useEffect } from 'react';
import './ReviewModal.scss';
import Axios from 'axios';

const ReviewModal = ({ isOpen, onClose, userId, productId, productType }) => {
  // State for the review headline
  const [headline, setHeadline] = useState('');
  // State for the review rating
  const [rating, setRating] = useState(0);
  // State for the review text
  const [review, setReview] = useState('');

  // Define the API URL based on the environment
  const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://designhercustomekreations-c288e9799350.herokuapp.com'
    : 'http://localhost:3001';

  // If the modal is not open, return null
  if (!isOpen) return null;

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting review:', { userId, headline, rating, review, productId, productType });

    try {
      // API endpoint for submitting a review
      const endpoint = `${apiUrl}/reviews`;
      const response = await Axios.post(endpoint, {
        product_id: productId,
        product_type: productType,
        user_id: userId,
        headline,
        rating: parseFloat(rating), // Convert rating to a number
        review,
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Review submitted successfully:', response.data);
        // Handle successful review submission (e.g., display a success message)
      } else {
        console.error('Failed to submit review:', response.data);
        // Handle submission failure
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error during submission
    }

    // Close the modal after submission
    onClose();
  };

  return (
    <div className="reviewModal-overlay" onClick={onClose}>
      {/* Prevent event propagation to keep the modal open */}
      <div className="reviewModal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          {/* Input group for the headline */}
          <div className="input-group">
            <label htmlFor="headline">Headline</label>
            <input
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
            />
          </div>

          {/* Input group for the rating */}
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

          {/* Input group for the review text */}
          <div className="input-group">
            <label htmlFor="review">Review</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit button */}
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
