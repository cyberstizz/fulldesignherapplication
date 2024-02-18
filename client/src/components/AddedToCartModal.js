// AddedToCartModal.js
import React from 'react';
import './AddedToCartModal.scss';

const AddedToCartModal = ({ isOpen, onClose, onGoToCart, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Yaaas!!! {productName} was added to your cart!!</h2>
        <div className="modal-actions">
          <button className="modal-button" onClick={onClose}>Ok</button>
          <button className="modal-button" onClick={onGoToCart}>Go to cart</button>
        </div>
      </div>
    </div>
  );
};

export default AddedToCartModal;
