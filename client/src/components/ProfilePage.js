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
    const fetchUser = async () => {
      try {
        const userRes = await axios.get(`${apiUrl}/user`);
        console.log('userRes:', userRes.data.user); // Log the response
        setUser(userRes.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [apiUrl]);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const ordersRes = await axios.get(`${apiUrl}/users/${user.user_id}/orders`);
          console.log('ordersRes:', ordersRes.data.orders); // Log the response
          setOrders(ordersRes.data.orders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

      const fetchReviews = async () => {
        try {
          const reviewsRes = await axios.get(`${apiUrl}/users/${user.user_id}/reviews`);
          console.log('reviewsRes:', reviewsRes.data.reviews); // Log the response
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
        items={orders} 
        emptyMessage="You have no orders" 
        type="orders" // Added type prop to differentiate between orders and reviews
      />
      <Dropdown 
        title="Your Reviews" 
        items={reviews} 
        emptyMessage="You have no reviews" 
        type="reviews" // Added type prop to differentiate between orders and reviews
      />
      <button onClick={handleDeleteAccount} style={{ display: "flex", justifySelf: "center", alignSelf: "center", justifyContent: "center", marginBottom: "5vh", width: "40vw" }}>Delete Account</button>
      <button onClick={() => navigate(-1)} style={{ display: "flex", justifySelf: "center", alignSelf: "center", justifyContent: "center", width: "40vw" }}>Back</button>
    </div>
  );
};

export default ProfilePage;
