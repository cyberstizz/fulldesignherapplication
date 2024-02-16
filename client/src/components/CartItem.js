import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../app/features/cart/cartSlice'
import './CartItem.scss';
import RemoveFromCartModal from './RemoveFromCartModal';
import { useNavigate } from 'react-router';





const  CartItem = ({id, path, name, product_price}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch(); 

  const navigate = useNavigate();

  // Function to open the modal
  const openRemoveFromCartModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeRemoveFromCartModal = () => setIsModalOpen(false);

   // Placeholder function for remove item action
   const handleRemoveItem = () => {
    dispatch(removeFromCart({ id }));
    console.log("Item removed");
    closeRemoveFromCartModal(); 
    navigate(0, { replace: true, state: { key: Date.now() } });
  };

  return (
    <main className="fullCartItemComponent">
    <img src={path} width='75%'height='100%' style={{marginLeft: '-2%', borderTopRightRadius: '50px', borderBottomRightRadius: '50px', border: 'solid 1px silver', borderLeft: '0'}} alt='pants'></img>
    <div className="cartRightSection" syle={{display: 'flex', flexDirection: 'column'}}>
    <section className="cartTitle">{name}</section>
    <button className="deleteButton" onClick={() => openRemoveFromCartModal()} >Remove</button>
    <section className="cartPrice">${product_price}</section>
    </div>
    <img src="/cart-icon-28356.png" width='15%'height='30%' style={{marginTop: '30%', marginRight: '4%', objectFit: 'contain', overflow: 'hidden'}} alt='cart icon'></img>
    
    <RemoveFromCartModal isOpen={isModalOpen} onClose={closeRemoveFromCartModal} onRemove={handleRemoveItem} />

</main>
  );
}

export default CartItem;
