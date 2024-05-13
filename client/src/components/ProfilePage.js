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


  const userName = user ? user.username : 'Loading...';


  const apiUrl = process.env.NODE_ENV === 'production'
  ? `${baseUrl}`
  : 'http://localhost:3001';




  useEffect(() => {


    const checkUserAuthentication = async () => {
        try {
          const response = await axios.get(`/user`);
          if (response.status === 200) {
            setUser(response.data.user);
          } else {
            setUser(null);
          }

          console.log(user)
        } catch (error) {
          console.error('Error checking user authentication:', error.message);
        }
      };
  
      
    checkUserAuthentication();
  }, []);


  //the two functions to get reviews and orders
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
      <Dropdown title="Your Orders" items={orders} onClick={fetchOrders} emptyMessage="You have no orders" />
      <Dropdown title="Your Reviews" items={reviews} onClick={fetchReviews} emptyMessage="You have no reviews" />
      <button onClick={handleDeleteAccount} style={{display: "flex", justifySelf: "center", alignSelf: "center", justifyContent: "center", marginBottom: "5vh", width: "40vw"}}>Delete Account</button>
      <button onClick={() => navigate(-1)}  style={{display: "flex", justifySelf: "center", alignSelf: "center", justifyContent: "center", width: "40vw"}}>Back</button> {/* Navigates back to the previous page */}
    </div>
  );
};

export default ProfilePage;
