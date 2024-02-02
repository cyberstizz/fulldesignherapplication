import React, { useState, useEffect } from 'react';
import './EditModal.scss'; // You can create this CSS file for styling

const EditModal = ({ isOpen, onClose, product, onUpdate }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [selectedFile, setSelectedFile] = useState(null); // Add a state to store the selected file


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Store the selected file in the state

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setEditedProduct((prevProduct) => ({
          ...prevProduct,
          image: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    onUpdate(editedProduct); // Call the onUpdate function provided by the parent component
    onClose(); // Close the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      image: selectedFile, // Use the file object directly
    }));
  };

  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product]);
  
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
    {/* Modal content */}
    <h2>Edit {product.name}</h2>
    {/* Input fields for name, image, description, product type, and product price */}
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
