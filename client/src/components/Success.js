// SuccessPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div>
      <h1>Payment Successful!</h1>
      <Link to="/" ><button>back Home</button></Link>
    </div>
  );
};

export default Success;
