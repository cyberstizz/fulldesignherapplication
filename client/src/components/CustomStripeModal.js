import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import './CustomStripeModal.scss'; // Import the stylesheet for this component
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'; // Import Stripe components
import { useDispatch } from 'react-redux'; // Import useDispatch hook from react-redux
import { clearCart } from '../app/features/cart/cartSlice'; // Import clearCart action
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const CustomStripeModal = ({ isOpen, onClose, totalPrice, productName, productType }) => {
  const stripe = useStripe(); // Initialize Stripe
  const elements = useElements(); // Initialize Stripe Elements
  const navigate = useNavigate(); // Initialize navigate function for navigation
  const dispatch = useDispatch(); // Initialize dispatch function

  const [user, setUser] = useState(null); // State to store user information
  const [name, setName] = useState(''); // State to store user's name
  const [address, setAddress] = useState(''); // State to store user's address
  const [customersEmail, setCustomersEmail] = useState(''); // State to store user's email
  const [customerId, setCustomerId] = useState(''); // State to store customer's ID

  useEffect(() => {
    // Function to check user authentication status
    const checkUserAuthentication = async () => {
      try {
        const response = await axios.get('/user'); // Make a GET request to check user authentication
        if (response.status === 200) {
          setUser(response.data.user); // Set user information if authenticated
          setCustomerId(response.data.user ? response.data.user.user_id : null); // Set customer ID
        } else {
          setUser(null);
          setCustomerId(null); // Set customer ID to null if not authenticated
        }
      } catch (error) {
        console.error('Error checking user authentication:', error.message); // Log any errors
      }
    };

    checkUserAuthentication(); // Call the function to check user authentication
  }, []);

  const properLettering = (word) => {
    // Function to replace underscores with spaces in a string
    let newString = [];

    for (let i = 0; i < word.length; i++) {
      if (word[i] !== '_') {
        newString.push(word[i]);
      } else {
        newString.push(' ');
      }
    }
    return newString.join(''); // Return the formatted string
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!stripe || !elements) {
      console.log('Stripe has not loaded');
      return;
    }

    const cardElement = elements.getElement(CardElement); // Get the CardElement

    if (user) {
      setCustomerId(user.user_id); // Set customer ID if user is authenticated
    } else {
      setCustomerId(null); // Set customer ID to null if user is not authenticated
    }

    try {
      const requestData = {
        productName: productName,
        price: totalPrice,
        name,
        address,
        customersEmail,
        productType: productType
      };

      if (customerId) {
        requestData.customerId = customerId; // Include customer ID in the request data if available
      }

      const { data } = await axios.post('/payments', requestData); // Make a POST request to create a PaymentIntent

      if (data.success && data.clientSecret) {
        const result = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        if (result.error) {
          console.error('Payment confirmation error:', result.error); // Log any payment confirmation errors
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            console.log("Payment successful:", result.paymentIntent); // Log successful payment
            onClose(); // Close the modal
            dispatch(clearCart()); // Clear the cart
            navigate('/success', { state: { itemName: properLettering(productName) } }); // Navigate to success page
          }
        }
      } else {
        console.error('Failed to create PaymentIntent on the server'); // Log server failure to create PaymentIntent
      }
    } catch (error) {
      console.error('Payment error:', error); // Log any general errors
    }
  };

  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div className="customStripeModal-overlay" onClick={onClose}>
      <div className="customStripeModal" onClick={(e) => e.stopPropagation()}>
        <h1 style={{fontSize: "35px", color: "white", justifySelf: "center"}}>
          buy {properLettering(productName)} with secure checkout
        </h1>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Email" 
          value={customersEmail} 
          onChange={(e) => setCustomersEmail(e.target.value)} 
        />
        <CardElement className="StripeElement" /> {/* Stripe CardElement for card input */}
        <button onClick={handleSubmit}>Pay ${totalPrice.toFixed(2)}</button> {/* Button to initiate payment */}
      </div>
    </div>
  );
};

export default CustomStripeModal; // Export the CustomStripeModal component as the default export
