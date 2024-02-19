import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../app/features/cart/cartSlice';
import './CartItem.scss';
import RemoveFromCartModal from './RemoveFromCartModal';
import { useNavigate } from 'react-router';

const CartItem = ({ id, path, name, product_price }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    // Function to open the modal
    const openRemoveFromCartModal = () => setIsModalOpen(true);

    // Function to close the modal
    const closeRemoveFromCartModal = () => setIsModalOpen(false);

    // Function for remove item action
    const handleRemoveItem = () => {
        dispatch(removeFromCart({ id }));
        console.log("Item removed");
        closeRemoveFromCartModal(); 
    };

    return (
        <main className="fullCartItemComponent">
            <img src={path} alt={name} />
            <div className="cartRightSection">
                <section className="cartTitle">{name}</section>
                <section className="cartPrice">${product_price}</section>
                <button className="deleteButton" onClick={openRemoveFromCartModal}>Remove</button>
            </div>
            <RemoveFromCartModal isOpen={isModalOpen} onClose={closeRemoveFromCartModal} onRemove={handleRemoveItem} />
        </main>
    );
};

export default CartItem;
