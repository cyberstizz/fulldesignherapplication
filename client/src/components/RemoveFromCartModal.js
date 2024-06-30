import React from 'react';
import './RemoveFromCartModal.scss';

const RemoveFromCartModal = ({ isOpen, onClose, onRemove }) => {
  // If the modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="removeFromCartModal-overlay" onClick={onClose}>
      {/* Prevent event bubbling to avoid closing the modal when clicking inside */}
      <div className="removeFromCartModal" onClick={e => e.stopPropagation()}>
        <p>Remove from cart?</p>
        <div className="modal-actions">
          {/* Button to confirm removal */}
          <button className="yes-action-btn" onClick={onRemove}>Yes</button>
          {/* Button to cancel and close the modal */}
          <button className="cancel-action-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveFromCartModal;
