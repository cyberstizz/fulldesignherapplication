import React from 'react';
import './Jackets.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import SubMenuComponent from './SubmenuComponent';
import Header from './Header';

const Jackets = () => {
    // State to hold all jacket data
    const [allJackets, setAllJackets] = useState([]);

    // Determine base URL based on environment
    const baseUrl = window.location.origin;
    const apiUrl = process.env.NODE_ENV === 'production'
        ? `${baseUrl}`
        : 'http://localhost:3001';

    // Fetch jacket data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`${apiUrl}/jacket/allJackets`);
                console.log(response.data.jackets);
                setAllJackets(response.data.jackets);
            } catch (error) {
                console.error("Error fetching jackets data: ", error);
            }
        };

        fetchData();
    }, []);

    // Function to handle image load (currently unused)
    const handleImageLoaded = () => {
        // Placeholder for image load handling logic
    };

    return (
        <React.Fragment>
            {/* Render the header component */}
            <Header />
            <div className='fullCategoryBody'>
                <h1 className='categoryHeader'>Jackets</h1>
                <div className='submenuBody'>
                    {/* Map through all jackets and create links to each jacket's detail page */}
                    {allJackets.map(jacket => (
                        <Link key={jacket.product_id} to={`/jacket/${jacket.product_id}`}>
                            <SubMenuComponent onImageLoad={handleImageLoaded} name={jacket.name} path={jacket.image_path} product_price={jacket.product_price} />
                        </Link>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Jackets;
