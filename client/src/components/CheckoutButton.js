import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutButton = ( props ) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const { thePrice } = props.price;

  const checkoutButtonStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '15px',
        background: 'linear-gradient(to right, rgb(71, 114, 6), rgb(30, 48, 2))',
        borderColor: 'rgb(71, 114, 6)',
        border: 'solid 2px orange',
        fontSize: '25px',
        fontFamily: "'Times New Roman', Times, serif",
        color: 'white'
  }

  const baseUrl = window.location.origin;

    const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}`
    : 'http://localhost:3001';

  const handleBuyNow = async () => {
    try {
      // Make a request to your server to create a PaymentIntent
      const response = await axios.post(`${apiUrl}/charge`, {
        amount: thePrice, // Replace with the actual amount in cents
        payment_method: 'pm_card_visa', // Replace with the actual payment method ID
      });

      setClientSecret(response.data.clientSecret);

      // Proceed to confirm the payment immediately after retrieving the client secret
      confirmPayment();
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const confirmPayment = async () => {
    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.error(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
        // You can handle the success scenario here (e.g., redirect the user, show a success message)
      }
    }
  };

  return (
    <div>
      <button onClick={handleBuyNow} style={checkoutButtonStyle}>Buy Now</button>
      <CardElement />
    </div>
  );
};

export default CheckoutButton;
