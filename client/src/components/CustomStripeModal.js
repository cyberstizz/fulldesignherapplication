import React, { useState } from 'react';
import './CustomStripeModal.scss';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { clearCart } from '../app/features/cart/cartSlice'; // Adjust path as necessary
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CustomStripeModal = ({ isOpen, onClose, totalPrice, productName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [customersEmail, setCustomersEmail] = useState('');



  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await Axios.get('/user');
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking user authentication:', error.message);
      }
    };

    checkUserAuthentication();
  }, []);

  const properLettering = (word) => {
    //this function will parse a string and remove
    //any _ characters

    //create a new variable that will be returned
    //this variable will be an array
    let newString = [];


    for(let i = 0; i < word.length; i++){

    
    //loop through the string, and for every element
    //check to see if it is an underscore and if it is
    //push a blank space into the array '', if it is not
    if(word[i] !== '_'){
    //push the letter into the array
        newString.push(word[i]);
    } else{
        newString.push(' ');
    }
    }
    return newString.join('');
    //after getting out of the array join the array
    //into a string, and return the string
}


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
      const requestData = {
          product: { name: "Your Cart", price: totalPrice },
          name,
          customersEmail,
          address,
          ...(user && { customerId: user._id }) 

      };

      // Add customerId if the user is signed in
      if (customerId) {
          requestData.customerId = customerId;
      }

      const { data } = await axios.post('/payments', requestData);

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
          } else {
              if (result.paymentIntent.status === 'succeeded') {
                  console.log("Payment successful:", result.paymentIntent);
                  onClose();
                  dispatch(clearCart());
                  navigate('/success', { state: { itemName: properLettering(productName) } }); // Assuming you have the currentProduct name available here
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
        <h1 style={{fontSize: "35px", color: "white", justifySelf: "center"}}>buy {properLettering(productName)} with secure checkout</h1>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input type="text" placeholder="CustomersEmail" value={customersEmail} onChange={(e) => setCustomersEmail(e.target.value)} />
        <CardElement className="StripeElement" />
        <button onClick={handleSubmit}>Pay ${totalPrice.toFixed(2)}</button>
      </div>
    </div>
  );
};

export default CustomStripeModal;
