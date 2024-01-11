import React from 'react';
import './Crocs.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import SubMenuComponent from './SubmenuComponent';
import Header from './Header';




const Crocs = () => {
    // const [imagesLoaded, setImagesLoaded] = useState(false);
    // const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [allCrocs, setAllCrocs] = useState([]);

    const baseUrl = window.location.origin;

    const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}`
    : 'http://localhost:3001';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`${apiUrl}/crocs/allCrocs`);
                console.log(response.data.crocs)
                setAllCrocs(response.data.crocs);
            } catch (error) {
                console.error("Error fetching crocs data: ", error);
            }
        };
  
        fetchData();
    }, []);



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

// useEffect(() => {
//   if (loadedImagesCount === allCrocs.length) {
//     setImagesLoaded(true);
//   }
// }, [loadedImagesCount]);

    return(
        <React.Fragment>
            {/* {!imagesLoaded && <Loader />} */}

            <Header />
            <h1 className='categoryHeader'>Crocs</h1>
            <div className='submenuBody'>
                  {allCrocs.map(croc => (
                    <Link key={croc.product_id} to={`/products/${croc.product_id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={properLettering(croc.name)} path={croc.image_path} product_price={croc.product_price} />
                    </Link>
                ))}
           
            
            </div>
           
        </React.Fragment>
    );
}

export default Crocs;
