import React from 'react';
import { Link } from 'react-router-dom';

const Failure = () => {
  return (
    <div>
      <h1>Payment Unsuccessful!</h1>
      {/* Link to navigate back to the home page */}
      <Link to="/"><button>back Home</button></Link>
    </div>
  );
};

export default Failure;
