// ReviewsComponent.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ReviewComponent from './ReviewComponent';
import './ReviewsComponent.scss';
import axios from 'axios';

const ReviewsComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const { productType, productId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Assuming you have the apiUrl variable set correctly for your environment
        const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://designhercustomekreations-c288e9799350.herokuapp.com'
    : 'http://localhost:3001';


        const response = await axios.get(`${apiUrl}/reviews/${productType}/${productId}`);
        
        setReviews(response.data.reviews);
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [productId, productType]);

  return (
    <div className="reviewsComponent">
      <h2>Average Rating: {averageRating || 'Not rated yet'}</h2>
      {reviews.length > 0 ? (
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
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsComponent;
