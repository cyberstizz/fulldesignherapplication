import React, { useEffect, useState } from 'react';
import './ProfilePage.scss';
import Dropdown from './Dropdown';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProfilePageTest = () => {
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
      <h1  className="profileUsername">{user ? user.username : 'Loading...'}</h1>
      <Dropdown 
        title="Your Orders" 
        items={[{
          title: `Order Number:  84c8c675-f321-42f2-ba60-e4eec55914a8
          `,
          content: (
            <>
              <div className='orderDate'>Order Date: 5/11/2024</div>
              <div>
                <span className="orderAndreviewItems"  style={{color: "black"}}>Product</span> <br/>
                <ul>
                  
                    <li>
                    <span className="orderAndreviewItems" style={{color: 'orange'}}><strong className="orderAndreviewItems">Blueberry</strong>:</span> <span className="orderAndreviewItems" style={{color: 'green'}}>$250.00</span>
                    </li>
                </ul>
              </div>
            </>
          ),
        }]}  // Ensure items is an array
        emptyMessage="You have no orders" 
        type="orders"
      />
      <Dropdown 
        title="Your Reviews" 
        items={[{
          title: (<span className="orderAndreviewItems"><span style={{color: "black", fontSize: "30px"}}>Review </span><br /> These boots are hot and come with a hat</span>),
          content: (
            <div>
              <div className="orderAndreviewItems" style={{color: "orange"}}>Rating: {'5.0'}</div>
              <div className="orderAndreviewItems">just buy the boots and your FEET will be covered forever</div>
            </div>
          )
        }]}  // Ensure items is an array
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

export default ProfilePageTest;
