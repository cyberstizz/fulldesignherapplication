import React, { useState, useRef } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutButton = ( props ) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const thePrice = props.price;
  const cardElementRef = useRef();


  // Check if cardElement is defined

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

    const cardElement = elements.getElement(CardElement);
    console.log(`these are the element ${elements}`)
    console.log(`and this is the card element ${cardElement}`)
    try {

      //first i will create  method dynamically
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      console.log(`this is the payment method ${paymentMethod}`)
      console.log(`and this is the payment method.id ${paymentMethod.id}`)



      if (!paymentMethod || !paymentMethod.id) {
        console.error('Payment method not available or missing ID.');
        return;
      }


      // Make a request to your server to create a PaymentIntent
      const response = await axios.post(`${apiUrl}/charge`, {
        amount: thePrice * 100, // Replace with the actual amount in cents
        payment_method: paymentMethod.id, // Replace with the actual payment method ID
      });

        // Ensure the client secret is in the correct format
    const { clientSecret } = response.data;
    if (!clientSecret.startsWith('pi_') || !clientSecret.includes('_secret_')) {
      console.error('Invalid client secret format');
      return;
    }
      console.log('this is the client secret');
      console.log(clientSecret);
      setClientSecret(clientSecret);

      // Proceed to confirm the payment immediately after retrieving the client secret
      confirmPayment(clientSecret);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const confirmPayment = async (clientSecret) => {
    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    console.log('Payment Intent Status:', result.paymentIntent.status);


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
      <form>
          <CardElement />
          <button type="submit" onClick={handleBuyNow} style={checkoutButtonStyle}>Buy Now</button>
      </form>
    </div>
  );
};

export default CheckoutButton;
