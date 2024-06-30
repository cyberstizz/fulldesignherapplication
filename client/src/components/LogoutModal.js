import React from 'react';
import './LogoutModal.scss';

const LogoutModal = ({ isOpen, onClose }) => {
  // Do not render the modal if it's not open
  if (!isOpen) return null;

  // Render the modal
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {/* Modal content for logout */}
        <div>Logout Modal</div>
      </div>
    </div>
  );
};

export default LogoutModal;
