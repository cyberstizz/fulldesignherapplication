import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../app/features/cart/cartSlice';
import './ProductDescription.scss';
import Axios from 'axios';
// import { addToCart } from './reducers/AddToCart';
import StripeCheckout from 'react-stripe-checkout';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import CheckoutButton from './CheckoutButton';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AddToCartModal from './AddToCartModal';
import AddedToCartModal from './AddedToCartModal';
import CustomStripeModal from './CustomStripeModal';
import ReviewModal from './ReviewModal';


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
    //first initiation of all hooks and 
    //important variables
        const dispatch = useDispatch();
        const navigate = useNavigate();

        
        const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
        const [isAddedToCartModalOpen, setIsAddedToCartModalOpen] = useState(false);
        const [isCustomStripeModalOpen, setIsCustomStripeModalOpen] = useState(false);
        const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);



    const handleAddToCart = (productData) => {
          dispatch(addToCart(productData));      
          setIsAddedToCartModalOpen(true);
          setIsAddToCartModalOpen(false);    
        };

    const handleGoToCart = () => {
        navigate('/cart')
    }


  const handleArrowClick = () => {
    // Navigate to the home page when the logo is clicked
    navigate(-1);
  };

    const stripe = useStripe();
    const elements = useElements();
    const { productCategory, productId } = useParams();
    const [currentProduct, setProduct] = useState(null);
    const [user, setUser] = useState(null);


    //add an api url
    const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://designhercustomekreations-c288e9799350.herokuapp.com'
    : 'http://localhost:3001';


    const handleOnReviewSubmit = ({ userId, headline, rating, review }) => {
        console.log(`this re the items: userId: ${userId}, rating: ${headline}, rating: ${rating}, review: ${review}`)
    }



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


    useEffect(() => {

    const getProduct = async() => {
        //call the product and put it into a variable
        try {
            const response = await Axios.get(`${apiUrl}/${productCategory}/${productId}`);
            console.log('API Response:', response.data);

            const product = response.data[productCategory];

            console.log('Product:', product);
            console.log('Product Type:', typeof product);

      
            if (product) {
              setProduct(product);
            } else {
              setProduct(null); // Handle unknown category
            }
        } catch (error) {
            console.error("There was an error fetching the product data:", error);
        }
    }

    getProduct()

}, [apiUrl, productCategory, productId])




useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await Axios.get('/user');
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking user authentication:', error.message);
      }
    };

    checkUserAuthentication();
  }, []);



    console.log('Product State:', currentProduct);


    if (!currentProduct) {
        return <div>Loading...</div>;
      }

          //destructure each relevant part of the product

      const {name, image_path, description, product_price} = currentProduct;


    

    return (
            <React.Fragment>
                <ReviewModal 
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                userId={user.user_id}
                onReviewSubmit={handleOnReviewSubmit}
                />
                <CustomStripeModal
                 isOpen={isCustomStripeModalOpen}
                 onClose={() => setIsCustomStripeModalOpen(false)}
                 totalPrice={Number(product_price)}
                 productName={name}
                />
                    <AddToCartModal
                    isOpen={isAddToCartModalOpen}
                    onClose={() => setIsAddToCartModalOpen(false)}
                    onAdd={() => handleAddToCart(currentProduct)} 
                    productName={properLettering(name)}
                    />
                    <AddedToCartModal 
                    isOpen={isAddedToCartModalOpen}
                    onClose={() => setIsAddedToCartModalOpen(false)}
                    onGoToCart={handleGoToCart} 
                    productName={properLettering(name)}
                    />
                    <div className='entireProductDescriptionPage'>

                    <i className="fas fa-arrow-left" onClick={handleArrowClick} style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }}></i>


                    <img src={image_path} alt={name} width="100%" className='pictureTest' ></img>
                    <div className='fullBottomSection'>
                    <div className='infoSection'>

                        <div className='nameAndPriceSection'>
                            <h1 className='name'>{properLettering(name)}</h1>
                            <div className='price'>${product_price}</div>
                        </div>

                        <div className='ratingsSection'>
                            <h1 className='ratingsHeader'>Ratings</h1>
                            <div className='ratingsStars'></div>
                            <div className='writeAReview' onClick={() => setIsReviewModalOpen(true)}>Write a review</div>
                        </div>

                    </div>
                    <div className='descriptionSection'>
                    {description}
                    </div>
                    <div className='buttonsSection'>
                        {/* <button className='buyNowButton'>Buy now</button> */}
                        {/* <CheckoutButton  product={name} price={Number(product_price)}/> */}
                        <button className='buyButton' onClick={() => setIsCustomStripeModalOpen(true)}>Buy now</button>
                        <button className='addToCartButton' onClick={() => setIsAddToCartModalOpen(true)}>Add to cart</button>
                    </div>


                    </div>
                </div>
        </React.Fragment>
  )
}

// creating an action to be dispatched to the redux store
// this action will receive a name object, that has all of the products properties



// export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription)
       
export default ProductDescription;