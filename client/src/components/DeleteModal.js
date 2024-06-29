import React from 'react';
import './DeleteModal.scss'; // Import CSS for styling

const DeleteModal = ({ isOpen, onClose, productName, onDelete }) => {
  // Function to handle delete action
  const handleDelete = () => {
    onDelete(); // Trigger the onDelete function from the parent component
    onClose(); // Close the modal after deletion
  };

  return isOpen && (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times; {/* Close button */}
        </button>
        <div className="delete-modal-content">
          <p>Are you sure you want to delete {productName}? It will be gone forever.</p>
          <div className="button-container">
            <button className="cancel-button" onClick={onClose}>Cancel</button>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
