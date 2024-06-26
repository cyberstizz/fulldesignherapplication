// AddToCartModal.js
import React from 'react'; // Importing React to use JSX and React functionalities
import './AddToCartModal.scss'; // Importing the stylesheet for the component

const AddToCartModal = ({ isOpen, onClose, onAdd, productName }) => {
  // If the modal is not open, return null (i.e., render nothing)
  if (!isOpen) return null;

  // Render the modal
  return (
    // The modal overlay, clicking on it will close the modal
    <div className="modal-overlay" onClick={onClose}>
      {/* The modal content, clicking on it will not close the modal */}
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* The modal header asking if the user wants to add the product to the cart */}
        <h2>Add {productName} to cart?</h2>
        {/* The modal actions: buttons for adding the product to the cart or closing the modal */}
        <div className="modal-actions">
          {/* Button to add the product to the cart */}
          <button className="modalOpen-button" onClick={onAdd}>Add</button>
          {/* Button to close the modal */}
          <button className="modalClose-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal; // Exporting the component to be used in other parts of the application
