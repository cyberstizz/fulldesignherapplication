import React, { useState } from 'react';
import Axios from 'axios';

const CreateModal = ({ isOpen, onClose, onCreate }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: null,
    description: '',
    productType: 'crocs',
    price: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        image: file,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('image', newProduct.image);
      formData.append('description', newProduct.description);
      formData.append('productType', newProduct.productType);
      formData.append('price', newProduct.price);

      const response = await Axios.post('/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);

      // Call the onCreate function provided by the parent component
      onCreate();
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error creating product:', error.message);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <h2>Create Product</h2>
      {/* Input fields for name, image, description, product type, and product price */}
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newProduct.name}
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
          value={newProduct.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="productType">Product Type:</label>
        <select
          id="productType"
          name="productType"
          value={newProduct.productType}
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
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
      </div>

      {/* Create and Cancel buttons */}
      <button style={{ backgroundColor: 'green' }} onClick={handleCreate}>
        Create
      </button>
      <button style={{ backgroundColor: 'red' }} onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

export default CreateModal;
