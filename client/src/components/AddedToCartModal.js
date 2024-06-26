import React from 'react'; // Importing React to use JSX and React functionalities
import './AddedToCartModal.scss'; // Importing the stylesheet for the component

// The added to cart component
const AddedToCartModal = ({ isOpen, onClose, onGoToCart, productName }) => {
  // If the modal is not open, return null (i.e., render nothing)
  if (!isOpen) return null;

  // Render the modal
  return (
    // The modal overlay, clicking on it will close the modal
    <div className="modal-overlay" onClick={onClose}>
      {/* The modal content, clicking on it will not close the modal */}
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* The modal header displaying the product name added to the cart */}
        <h2 style={{color: 'green'}}>{productName} was added to your cart!!</h2>
        {/* The modal actions: buttons for closing the modal or going to the cart */}
        <div className="modal-actions">
          {/* Button to close the modal */}
          <button className="modalOk-button" onClick={onClose}>Ok</button>
          {/* Button to navigate to the cart */}
          <button className="modalCart-button" onClick={onGoToCart}>Go to cart</button>
        </div>
      </div>
    </div>
  );
};

export default AddedToCartModal; // Exporting the component to be used in other parts of the application
