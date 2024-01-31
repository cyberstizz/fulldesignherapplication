import React from 'react';
import './DeleteModal.scss'; // You can create this CSS file for styling
import { useState } from 'react';

const DeleteModal = ({ isOpen, onClose, productName, onDelete }) => {
  const handleDelete = () => {
    onDelete(); // Call the onDelete function provided by the parent component
    onClose(); // Close the modal
  };

  return isOpen && (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
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
