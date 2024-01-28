// Modal.js
import React from 'react';
import './LoginModal.scss';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
