// LoginModal.js
import React from 'react';
import './BuyNowModal.scss';

const BuyNowModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div>buy now Modal</div>
      </div>
    </div>
  );
};

export default BuyNowModal;
