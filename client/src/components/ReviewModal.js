import React, { useState, useEffect } from 'react';
import './ReviewModal.scss';

const ReviewModal = ({ isOpen, onClose, userId }) => {
  const [headline, setHeadline] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  


  if (!isOpen) return null;

  
  const handleSubmit = async() => {
    console.log('Submitting review:', { userId, headline, rating, review });

    try {
        // Example API endpoint for submitting a review
        const endpoint = `${apiUrl}/reviews`;
        const response = await Axios.post(endpoint, {
            userId,
            headline,
            rating: parseFloat(rating), // Ensure rating is sent as a number
            review,
        });

        if (response.status === 200) {
            console.log('Review submitted successfully:', response.data);
            // Handle successful review submission (e.g., display a success message, refresh reviews list)
        } else {
            console.error('Failed to submit review:', response.data);
            // Handle failure (e.g., display an error message to the user)
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        // Handle error (e.g., display an error message to the user)
    }


    onClose();
    }




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
