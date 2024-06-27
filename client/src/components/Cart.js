import React, { useState } from 'react'; // Import React library and useState hook
import { useSelector, useDispatch } from 'react-redux'; // Import hooks from react-redux for accessing and dispatching actions
import { useNavigate } from 'react-router-dom'; // Import hook for navigation
import CartItem from './CartItem'; // Import CartItem component
import CustomStripeModal from './CustomStripeModal'; // Import CustomStripeModal component
import { clearCart } from '../app/features/cart/cartSlice'; // Import clearCart action, adjust path as necessary
import './Cart.scss'; // Import the stylesheet for this component
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS for icons

const Cart = () => {
  const items = useSelector((state) => state.cart.items); // Get cart items from the Redux store
  const dispatch = useDispatch(); // Initialize dispatch function for dispatching actions
  const navigate = useNavigate(); // Initialize navigate function for navigation
  const [isCustomStripeModalOpen, setIsCustomStripeModalOpen] = useState(false); // State to manage the modal visibility

  // Calculate the total price of items in the cart
  let totalPrice = items.reduce((total, item) => total + parseFloat(item.product_price), 0);

  const properLettering = (word) => {
    // This function will parse a string and remove any _ characters

    // Create a new variable that will be an array to store the parsed string
    let newString = [];

    // Loop through the string
    for (let i = 0; i < word.length; i++) {
      // If the character is not an underscore, push it to the array
      if (word[i] !== '_') {
        newString.push(word[i]);
      } else {
        // If the character is an underscore, push a blank space to the array
        newString.push(' ');
      }
    }
    // Join the array into a string and return the string
    return newString.join('');
  };

  const handleCheckout = () => {
    // Implement checkout logic or navigation
    console.log('Proceeding to checkout');
  };

  const handleArrowClick = () => {
    // Navigate to the previous page when the arrow icon is clicked
    navigate(-1);
  };

  const handleClearCart = () => {
    // Dispatch the clearCart action to clear the cart
    dispatch(clearCart());
  };

  return (
    <React.Fragment>
      {/* Render CustomStripeModal component */}
      <CustomStripeModal
        isOpen={isCustomStripeModalOpen}
        onClose={() => setIsCustomStripeModalOpen(false)}
        totalPrice={Number(totalPrice)}
        productName="cart"
      />
      <div className="cart-container">
        <div className="cart-header">
          {/* Arrow icon to navigate back */}
          <i className="fas fa-arrow-left arrow-icon" onClick={handleArrowClick}></i>
          <h2>Checkout</h2>
        </div>

        <div className="cart-items">
          {/* Map through the items and render a CartItem component for each */}
          {items.map((item) => (
            <CartItem 
              key={item.product_id} 
              id={item.product_id} 
              path={item.image_path} 
              name={properLettering(item.name)} 
              product_price={item.product_price} 
            />
          ))}
        </div>

        <div className="cart-footer">
          {/* Display total price */}
          <div className="total-amount">Total: ${totalPrice.toFixed(2)}</div>
          {/* Button to open the checkout modal */}
          <button className="checkout-button" onClick={() => setIsCustomStripeModalOpen(true)}>Checkout</button>
          {/* Button to clear the cart */}
          <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart; // Export the Cart component as the default export
