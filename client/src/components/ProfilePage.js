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
  const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}`
    : 'http://localhost:3001';

  useEffect(() => {
    if (userId) {
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
  }, [userId]);

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
      <h1 style={{ color: 'red' }}>{user ? user.username : 'Loading...'}</h1>
      <Dropdown title="Your Orders" items={orders.map(order => ({
        id: order.order_number,
        date: order.order_date,
        products: order.product_ids
      }))} emptyMessage="You have no orders" />
      <Dropdown title="Your Reviews" items={reviews} emptyMessage="You have no reviews" />
      <button onClick={handleDeleteAccount} style={{ display: "flex", justifySelf: "center", alignSelf: "center", justifyContent: "center", marginBottom: "5vh", width: "40vw" }}>Delete Account</button>
      <button onClick={() => navigate(-1)} style={{ display: "flex", justifySelf: "center", alignSelf: "center", justifyContent: "center", width: "40vw" }}>Back</button>
    </div>
  );
};

export default ProfilePage;
