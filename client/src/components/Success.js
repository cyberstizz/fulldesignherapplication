import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Success.scss'; 

const Success = () => {
  const location = useLocation();
  const { itemName } = location.state || { itemName: "your item" }; // Default item name if not provided

  return (
    <div className="success-container">
      <h1>Success!</h1>
      {/* Display success message with item name */}
      <p>Your payment has been received! Your receipt for "{itemName}" will be emailed to you.</p>
      {/* Button to navigate back to home */}
      <Link to="/"><button className="home-button">Go Home</button></Link>
    </div>
  );
};

export default Success;
