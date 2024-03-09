import React, { useEffect, useState } from 'react';
import './ProfilePage.scss';
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  const baseUrl = window.location.origin;


  const userName = user ? user.username : 'Loading...';


  const apiUrl = process.env.NODE_ENV === 'production'
  ? `${baseUrl}`
  : 'http://localhost:3001';




  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRes = await axios.get(`${apiUrl}/users/${user}/orders`);
        setOrders(ordersRes.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsRes = await axios.get(`${apiUrl}/users/${user}/reviews`);
        setReviews(reviewsRes.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const checkUserAuthentication = async () => {
        try {
          const response = await axios.get(`/user`);
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
    fetchOrders();
    fetchReviews();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${apiUrl}/users/deleteAccount`); // Adjust the endpoint as needed
      // Handle post-deletion logic (e.g., navigate to a goodbye page, logout the user)
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="profile-page">
      <h1 style={{ color: 'red' }}>{userName}</h1>
      <Dropdown title="Your Orders" items={orders} emptyMessage="You have no orders" />
      <Dropdown title="Your Reviews" items={reviews} emptyMessage="You have no reviews" />
      <button onClick={handleDeleteAccount} style={{marginBottom: "10vh"}}>Delete Account</button>
      <button onClick={() => navigate(-1)}>Back</button> {/* Navigates back to the previous page */}
    </div>
  );
};

export default ProfilePage;
