import React from 'react';
import './RemoveFromCartModal.scss'; // Adjust the path as per your project structure

const RemoveFromCartModal = ({ isOpen, onClose, onRemove }) => {
  if (!isOpen) return null;

  return (
    <div className="removeFromCartModal-overlay" onClick={onClose}>
      <div className="removeFromCartModal" onClick={e => e.stopPropagation()}>
        <p>Remove from cart?</p>
        <div className="modal-actions">
          <button className="modal-action-btn" onClick={onRemove}>Yes</button>
          <button className="modal-action-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveFromCartModal;
