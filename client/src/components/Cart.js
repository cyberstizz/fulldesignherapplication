import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);

  return (
    <div>
      <h2>Cart</h2>
      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          {/* Display item details */}
        </div>
      ))}
    </div>
  );
};

export default Cart;
