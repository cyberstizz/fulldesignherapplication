import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import CustomStripeModal from './CustomStripeModal';
import { clearCart } from '../app/features/cart/cartSlice'; // Adjust path as necessary
import './Cart.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCustomStripeModalOpen, setIsCustomStripeModalOpen] = useState(false);


  let totalPrice = items.reduce((total, item) => total + parseFloat(item.product_price), 0);
  


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

  const handleCheckout = () => {
    // Implement checkout logic or navigation
    console.log('Proceeding to checkout');
  };

  const handleArrowClick = () => {
    // Navigate to the home page when the logo is clicked
    navigate(-1);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <React.Fragment>
      <CustomStripeModal
        isOpen={isCustomStripeModalOpen}
        onClose={() => setIsCustomStripeModalOpen(false)}
        totalPrice={Number(totalPrice)}
        productName="cart"
      />
    <div className="cart-container">
      <div className="cart-header">
      <i className="fas fa-arrow-left arrow-icon" onClick={handleArrowClick}></i>
        <h2>Checkout</h2>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.product_id} id={item.product_id} path={item.image_path} name={properLettering(item.name)} product_price={item.product_price} />
        ))}
      </div>

      <div className="cart-footer">
        <div className="total-amount">Total: ${totalPrice.toFixed(2)}</div>
        <button className="checkout-button" onClick={() => setIsCustomStripeModalOpen(true)}>Checkout</button>
        <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
      </div>
    </div>
    </React.Fragment>
  );
};

export default Cart;
