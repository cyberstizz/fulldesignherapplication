import React from 'react';
import StripeCheckout from 'react-stripe-checkout'; // Import StripeCheckout component for Stripe payment integration
import axios from 'axios'; // Import axios for making HTTP requests
import './CheckoutButton.scss'; // Import the stylesheet for this component
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const CheckoutButton = (props) => {
  const navigate = useNavigate(); // Initialize navigate function for navigation

  // Function to handle the token received from Stripe after payment
  const handleToken = async (token) => {
    try {
      const product = {
        name: props.name, // Name of the product
        price: props.price, // Price of the product
      };

      const body = {
        token,
        product,
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      // Make a POST request to the server to process the payment
      const response = await axios.post('/payments', JSON.stringify(body), { headers });
      console.log(response);

      // Navigate to the success page on successful payment
      navigate('/success');
    } catch (error) {
      console.error('Error processing payment:', error);

      // Navigate to the failure page on payment failure
      navigate('/failure');
    }
  };

  return (
    <StripeCheckout
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY} // Stripe publishable key from environment variables
      token={handleToken} // Function to handle the token received from Stripe
      name={props.name} // Name of the product to be displayed on the Stripe form
      amount={props.price * 100} // Amount to be charged in cents
    >
      <button className='buyNowButton'>Buy Now</button> {/* Button to initiate the Stripe payment */}
    </StripeCheckout>
  );
};

export default CheckoutButton; // Export the CheckoutButton component as the default export
