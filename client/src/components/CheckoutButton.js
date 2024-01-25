import React, { useState } from 'react';
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutButton = (props) => {
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState('');

  const handleBuyNow = async () => {
    try {
      // Create a PaymentMethod using CardElement
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: stripe.elements.getElement(CardElement),
      });

      if (error) {
        console.error('Error creating PaymentMethod:', error);
        return;
      }

      // Make a request to your server to create a PaymentIntent
      const response = await axios.post('/charge', {
        amount: props.price * 100,
        payment_method: paymentMethod.id,
      });

      const { clientSecret } = response.data;
      setClientSecret(clientSecret);

      // Confirm the payment on the client side
      const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      console.log('Payment Intent Status:', confirmPayment.paymentIntent.status);

      if (confirmPayment.error) {
        console.error(confirmPayment.error.message);
      } else if (confirmPayment.paymentIntent.status === 'succeeded') {
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
