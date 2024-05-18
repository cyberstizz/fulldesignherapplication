import React, { useEffect, useState } from 'react';
import './ProfilePage.scss';
import Dropdown from './Dropdown';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  const baseUrl = window.location.origin;
  const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}` : 'http://localhost:3001';

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await axios.get('/user');
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

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const ordersRes = await axios.get(`${apiUrl}/users/${userId}/orders`);
          setOrders(ordersRes.data.orders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

      const fetchReviews = async () => {
        try {
          const reviewsRes = await axios.get(`${apiUrl}/users/${userId}/reviews`);
          setReviews(reviewsRes.data.reviews);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };

      fetchOrders();
      fetchReviews();
    }
  }, [user, apiUrl]);

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${apiUrl}/users/deleteAccount`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="profile-page">
      <h1 className="profileUsername">{user ? user.username : 'Loading...'}</h1>
      <Dropdown 
        title="Your Orders" 
        items={orders.map(order => ({
          title: `Order Number: ${order.order_number}`,
          content: (
            <>
              <div className='orderDate'>Order Date: {new Date(order.order_date).toLocaleDateString()}</div>
              <div>
                <span className="orderAndreviewItems"  style={{color: "black"}}>Product</span> <br/>                <ul>
                  {order.products.map(product => (
                    <li key={product.product_id}>
                      <span className="orderAndreviewItems" style={{color: 'orange'}}><strong className="orderAndreviewItems">{product.product_name}</strong>: </span> <span className="orderAndreviewItems" style={{color: 'green'}}>${product.product_price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ),
        })) || []}  // Ensure items is an array
        emptyMessage="You have no orders" 
        type="orders"
      />
      <Dropdown 
        title="Your Reviews" 
        items={reviews.map(review => ({
          title: (
          <span className="orderAndreviewItems">
            <span style={{color: "black", fontSize: "30px"}}>Review</span>
            <br />
            {review.headline}
           </span>
            ),
          content: (
            <div>
              <div className="orderAndreviewItems" style={{color: "orange"}}>Rating: {review.rating}</div>
              <div className="orderAndreviewItems">{review.review}</div>
            </div>
          ),
        })) || []}  // Ensure items is an array
        emptyMessage="You have no reviews" 
        type="reviews"
      />

      
      <button onClick={() => navigate(-1)} style={{ 
        display: "flex",
        justifySelf: "center", 
        alignSelf: "center", 
        justifyContent: "center", 
        width: "40vw" 
        }}>&#8592;  Back</button>

      <button onClick={handleDeleteAccount} style={{
    display: "flex",
    justifySelf: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "darkred",
    border: 'solid 2px orange',
    position: "fixed",
    bottom: "5vh",
    left: "50%",
    transform: "translateX(-50%)",
    width: "40vw",
  }}>Delete Account</button>
    </div>
  );
};

export default ProfilePage;
