import React from 'react';
import './Boots.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import SubMenuComponent from './SubmenuComponent';




const Boots = () => {
    // const [imagesLoaded, setImagesLoaded] = useState(false);
    // const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [allBoots, setAllBoots] = useState([]);

    const baseUrl = window.location.origin;

    const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}`
    : 'http://localhost:3001';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`${apiUrl}/allBoots`);
                console.log(response.data.boots)
                setAllBoots(response.data.boots);
            } catch (error) {
                console.error("Error fetching crocs data: ", error);
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

    
            <div className='submenuBody'>
                  {allBoots.map(boot => (
                    <Link key={boot.product_id} to={`/product/${boot.product_type}/${boot.product_id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={boot.name} path={boot.image_path} />
                    </Link>
                ))}
           
            
            </div>
           
        </React.Fragment>
    );
}

export default Boots;
