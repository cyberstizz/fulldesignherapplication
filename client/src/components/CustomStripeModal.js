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
    
    // Create a token or directly use cardElement for payment method creation
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Error:', error);
      return;
    }

    try {
      // Call your backend to create the PaymentIntent
      const { data } = await axios.post('/payments', {
        product: { name: "Your Cart", price: totalPrice },
      });

      // Confirm the payment on the client side
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        console.error('Payment confirmation error:', confirmError);
      } else {
        console.log("Payment successful:", paymentIntent);
        onClose(); // Close the modal upon successful payment
      }
    } catch (error) {
      console.error('Payment error:', error);
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
