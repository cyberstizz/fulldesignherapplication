import React, { useState } from 'react';
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutButton = (props) => {
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState('');

  const handleBuyNow = async () => {
    try {
      // Get the token from the CardElement
      try {
        // Use CardElement directly (no need for stripe.elements.getElement)
        const { token } = await stripe.createToken();
    
        // Make a request to your server to create a PaymentIntent
        const response = await axios.post('/charge', {
          amount: props.price * 100,
          token: token.id, // Pass the token.id to the server
        });
  
  
      const { clientSecret } = response.data;
      setClientSecret(clientSecret);
  
      // Confirm the payment on the client side
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
  
      console.log('Payment Intent Status:', result.paymentIntent.status);
  
      if (result.error) {
        console.error(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      <button onClick={handleBuyNow}>Buy Now</button>
      <CardElement />
    </div>
  );
};

export default CheckoutButton;
