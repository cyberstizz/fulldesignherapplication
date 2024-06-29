import React, { useState, useEffect } from 'react';
import './EditModal.scss'; // Import CSS for styling

const EditModal = ({ isOpen, onClose, product, onUpdate }) => {
  // State to track the edited product details
  const [editedProduct, setEditedProduct] = useState({ ...product });
  // State to store the selected file for the image
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle image selection and update the state
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setEditedProduct((prevProduct) => ({
          ...prevProduct,
          image: reader.result, // Store the image data URL
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle update and close the modal
  const handleUpdate = () => {
    console.log('Updated product before update:', editedProduct);
    onUpdate(editedProduct);
    onClose();
  };

  // Handle changes in input fields and update the state
  const handleInputChange = (e) => {
    console.log('Input change:', e.target.name, e.target.value);
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
      image: selectedFile, // Use the file object directly
    }));
  };

  // Update the edited product when the product prop changes
  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product]);

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      {/* Modal content */}
      <h2>Edit {product.name}</h2>
      {/* Input fields for product details */}
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedProduct.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={editedProduct.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="productType">Product Type:</label>
        <select
          id="productType"
          name="productType"
          value={editedProduct.productType}
          onChange={handleInputChange}
        >
          {/* Options for product types */}
          <option value="crocs">Crocs</option>
          <option value="jackets">Jackets</option>
          <option value="sneakers">Sneakers</option>
          <option value="boots">Boots</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="productPrice">Product Price:</label>
        <input
          type="number"
          id="productPrice"
          name="productPrice"
          value={editedProduct.productPrice}
          onChange={handleInputChange}
        />
      </div>

      {/* Update button to call handleUpdate */}
      <button onClick={handleUpdate}>Update</button>
      {/* Cancel button to close the modal */}
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditModal;
