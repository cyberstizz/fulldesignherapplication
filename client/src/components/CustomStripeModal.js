import React from 'react';
import './CustomStripeModal.scss';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomStripeModal = ({ isOpen, onClose, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      console.log('Stripe has not loaded');
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    // No need to create a token here; instead, create a PaymentIntent on the server and confirm it here
  
    try {
      // Call your server endpoint to create a PaymentIntent
      const { data } = await axios.post('/payments', {
        product: { name: "Your Cart", price: totalPrice },
      });
  
      if (data.success && data.clientSecret) {
        // Use the clientSecret from the server to confirm the payment
        const result = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement,
            // Optionally, include billing details, etc., here
          },
        });
  
        if (result.error) {
          console.error('Payment confirmation error:', result.error);
          // Handle errors here (e.g., showing an error message to the customer)
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            console.log("Payment successful:", result.paymentIntent);
            onClose(); // Close the modal upon successful payment
            navigate('/success')
        }
        }
      } else {
        console.error('Failed to create PaymentIntent on the server');
        // Handle server failure to create a PaymentIntent
      }
    } catch (error) {
      console.error('Payment error:', error);
      // Handle general axios errors here
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="customStripeModal-overlay" onClick={onClose}>
      <div className="customStripeModal" onClick={(e) => e.stopPropagation()}>
        <CardElement className="StripeElement" />
        <button onClick={handleSubmit}>Pay ${totalPrice.toFixed(2)}</button>
      </div>
    </div>
  );
};

export default CustomStripeModal;
