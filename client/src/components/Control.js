import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import './Crocs.scss'; // Import the stylesheet for this component
import Axios from 'axios'; // Import Axios for making HTTP requests
import ControlComponent from './ControlComponent'; // Import ControlComponent
import Header from './Header'; // Import Header component
import CreateModal from './CreateModal'; // Import CreateModal component
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const Control = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const baseUrl = window.location.origin; // Get the base URL of the app

  const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}` // Use base URL in production
    : 'http://localhost:3001'; // Use localhost in development

  const [allCrocs, setAllCrocs] = useState([]); // State for storing all crocs
  const [allJackets, setAllJackets] = useState([]); // State for storing all jackets
  const [allSneakers, setAllSneakers] = useState([]); // State for storing all sneakers
  const [allBoots, setAllBoots] = useState([]); // State for storing all boots
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State for edit modal visibility
  const [isCreateModalOpen, setCreateModalOpen] = useState(false); // State for create modal visibility
  const [allProducts, setAllProducts] = useState([]); // State for storing all products
  const [newProduct, setNewProduct] = useState({ // State for new product details
    name: '',
    image: null,
    description: '',
    productType: 'crocs',
    price: '',
  });

  useEffect(() => {
    console.log(isCreateModalOpen); // Log create modal state changes
  }, [isCreateModalOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/allProducts`); // Fetch all products

        console.log('this is the response', response);
        console.log('this is the response.data', response.data);

        setAllCrocs(response.data.crocs);
        setAllBoots(response.data.boots);
        setAllJackets(response.data.jackets);
        setAllSneakers(response.data.sneakers);
        setAllProducts(response.data);

      } catch (error) {
        console.error("Error fetching crocs data: ", error); // Log errors
      }
    };

    fetchData(); // Call fetchData to load products
  }, []);

  // Function to toggle create modal visibility
  const toggleCreateModal = () => {
    setCreateModalOpen(!isCreateModalOpen);
  };

  const handleEdit = async (editedProduct) => {
    // Function to handle product editing
    try {
      const response = await Axios.put(`${apiUrl}/${editedProduct.product_type}/${editedProduct.product_id}`, editedProduct);
      console.log('Updated product:', response.data);
      setEditModalOpen(false); // Close the edit modal
    } catch (error) {
      console.error('Error editing item:', error.message); // Log errors
    }
  };

  const handleCreate = async (product) => {
    // Function to handle product creation
    console.log("this is the handleCreate and i was just called. this is the product I am about to create", product);
    console.log(`and this is the newProduct ${newProduct}, if it has already loaded it should look the same as product`);

    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('image', product.image);
      formData.append('description', product.description);
      formData.append('productType', product.productType);
      formData.append('product_price', product.price);

      console.log(`just for good measure this is the product name ${product.name}`);
      console.log(`now if this was done correctly this is the product details ${formData}`);

      const response = await Axios.post(`${apiUrl}/${product.productType}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      setNewProduct(product); // Update new product state
      toggleCreateModal(); // Close the modal
    } catch (error) {
      console.error('Error creating product:', error.message); // Log errors
    }
  };

  const properLettering = (word) => {
    // Function to replace underscores with spaces in a string
    let newString = [];
    for (let i = 0; i < word.length; i++) {
      if (word[i] !== '_') {
        newString.push(word[i]);
      } else {
        newString.push(' ');
      }
    }
    return newString.join(''); // Return formatted string
  };

  const renderControlComponents = (products) => {
    // Function to render ControlComponents
    return products.length > 0 ? (
      products.map(product => (
        <ControlComponent
          key={product.product_id}
          name={properLettering(product.name)}
          path={product.image_path}
          product_price={product.product_price}
          product_id={product.product_id}
          product_type={product.product_type} // Pass product type to ControlComponent
        />
      ))
    ) : (
      <div>Loading products...</div> // Loading indicator
    );
  };

  return (
    <React.Fragment>
      <Header />
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={(product) => {
          console.log(`this is the onCreate function and this is the product I received ${product}`);
          setNewProduct(product);
          handleCreate(product);
        }}
      />
      <div className='fullCategoryBody'>
        <h1 className='categoryHeader' style={{ color: "red" }}>Control page</h1>
        <br />
        <h1 className='categoryHeader'>on this page you can add items and edit or delete them below</h1>
        <br />
        <h1 className='categoryHeader'>use this button below to add new products</h1>
        <button
          style={{
            fontSize: "35px",
            fontFamily: "fantasy",
            height: "60px",
            width: "50%",
            color: "silver",
            display: "block",
            margin: "auto",
            backgroundColor: "green",
            borderRadius: "20px"
          }}
          onClick={() => {
            setCreateModalOpen(true);
            console.log(isCreateModalOpen);
          }}
        >
          New
        </button>

        <h1 className='categoryHeader'>Jackets</h1>
        <div className='submenuBody'>
          {allJackets.length > 0 && renderControlComponents(allJackets)}
        </div>

        <br />
        <h1 className='categoryHeader'>Sneakers</h1>
        <div className='submenuBody'>
          {allSneakers.length > 0 && renderControlComponents(allSneakers)}
        </div>
        
        <br />
        <h1 className='categoryHeader'>Boots</h1>
        <div className='submenuBody'>
          {allBoots.length > 0 && renderControlComponents(allBoots)}
        </div>

        <br />
        <h1 className='categoryHeader'>Crocs</h1>
        <div className='submenuBody'>
          {allCrocs.length > 0 && renderControlComponents(allCrocs)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Control; // Export the Control component
