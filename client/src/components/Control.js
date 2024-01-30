import React from 'react';
import './Crocs.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import SubMenuComponent from './SubmenuComponent';
import Header from './Header';




const Control = () => {
    // const [imagesLoaded, setImagesLoaded] = useState(false);
    // const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [allCrocs, setAllCrocs] = useState([]);
    const [allJackets, setAllJackets] = useState([]);
    const [allSneakers, setAllSneakers] = useState([]);
    const [allBoots, setAllBoots] = useState([]);


    const baseUrl = window.location.origin;

    const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}`
    : 'http://localhost:3001';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`${apiUrl}/allProducts`);
                
                console.log(response.data);

                
                console.log(response.data.crocs)
                console.log(response.data.boots)
                console.log(response.data.jackets)
                console.log(response.data.sneakers)

                setAllCrocs(response.data.crocs);
                setAllBoots(response.data.boots);
                setAllJackets(response.data.jackets);
                setAllSneakers(response.data.sneakers);

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
            <div className='fullCategoryBody'>
            <h1 className='categoryHeader'>Control page</h1>
            <br />
            <br />

            <h1>on this page you can add items and edit or delete them below</h1>
            <br />
            <br />
            <h1>use this button below to add new products</h1>
            <button style="display: block; margin: auto;">Create new product</button>

            <h1 className='categoryHeader'>Crocs</h1>
            <div className='submenuBody'>
                  {allCrocs.map(croc => (
                    <Link key={croc.product_id} to={`/croc/${croc.product_id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={properLettering(croc.name)} path={croc.image_path} product_price={croc.product_price} />
                    </Link>
                ))}
           
            
            </div>



            <h1 className='categoryHeader'>Jackets</h1>
            <div className='submenuBody'>
                  {allJackets.map(jacket => (
                    <Link key={jacket.product_id} to={`/jacket/${jacket.product_id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={properLettering(jacket.name)} path={jacket.image_path} product_price={jacket.product_price} />
                    </Link>
                ))}
           
            
            </div>




            <h1 className='categoryHeader'>Sneakers</h1>
            <div className='submenuBody'>
                  {allSneakers.map(sneaker => (
                    <Link key={sneaker.product_id} to={`/sneaker/${sneaker.product_id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={properLettering(sneaker.name)} path={sneaker.image_path} product_price={sneaker.product_price} />
                    </Link>
                ))}
           
            
            </div>



            <h1 className='categoryHeader'>Boots</h1>
            <div className='submenuBody'>
                  {allBoots.map(boot => (
                    <Link key={boot.product_id} to={`/boots/${boot.product_id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={properLettering(boot.name)} path={boot.image_path} product_price={boot.product_price} />
                    </Link>
                ))}
           
            
            </div>




            </div>
           
        </React.Fragment>
    );
}

export default Control;
