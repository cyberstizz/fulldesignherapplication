// SearchResultPage.js
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './Search.scss'
import Header from './Header';

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
        results.map((item) => (
          <div key={item.product_id}>
            <h2>{item.name}</h2>
            {/* Display product details */}
          </div>
        ))
      ) : (
        <div>
          <p style={{color: 'black'}}>There are no items that match your search.</p>
          <Link to="/"><span style={{color: 'black'}}>Go Back</span></Link>
        </div>
      )}
    </div>
    </React.Fragment>
  );
};

export default Search;
