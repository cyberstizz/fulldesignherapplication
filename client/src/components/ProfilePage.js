import React, { useEffect, useState } from 'react';
import './ProfilePage.scss';
import Dropdown from './Dropdown';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  // Extract userId from URL parameters
  const { userId } = useParams();
  const navigate = useNavigate();

  // State variables for orders, reviews, and user information
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  // Determine base URL based on environment
  const baseUrl = window.location.origin;
  const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}` : 'http://localhost:3001';

  // Effect to check user authentication status
  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await axios.get('/user');
        if (response.status === 200) {
          setUser(response.data.user); // Set user data if authenticated
        } else {
          setUser(null); // Set user to null if not authenticated
        }
      } catch (error) {
        console.error('Error checking user authentication:', error.message);
      }
    };

    checkUserAuthentication();
  }, []);

  // Effect to fetch orders and reviews when user data is available
  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const ordersRes = await axios.get(`${apiUrl}/users/${userId}/orders`);
          setOrders(ordersRes.data.orders); // Set fetched orders
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

      const fetchReviews = async () => {
        try {
          const reviewsRes = await axios.get(`${apiUrl}/users/${userId}/reviews`);
          setReviews(reviewsRes.data.reviews); // Set fetched reviews
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };

      fetchOrders();
      fetchReviews();
    }
  }, [user, apiUrl]);

  // Function to handle account deletion
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${apiUrl}/users/deleteAccount`);
      navigate('/'); // Redirect to homepage after deletion
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="profile-page">
      <h1 className="profileUsername">{user ? user.username : 'Loading...'}</h1>
      {/* Dropdown for displaying user's orders */}
      <Dropdown 
        title="Your Orders" 
        items={orders.map(order => ({
          title: `Order Number: ${order.order_number}`,
          content: (
            <>
              <div className='orderDate'>Order Date: {new Date(order.order_date).toLocaleDateString()}</div>
              <div>
                <span className="orderAndreviewItems" style={{color: "black"}}>Product</span><br/>
                <ul>
                  {order.products.map(product => (
                    <li key={product.product_id}>
                      <span className="orderAndreviewItems" style={{color: 'orange'}}><strong>{product.product_name}</strong>: </span> 
                      <span className="orderAndreviewItems" style={{color: 'green'}}>${product.product_price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ),
        })) || []} // Ensure items is an array
        emptyMessage="You have no orders" 
        type="orders"
      />
      {/* Dropdown for displaying user's reviews */}
      <Dropdown 
        title="Your Reviews" 
        items={reviews.map(review => ({
          title: (
            <span className="orderAndreviewItems">
              <span style={{color: "black", fontSize: "30px"}}>Review</span>
              <br />
              {review.headline}
            </span>
          ),
          content: (
            <div>
              <div className="orderAndreviewItems" style={{color: "orange"}}>Rating: {review.rating}</div>
              <div className="orderAndreviewItems">{review.review}</div>
            </div>
          ),
        })) || []} // Ensure items is an array
        emptyMessage="You have no reviews" 
        type="reviews"
      />
      
      {/* Button to navigate back */}
      <button onClick={() => navigate(-1)} style={{ 
        display: "flex",
        justifySelf: "center", 
        alignSelf: "center", 
        justifyContent: "center", 
        width: "40vw" 
      }}>
        &#8592;  Back
      </button>

      {/* Button to delete account */}
      <button onClick={handleDeleteAccount} style={{
        display: "flex",
        justifySelf: "center",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "darkred",
        border: 'solid 2px orange',
        position: "fixed",
        bottom: "5vh",
        left: "50%",
        transform: "translateX(-50%)",
        width: "40vw",
      }}>
        Delete Account
      </button>
    </div>
  );
};

export default ProfilePage;
