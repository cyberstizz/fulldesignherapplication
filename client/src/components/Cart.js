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
          <CartItem key={item.product_id} id={item.product_id} path={item.image_path} name={item.name} product_price={item.product_price} />
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
