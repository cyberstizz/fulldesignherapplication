import React, { useEffect, useState } from 'react';
import './ProfilePage.scss';
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const userName = "John Doe";
  const userOrders = ["Order 1", "Order 2"];
  const userReviews = ["Review 1", "Review 2"];
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/users/deleteAccount`); // Adjust the endpoint as needed
      // Handle post-deletion logic (e.g., navigate to a goodbye page, logout the user)
      navigate('/goodbye');
    } catch (error) {
      console.error('Error deleting account:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="profile-page">
      <h1 style={{ color: 'red' }}>{userName}</h1>
      <Dropdown title="Your Orders" items={userOrders} emptyMessage="You have no orders" />
      <Dropdown title="Your Reviews" items={userReviews} emptyMessage="You have no reviews" />
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <button onClick={() => navigate(-1)}>Back</button> {/* Navigates back to the previous page */}
    </div>
  );
};

export default ProfilePage;
