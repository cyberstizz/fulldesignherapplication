import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';




function App() {
  return (
    <Router>  
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/crocs' element={<Crocs />} />
      <Route path='/boots' element={<Boots />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/jackets' element={<Jackets />} />
      <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
      <Route path='/productPage' element={<ProductPage />} />
      <Route path='/search' element={<Search />} />
      <Route path='/sneakers' element={<Sneakers />} />
      </Routes>
    </Router>
  );
}

export default App;
