import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  let totalPrice = 0;

  items.forEach(element => {
    totalPrice += element.product_price;
  });


  const handleArrowClick = () => {
    // Navigate to the home page when the logo is clicked
    navigate(-1);
  };

  console.log(items);

  return (
    <div>
    <i className="fas fa-arrow-left" onClick={handleArrowClick} style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }}></i>

      <h2>Cart</h2>
      {items.map((item) => (
        <CartItem id={item.product_id} path={item.image_path} name={item.name} product_price={item.product_price} />
      ))}


      <div>
        total ${totalPrice}
      </div>
    </div> 
  );
};

export default Cart;
