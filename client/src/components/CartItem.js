import React, { useState } from 'react'; // Import React library and useState hook
import { useDispatch } from 'react-redux'; // Import useDispatch hook from react-redux for dispatching actions
import { removeFromCart } from '../app/features/cart/cartSlice'; // Import removeFromCart action, adjust path as necessary
import './CartItem.scss'; // Import the stylesheet for this component
import RemoveFromCartModal from './RemoveFromCartModal'; // Import RemoveFromCartModal component
import { useNavigate } from 'react-router'; // Import hook for navigation

const CartItem = ({ id, path, name, product_price }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the modal visibility
  const dispatch = useDispatch(); // Initialize dispatch function for dispatching actions
  const navigate = useNavigate(); // Initialize navigate function for navigation

  // Function to open the modal
  const openRemoveFromCartModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeRemoveFromCartModal = () => setIsModalOpen(false);

  // Function to handle the remove item action
  const handleRemoveItem = () => {
    dispatch(removeFromCart({ id })); // Dispatch the removeFromCart action with the item id
    console.log("Item removed");
    closeRemoveFromCartModal(); // Close the modal after removing the item
  };

  return (
    <main className="fullCartItemComponent">
      {/* Image of the product */}
      <img
        src={path}
        width='75%'
        height='100%'
        style={{ marginLeft: '-2%', borderTopRightRadius: '50px', borderBottomRightRadius: '50px', border: 'solid 1px silver', borderLeft: '0' }}
        alt='product'
      />
      <div className="cartRightSection" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Product name */}
        <section className="cartTitle">{name}</section>
        {/* Button to remove the item */}
        <button className="deleteButton" onClick={openRemoveFromCartModal}>Remove</button>
        {/* Product price */}
        <section className="cartPrice">${product_price}</section>
      </div>
      {/* Cart icon image */}
      <img
        src="/cart-icon-28356.png"
        width='15%'
        height='30%'
        style={{ marginTop: '30%', marginRight: '4%', objectFit: 'contain', overflow: 'hidden' }}
        alt='cart icon'
      />
      {/* RemoveFromCartModal component */}
      <RemoveFromCartModal isOpen={isModalOpen} onClose={closeRemoveFromCartModal} onRemove={handleRemoveItem} />
    </main>
  );
}

export default CartItem; // Export the CartItem component as the default export
