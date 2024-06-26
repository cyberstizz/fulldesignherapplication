import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../app/features/cart/cartSlice';
import './ProductDescription.scss';
import Axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AddToCartModal from './AddToCartModal';
import AddedToCartModal from './AddedToCartModal';
import CustomStripeModal from './CustomStripeModal';
import ReviewModal from './ReviewModal';
import axios from 'axios';



const ProductDescription = () => {
    //first initiation of all hooks and 
    //important variables
        const dispatch = useDispatch();
        const navigate = useNavigate();

        
        const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
        const [isAddedToCartModalOpen, setIsAddedToCartModalOpen] = useState(false);
        const [isCustomStripeModalOpen, setIsCustomStripeModalOpen] = useState(false);
        const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
        const [averageRating, setAverageRating] = useState(null);



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

  
    const { productCategory, productId } = useParams();
    const [currentProduct, setProduct] = useState(null);
    const [user, setUser] = useState(null);


    const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://designhercustomekreations-c288e9799350.herokuapp.com'
    : 'http://localhost:3001';


    const handleOnReviewSubmit = async({ userId, headline, rating, review }) => {
        console.log('Submitting review:', { userId, headline, rating, review });

        try {
            // Example API endpoint for submitting a review
            const endpoint = `${apiUrl}/reviews`;
            const response = await Axios.post(endpoint, {
                userId,
                headline,
                rating: parseFloat(rating), // Ensure rating is sent as a number
                review,
            });
    
            if (response.status === 200) {
                console.log('Review submitted successfully:', response.data);
                // Handle successful review submission (e.g., display a success message, refresh reviews list)
            } else {
                console.error('Failed to submit review:', response.data);
                // Handle failure (e.g., display an error message to the user)
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            // Handle error (e.g., display an error message to the user)
        }
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
        const fetchAverageRating = async () => {
            try {
                const response = await axios.get(`${apiUrl}/average-rating/${productId}`);
                setAverageRating(response.data.averageRating);
            } catch (error) {
                console.error('Error fetching average rating:', error);
            }
        };

        fetchAverageRating();
    }, [productId]);


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

    getProduct()





}, [productCategory, productId])



    console.log('Product State:', currentProduct);


    if (!currentProduct) {
        return <div>Loading...</div>;
      }

          //destructure each relevant part of the product

      const {name, image_path, description, product_price, product_type, product_id} = currentProduct;


    

    return (
            <React.Fragment>
                <ReviewModal 
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                userId={user ? user.user_id : null}
                productId={product_id}
                productType={product_type}
                />
                <CustomStripeModal
                 isOpen={isCustomStripeModalOpen}
                 onClose={() => setIsCustomStripeModalOpen(false)}
                 totalPrice={Number(product_price)}
                 productName={name}
                 productType={product_type}
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

                    <div className='topSection'>
                    <img src={image_path} alt={name} width="100%" className='pictureTest' ></img>
                    </div>
                    <div className='fullBottomSection'>
                    <div className='infoSection'>

                        <div className='nameAndPriceSection'>
                            <div className='name'>{properLettering(name)}</div>
                            <div className='price'>${product_price}</div>
                        </div>

                        <div className='ratingsSection'>
                            <Link to={`/reviews/${product_type}/${product_id}`}><h1 className='ratingsHeader'>Ratings</h1></Link>
                            <div className='ratingsStars'>{averageRating !== null ? (
                                    <div>
                                        <h3>Average Rating: {averageRating.toFixed(1)}</h3>
                                    </div>
                                ) : (
                                    <div>No ratings yet</div>
                                )}</div>
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