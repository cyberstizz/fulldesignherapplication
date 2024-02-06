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
    const [newProduct, setNewProduct] = useState({
      name: '',
      image: null,
      description: '',
      productType: 'crocs',
      price: '',
    });

    useEffect(() => {
        console.log(isCreateModalOpen); // This will log the updated state after it has changed
    }, [isCreateModalOpen]); // The effect runs whenever isCreateModalOpen changes
    

    

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


    //firt a function to open the create model
    const toggleCreateModal = () => {
        setCreateModalOpen(!isCreateModalOpen);
      };
      

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


    const handleCreate = async (product) => {
            console.log("this is the handleCreate and i was just called. this is the product I am about to create", product)
            console.log(`and this is the newProduct ${newProduct}, if it has already loaded it should like the same as product`)

            const productType = product.productType;


            try {
                const formData = new FormData();
                formData.append('name', product.name);
                formData.append('image', product.image);
                formData.append('description', product.description);
                formData.append('productType', product.productType);
                formData.append('price', product.price);


                console.log(`just for good measure this is the product name ${product.name}`)
                console.log(`now if this was done correctly this is the product details ${formData}`)
            
                // Make a POST request to the backend route '/create'
                const response = await Axios.post(`${apiUrl}/${productType}`, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
            
                console.log(response.data);
                        setNewProduct(product)
                // Close the modal
                toggleCreateModal();
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
                onClick={() => {
                    setCreateModalOpen(true)
                    console.log(isCreateModalOpen)
                }
                    }
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
                onCreate={(product) =>{
                    console.log(`this is the onCreate function and this is the product i recieved ${product}`)
                    setNewProduct(product)
                    handleCreate(product)
                }}
            />

            </div>
           
        </React.Fragment>
    );
}

export default Control;
