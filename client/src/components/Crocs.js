import React, { useState, useEffect } from 'react';
import './Crocs.scss';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import SubMenuComponent from './SubmenuComponent';
import Header from './Header';

const Crocs = () => {
    // State to hold the list of all Crocs products
    const [allCrocs, setAllCrocs] = useState([]);

    // Determine the API URL based on the environment
    const baseUrl = window.location.origin;
    const apiUrl = process.env.NODE_ENV === 'production'
        ? `${baseUrl}`
        : 'http://localhost:3001';

    // Fetch all Crocs data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`${apiUrl}/croc/allCrocs`);
                console.log(response.data.crocs);
                setAllCrocs(response.data.crocs);
            } catch (error) {
                console.error("Error fetching crocs data: ", error);
            }
        };

        fetchData();
    }, [apiUrl]);

    // Function to format product names by replacing underscores with spaces
    const properLettering = (word) => {
        let newString = [];

        for (let i = 0; i < word.length; i++) {
            if (word[i] !== '_') {
                newString.push(word[i]);
            } else {
                newString.push(' ');
            }
        }
        return newString.join('');
    };

    // Placeholder function for image load events
    const handleImageLoaded = () => {
        // This function can be used to track image load status
    };

    return (
        <React.Fragment>
            {/* Render header component */}
            <Header />
            <div className='fullCategoryBody'>
                <h1 className='categoryHeader'>Crocs</h1>
                <div className='submenuBody'>
                    {allCrocs.map(croc => (
                        <Link key={croc.product_id} to={`/croc/${croc.product_id}`}>
                            <SubMenuComponent
                                onImageLoad={handleImageLoaded}
                                name={properLettering(croc.name)}
                                path={croc.image_path}
                                product_price={croc.product_price}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Crocs;
