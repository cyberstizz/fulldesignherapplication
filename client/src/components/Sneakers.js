import React from 'react';
import './Sneakers.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import SubMenuComponent from './SubmenuComponent';
import Header from './Header';




const Sneakers = () => {
    // const [imagesLoaded, setImagesLoaded] = useState(false);
    // const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [allSneakers, setAllSneakers] = useState([]);

    const baseUrl = window.location.origin;

    const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}`
    : 'http://localhost:3001';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`${apiUrl}/sneakers/allsneakers`);
                console.log(response.data.sneakers)
                setAllSneakers(response.data.sneakers);
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

            <br/>

            <h1 className='categoryHeader'>Sneakers</h1>

            <div className='submenuBody'>   
                  {allSneakers.map(sneaker => (
                    <Link key={sneaker.product_id} to={`/sneakers/${sneaker.product_id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={sneaker.name} path={sneaker.image_path} />
                    </Link>
                ))}
           
            
            </div>
            </div>
           
        </React.Fragment>
    );
}

export default Sneakers;
