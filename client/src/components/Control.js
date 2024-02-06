import React from 'react';
import './Crocs.scss';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import ControlComponent from './ControlComponent';
import Header from './Header';
import CreateModal from './CreateModal'; // Assuming the file path is correct




const Control = () => {


    const baseUrl = window.location.origin;

    const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}`
    : 'http://localhost:3001';


    // const [imagesLoaded, setImagesLoaded] = useState(false);
    // const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [allCrocs, setAllCrocs] = useState([]);
    const [allJackets, setAllJackets] = useState([]);
    const [allSneakers, setAllSneakers] = useState([]);
    const [allBoots, setAllBoots] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);




    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`/allProducts`);

                console.log('this is the response', response);

                
                console.log('this is the response.data', response.data);

                
           



                setAllCrocs(response.data.crocs);
                setAllBoots(response.data.boots);
                setAllJackets(response.data.jackets);
                setAllSneakers(response.data.sneakers);

            } catch (error) {
                console.error("Error fetching crocs data: ", error);
            }
        };
  
        fetchData();
    }, []);

    const handleEdit = async (editedProduct) => {
        // Make a PUT request to the appropriate route for editing based on props.product_type
        try {
            const response = await Axios.put(`${apiUrl}/${editedProduct.product_type}/${editedProduct.product_id}`, editedProduct);
 // Log the response data
 console.log('Updated product:', response.data);

 // Call the onUpdate function to update the product in the parent component
//  props.onUpdate(editedProduct);

 // Close the EditModal
 setEditModalOpen(false);
        } catch (error) {
            console.error('Error editing item:', error.message);
        }
    };


    const handleCreate = async () => {
        try {
            try {
                const formData = new FormData();
                formData.append('name', newProduct.name);
                formData.append('image', newProduct.image);
                formData.append('description', newProduct.description);
                formData.append('productType', newProduct.productType);
                formData.append('price', newProduct.price);
            
                // Make a POST request to the backend route '/create'
                const response = await Axios.post('/create', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
            
                console.log(response.data);
            
                // Update the state with the new product if needed
                // This depends on how you manage your state
                // You might want to fetch the updated data again from the server
            
                // Close the modal
                onClose();
        } catch (error) {
          console.error('Error creating product:', error.message);
        }
      };
      


    const properLettering = (word) => {
        //this function will parse a string and remove
        //any _ characters

        //create a new variable that will be returned
        //this variable will be an array
        let newString = [];


        for(let i = 0; i < word.length; i++){

        
        //loop through the string, and for every element
        //check to see if it is an underscore and if it is
        //push a blank space into the array '', if it is not
        if(word[i] !== '_'){
        //push the letter into the array
            newString.push(word[i]);
        } else{
            newString.push(' ');
        }
        }
        return newString.join('');
        //after getting out of the array join the array
        //into a string, and return the string
    }

//     const handleImageLoaded = () => {
//         // setLoadedImagesCount(prevCount => prevCount + 1);
// };

// useEffect(() => {
//   if (loadedImagesCount === allCrocs.length) {
//     setImagesLoaded(true);
//   }
// }, [loadedImagesCount]);


const renderControlComponents = (products) => {
    return products.length > 0 ? ( 
        products.map(product => (
        <ControlComponent
            key={product.product_id}
            name={properLettering(product.name)}
            path={product.image_path}
            product_price={product.product_price}
            product_id={product.product_id}
            product_type={product.product_type} // Pass the product type to ControlComponent
        />
    ))
    ) : (
        <div>Loading products...</div> // Or a loading indicator
      );
};

    return(
        <React.Fragment>
            {/* {!imagesLoaded && <Loader />} */}

            <Header />
            <div className='fullCategoryBody'>
            <h1 className='categoryHeader' style={{color: "red"}}>Control page</h1>
            <br />
            <br />
            <br />
            <br />


            <h1 className='categoryHeader'>on this page you can add items and edit or delete them below</h1>
            <br />
            <br />
            <br />
            <br />
            <h1 className='categoryHeader'>use this button below to add new products</h1>
            <button style={{
                fontSize: "35px",
                fontFamily: "fantasy", 
                height: "60px", 
                width: "50%", 
                fontFace: "bolder", 
                color: "silver", 
                display: "block", 
                margin: "auto", 
                backgroundColor: "green", 
                borderRadius: "20px"
                }}
                onClick={() => setCreateModalOpen(true)}
                >
                New
            </button>


            <h1 className='categoryHeader'>Jackets</h1>
            <div className='submenuBody'>
                {allJackets.length > 0 && renderControlComponents(allJackets)}
            </div>


            <br />
            <br />
            <br />
            <br />
            <h1 className='categoryHeader'>Sneakers</h1>
            <div className='submenuBody'>
                {allSneakers.length > 0 && renderControlComponents(allSneakers)}
            </div>
            <br />
            <br />
            <br />
            <br />
            <h1 className='categoryHeader'>Boots</h1>
            <div className='submenuBody'>
                {allBoots.length > 0 && renderControlComponents(allBoots)}
            </div>

            <br />
            <br />
            <br />
            <br />
            <h1 className='categoryHeader'>Crocs</h1>
            <div className='submenuBody'>
                {allCrocs.length > 0 && renderControlComponents(allCrocs)}
            </div>  
            <CreateModal
                isOpen={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onCreate={handleCreate}
            />

            </div>
           
        </React.Fragment>
    );
}

export default Control;
