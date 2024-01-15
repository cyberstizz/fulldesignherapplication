import React from 'react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import Header from './Header';
import './ProductDescription.scss';
import axios from 'axios';
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

    return (
        <div className='entireProductDescriptionPage'>

            <img src='/crocsOne.webp' height="50%" width="100%" className='pictureTest' ></img>
            <div className='fullBottomSection'>
            </div>
        </div>
  )
}

// creating an action to be dispatched to the redux store
// this action will receive a name object, that has all of the products properties



// export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription)
       
export default ProductDescription;