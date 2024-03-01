// SearchResultPage.js
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './Search.scss'
import Header from './Header';
import SubMenuComponent from './SubmenuComponent';


const Search = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const { query } = location.state || {}; 

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/search?query=${query}`);
        setResults(response.data);
        console.log(results)
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  useEffect(() => {
    console.log(results);
  }, [results]);
  

  return (
    <React.Fragment>
      <Header />
    <div>
      <h1>Search Results</h1>
      {results.length > 0 ? (
        <div className='submenuBody'>
        {results.map(item => (
          <Link key={item.product_id} to={`/${item.name}/${item.product_id}`}>
              <SubMenuComponent onImageLoad={handleImageLoaded} name={properLettering(item.name)} path={item.image_path} product_price={item.product_price} />
          </Link>
      ))}
 
  
  </div>
  )
       : (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <p style={{color: 'black'}}>There are no items that match your search.</p>
          <Link to="/"><span style={{color: 'black', display: 'flex', justifySelf: 'center'}}>Go Back</span></Link>
        </div>
      )}
    </div>
    </React.Fragment>
  );
};

export default Search;
