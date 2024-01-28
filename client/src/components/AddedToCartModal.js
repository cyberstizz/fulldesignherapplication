// LoginModal.js
import React from 'react';
import './AddedtoCartModal.scss';

const AddedToCartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {/* Add your modal content here */}
        <div>Added to Cart Modal</div>
      </div>
    </div>
  );
};

export default AddedToCartModal;
