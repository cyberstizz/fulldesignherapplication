// SearchResultPage.js
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import 'search.scss'

const Search = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const { query } = location.state || {}; // If using React Router v6

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/search?query=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
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
          <p>There are no items that match your search.</p>
          <Link to="/">Go Back</Link>
        </div>
      )}
    </div>
  );
};

export default Search;
