import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import Header from './Header';
import './ProductDescription.scss';
import Axios from 'axios';
// import { addToCart } from './reducers/AddToCart';
import StripeCheckout from 'react-stripe-checkout';
// import { useDispatch, useSelector } from 'react-redux';

// creating the two functions that will be needed to connect this component to the store

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addToTheCart: (item) => {dispatch(addToCart(item))}
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         items: state.items
//     }
// }

const ProductDescription = () => {

    const { productCategory, productId } = useParams();
    const [product, setProduct] = useState(null);

    //add an api url
    const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://designhercustomekreations-c288e9799350.herokuapp.com/'
    : 'http://localhost:3001';

    useEffect(() => {

    const getProduct = async() => {
        //call the product and put it into a variable
        try {
            const response = await Axios.get(`${apiUrl}/${productCategory}/${productId}`);
            console.log('API Response:', response.data);
            setProduct(response.data.croc);
            
        } catch (error) {
            console.error("There was an error fetching the product data:", error);
        }
    }

    getProduct()

}, [apiUrl, productCategory, productId])





    console.log('Product State:', product);


    if (!product) {
        return <div>Loading...</div>;
      }

          //destructure each relevant part of the product

      const {product_id, name, image_path, description, product_price} = product;


    return (
        <div className='entireProductDescriptionPage'>

            <img src={image_path} alt={name} height="50%" width="100%" className='pictureTest' ></img>
            <div className='fullBottomSection'>
                {name}
                <br/>
                {description}
                <br/>
                ${product_price}


            </div>
        </div>
  )
}

// creating an action to be dispatched to the redux store
// this action will receive a name object, that has all of the products properties



// export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription)
       
export default ProductDescription;