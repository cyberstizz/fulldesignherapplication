// Failure.js
import React from 'react';
import { Link } from 'react-router-dom';

// Component for displaying payment failure message
const Failure = () => {
  return (
    <div>
      <h1>Payment Unsuccessful!</h1>
      {/* Link to navigate back to the home page */}
      <Link to="/"><button>Back Home</button></Link>
    </div>
  );
};

export default Failure;
