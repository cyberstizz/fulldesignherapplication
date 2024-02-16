import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);

  console.log(items);

  return (
    <div>
      <h2>Cart</h2>
      {items.map((item) => (
        <CartItem path={item.path} name={item.name} price={item.product_price} />
      ))}
    </div>
  );
};

export default Cart;
