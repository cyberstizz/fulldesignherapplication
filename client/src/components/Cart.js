import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { clearCart } from '../app/features/cart/cartSlice'; // Adjust path as necessary
import './Cart.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let totalPrice = items.reduce((total, item) => total + parseFloat(item.product_price), 0);

  const handleCheckout = () => {
    // Implement checkout logic or navigation
    console.log('Proceeding to checkout');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
      <i className="fas fa-arrow-left arrow-icon" onClick={handleArrowClick}></i>
        <h2>Checkout</h2>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.product_id} {...item} />
        ))}
      </div>

      <div className="cart-footer">
        <div className="total-amount">Total: ${totalPrice.toFixed(2)}</div>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
      </div>
    </div>
  );
};

export default Cart;
