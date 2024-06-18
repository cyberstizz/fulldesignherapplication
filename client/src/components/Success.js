import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Success.scss'; // Assuming you have a corresponding SCSS file for styling

const Success = () => {
  const location = useLocation();
  const { itemName } = location.state || { itemName: "your item" }; // Default item name if not provided

  return (
    <div className="success-container">
      <h1>Success!</h1>
      <p>Your payment has been received! Your receipt for "{itemName}" will be emailed to you.</p>
      <Link to="/"><button className="home-button">Go Home</button></Link>
    </div>
  );
};

export default Success;
