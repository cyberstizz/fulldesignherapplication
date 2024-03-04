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




  const handleImageLoaded = () => {
    // setLoadedImagesCount(prevCount => prevCount + 1);
};

  const properProductType = (type) => {
    //identify the producttype
    let givenProductName = type;

    //turn the producttype into an array
    let nameArrayed = givenProductName.split('')
    
    //return the result of cutting the array down by one and rejoining the array
    //into a string

    return nameArrayed.slice(0, nameArrayed.length - 1).join('');
  }

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
          <Link key={item.product_id} to={`/${item.product_type}/${item.product_id}`}>
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
