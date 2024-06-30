import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ReviewComponent from './ReviewComponent';
import './ReviewsComponent.scss';
import axios from 'axios';

const ReviewsComponent = () => {
  // State to hold the list of reviews
  const [reviews, setReviews] = useState([]);
  // State to hold the average rating
  const [averageRating, setAverageRating] = useState(null);
  // Retrieve productType and productId from URL parameters
  const { productType, productId } = useParams();

  useEffect(() => {
    // Function to fetch reviews from the API
    const fetchReviews = async () => {
      try {
        // Set API URL based on the environment
        const apiUrl = process.env.NODE_ENV === 'production'
          ? 'https://designhercustomekreations-c288e9799350.herokuapp.com'
          : 'http://localhost:3001';

        // Get reviews for the specific product
        const response = await axios.get(`${apiUrl}/reviews/${productType}/${productId}`);
        
        // Update state with reviews and average rating
        setReviews(response.data.reviews);
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
    console.log(reviews);
  }, [productId, productType]); // Dependencies to re-fetch when productId or productType change

  return (
    <div className="reviewsComponent">
      {/* Display average rating or a placeholder if not available */}
      <h2>Average Rating: {averageRating || 'Not rated yet'}</h2>
      {reviews.length > 0 ? (
        // Map through reviews and render ReviewComponent for each
        reviews.map((review, index) => (
          <ReviewComponent
            key={index}
            headline={review.headline}
            rating={review.rating}
            review={review.review}
            userName={review.userName} // Ensure userName is included in your server response
          />
        ))
      ) : (
        // Message if no reviews are present
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsComponent;
