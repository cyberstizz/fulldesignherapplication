import React, { useState } from "react";
import Axios from "axios";
import './ControlComponent.scss';
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";


const ControlComponent = (props) => {

    const baseUrl = window.location.origin;

    const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}`
    : 'http://localhost:3001';


    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleEdit = async (editedProduct) => {
      try {
        // Create a FormData object
        const formData = new FormData();
    
        // Append each property of editedProduct to the FormData object
        Object.keys(editedProduct).forEach((key) => {
          formData.append(key, editedProduct[key]);
        });
    
        // Make a PUT request using FormData
        const response = await Axios.put(`${apiUrl}/${props.product_type}/${props.product_id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        // Log the response data
        console.log('Updated product:', response.data);
    
        // Call the onUpdate function to update the product in the parent component
        props.onUpdate(response.data);
    
        // Close the EditModal
        setEditModalOpen(false);
    
      } catch (error) {
        console.error('Error editing item:', error.message);
      }
    };
    

    const handleDelete = async () => {
        // Make a DELETE request to the appropriate route for deletion based on props.product_type
        try {
            const response = await Axios.delete(`${apiUrl}/${props.product_type}/${props.product_id}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting item:', error.message);
        }
    };



  // Function to open the Edit Modal
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  // Function to open the Delete Modal
  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

    
    return (
        <React.Fragment>
            <main className="fullSubMenuComponent">
                <img onLoad={props.onImageLoad} src={props.path} width='75%'height='100%' style={{marginLeft: '-2%', borderTopRightRadius: '50px', borderBottomRightRadius: '50px', border: 'solid 1px silver', borderLeft: '0'}} alt='pants'></img>
                <div className="productRightSection" style={{display: 'flex', flexDirection: 'column'}}>
                    <section className="submenuTitle">{props.name}</section>
                    {/* <section className="productPrice">${props.product_price}</section> */}
                    <div className="controlbuttonsdiv" style={{display: 'flex', flexDirection: 'row'}} >
                        <button className="editButton" onClick={() => openEditModal(props)}>Edit</button>
                        <button className="deleteButton" onClick={() => openDeleteModal(props)} >delete</button>
                    </div>
                </div>
            </main>


             {/* Render the EditModal with appropriate props */}
    {isEditModalOpen && selectedProduct && (
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        product={selectedProduct}
        onUpdate={(editedProduct) => {
          // Handle the update logic here
          handleEdit(editedProduct)
          console.log('Updated product:', editedProduct);
        }}
      />
      )}


      {/* Render the DeleteModal with appropriate props */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        productName={selectedProduct ? selectedProduct.name : ''}
        onDelete={() => {
          // Handle the delete logic here
          handleDelete();
          console.log('Deleted product:', selectedProduct);
        }}
      />
        </React.Fragment>
    )
}

export default ControlComponent;