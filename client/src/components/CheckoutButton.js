import React, { useState } from 'react';
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutButton = (props) => {
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState('');

  const handleBuyNow = async () => {
    try {
      // Make a request to your server to create a PaymentIntent
      const response = await axios.post('/charge', {
        amount: props.price * 100,
      });

      const { clientSecret } = response.data;
      setClientSecret(clientSecret);

      // Confirm the payment on the client side
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: stripe.elements.getElement(CardElement),
        },
      });

      console.log('Payment Intent Status:', result.paymentIntent.status);

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.error(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
        // You can handle the success scenario here (e.g., redirect the user, show a success message)
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
