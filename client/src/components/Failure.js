// SuccessPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const Failure = () => {
  return (
    <div>
      <h1>Payment Unsuccessful!</h1>
      <Link to="/" ><button>back Home</button></Link>
      {/* Add additional content as needed */}
    </div>
  );
};

export default Failure;
