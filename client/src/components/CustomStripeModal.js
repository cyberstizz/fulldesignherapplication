import React from 'react';
import './CustomStripeModal.scss';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CustomStripeModal = ({ isOpen, onClose, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      console.log('Stripe has not loaded');
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);
  
    if (error) {
      console.error('Error creating token:', error);
    } else if (token) {
      console.log('Created token:', token);
      try {
        const response = await axios.post('/payments', {
          token: token.id,
          product: { name: "Your Cart", price: totalPrice },
        });
        console.log("Payment successful:", response.data);
        onClose(); // Close the modal upon successful payment
      } catch (error) {
        console.error('Payment error:', error);
      }
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
