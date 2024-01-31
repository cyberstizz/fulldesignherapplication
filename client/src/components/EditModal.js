import React, { useState } from 'react';
import './EditModal.scss'; // You can create this CSS file for styling

const EditModal = ({ isOpen, onClose, product, onUpdate }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleUpdate = () => {
    onUpdate(editedProduct); // Call the onUpdate function provided by the parent component
    onClose(); // Close the modal
  };

  return isOpen && (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="edit-modal-content">
          <p>Edit {product.name}</p>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
            />
          </div>
          {/* Add other input fields for image, description, product type, and product price */}
          <div className="button-container">
            <button className="update-button" onClick={handleUpdate}>Update</button>
            <button className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
