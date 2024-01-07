import React from 'react';
import './Crocs.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import SubMenuComponent from './SubmenuComponent';




const Crocs = () => {
    // const [imagesLoaded, setImagesLoaded] = useState(false);
    // const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [allCrocs, setAllCrocs] = useState([]);

    const baseUrl = window.location.origin;

    const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}/allCrocs`
    : 'http://localhost:3001';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`${apiUrl}/allCrocs`);
                console.log(response.data.crocs)
                setAllCrocs(response.data.crocs);
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
                  {allCrocs.map(croc => (
                    <Link key={croc.product_id} to={`/product/${croc.product_type}/${croc.product_id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={croc.name} path={croc.image_path} />
                    </Link>
                ))}
           
            
            </div>
           
        </React.Fragment>
    );
}

export default Crocs;
