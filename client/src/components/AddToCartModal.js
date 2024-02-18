// AddToCartModal.js
import React from 'react';
import './AddToCartModal.scss';

const AddToCartModal = ({ isOpen, onClose, onAdd, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Add {productName} to cart?</h2>
        <div className="modal-actions">
          <button className="modal-button" onClick={onAdd}>Add</button>
          <button className="modal-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
