// LoginModal.js
import React from 'react';
import './LogoutModal.scss';

const LogoutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {/* Add your modal content here */}
        <div>Logout Modal</div>
      </div>
    </div>
  );
};

export default LogoutModal;
