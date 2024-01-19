import React from 'react';
import './Jackets.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import SubMenuComponent from './SubmenuComponent';
import Header from './Header';




const Jackets = () => {
    // const [imagesLoaded, setImagesLoaded] = useState(false);
    // const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [allJackets, setAllJackets] = useState([]);

    const baseUrl = window.location.origin;

    const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}`
    : 'http://localhost:3001';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`${apiUrl}/jacket/allJackets`);
                console.log(response.data.jackets)
                setAllJackets(response.data.jackets);
            } catch (error) {
                console.error("Error fetching jackets data: ", error);
            }
        };
  
        fetchData();
    }, []);



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

            <h1 className='categoryHeader'>Jackets</h1>

            <div className='submenuBody'>
                  {allJackets.map(Jacket => (
                    <Link key={Jacket.product_id} to={`/jacket/${Jacket.product_id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={Jacket.name} path={Jacket.image_path} product_price={Jacket.product_price} />
                    </Link>
                ))}
           
            
            </div>
            </div>
           
        </React.Fragment>
    );
}

export default Jackets;
