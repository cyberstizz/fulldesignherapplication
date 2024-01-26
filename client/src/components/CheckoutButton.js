import React from 'react';
import StripeCheckout  from 'react-stripe-checkout'; // Assuming you have a similar component for Stripe Checkout
import axios from 'axios';
import './CheckoutButton.scss';
import { useHistory } from 'react-router-dom';


const CheckoutButton = (props) => {

  const history = useHistory();

  const handleToken = async (token) => {
    try {
      const product = {
        name: props.name,
        price: props.price,
      };

      const body = {
        token,
        product,
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.post('/payments', JSON.stringify(body), {
        headers,
      });

      console.log(response);

      // Handle response as needed
        history.push('/success', {
          orderConfirmation: 'Your order was successful!',
          productName: props.name,
     });


    } catch (error) {
      console.error('Error processing payment:', error);

      history.push('/failure');

    }
  };

  return (
    <StripeCheckout
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      token={handleToken}
      name={props.name}
      amount={props.price * 100}
    >
      <button className='buyNowButton'>Buy Now</button>
    </StripeCheckout>
  );
};

export default CheckoutButton;
