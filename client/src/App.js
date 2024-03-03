import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Crocs from './components/Crocs';
import Boots from './components/Boots';
import Jackets from './components/Jackets';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProductDescription from './components/ProductDescription';
import Search from './components/Search';
import Sneakers from './components/Sneakers';
import Success from './components/Success';
import Failure from './components/Failure';
import ProductTest from './components/ProductTest';
import ProductDescriptionTest from './components/ProductDescriptionTest';
import ReviewsComponent from './components/ReviewsComponent';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Control from './components/Control';
import ControlTest from './components/controlTest';
import Cart from './components/Cart';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY); // Replace with your actual publishable key


function App() {
  return (
    <Elements stripe={stripePromise}>

    <Router>  
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/success' element={<Success />} />
      <Route path='/failure' element={<Failure />} />
      <Route path='/crocs' element={<Crocs />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/boots' element={<Boots />} />
      <Route path='/control' element={<Control />} />
      <Route path='/controlTest' element={<ControlTest />} />
      <Route path='/jackets' element={<Jackets />} />
      <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
      <Route path='/:productCategory/:productId' element={<ProductDescription />} />
      <Route path='/productDescriptionTest' element={<ProductDescriptionTest />} />
      <Route path='/search' element={<Search />} />
      <Route path='/sneakers' element={<Sneakers />} />
      <Route path='/productTest' element={<ProductTest />} />
      <Route path="/reviews/:productType/:productId" elememt={<ReviewsComponent />} />
      </Routes>
    </Router>

    </Elements>
  );
}

export default App;
