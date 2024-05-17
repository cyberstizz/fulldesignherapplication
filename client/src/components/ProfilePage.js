import React, { useEffect, useState } from 'react';
import './ProfilePage.scss';
import Dropdown from './Dropdown';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  const baseUrl = window.location.origin;
  const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}` : 'http://localhost:3001';

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await axios.get('/user');
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking user authentication:', error.message);
      }
    };

    checkUserAuthentication();
  }, []);

  useEffect(() => {
    console.log('userId:', userId);
    console.log('user:', user);

    if (user) {
      const fetchOrders = async () => {
        try {
          const ordersRes = await axios.get(`${apiUrl}/users/${userId}/orders`);
          setOrders(ordersRes.data.orders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

      const fetchReviews = async () => {
        try {
          const reviewsRes = await axios.get(`${apiUrl}/users/${userId}/reviews`);
          setReviews(reviewsRes.data.reviews);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };

      fetchOrders();
      fetchReviews();
    }
  }, [user, apiUrl]);

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${apiUrl}/users/deleteAccount`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="profile-page">
      <h1 style={{ color: 'white' }}>{user ? user.username : 'Loading...'}</h1>
      <Dropdown 
        title="Your Orders" 
        items={orders.map(order => ({
          title: `Order Number: ${order.order_number}`,
          content: (
            <>
              <div>Order Date: {new Date(order.order_date).toLocaleDateString()}</div>
              <div>
                Products:
                <ul>
                  {order.products.map(product => (
                    <li key={product.product_id}>
                      <strong>{product.product_name}</strong>: {product.product_description} (${product.product_price})
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ),
        }))} 
        emptyMessage="You have no orders" 
        type="orders"
      />
      <Dropdown 
        title="Your Reviews" 
        items={reviews.map(review => ({
          title: `Review: ${review.headline}`,
          content: (
            <div>
              <div>Rating: {review.rating}</div>
              <div>{review.review}</div>
            </div>
          ),
        }))}
        emptyMessage="You have no reviews" 
        type="reviews"
      />
      <button onClick={handleDeleteAccount} style={{ display: "flex", justifySelf: "center", alignSelf: "center", justifyContent: "center", marginBottom: "5vh", width: "40vw" }}>Delete Account</button>
      <button onClick={() => navigate(-1)} style={{ display: "flex", justifySelf: "center", alignSelf: "center", justifyContent: "center", width: "40vw" }}>Back</button>
    </div>
  );
};

export default ProfilePage;
