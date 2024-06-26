import React, { useState, useEffect } from 'react'; // Consolidated React imports
import './Boots.scss'; // Import the stylesheet for this component
import { Link } from 'react-router-dom'; // Import Link component for navigation
import Axios from 'axios'; // Import Axios for making HTTP requests
import SubMenuComponent from './SubMenuComponent'; // Import SubMenuComponent
import Header from './Header'; // Import Header component

const Boots = () => {
    const [allBoots, setAllBoots] = useState([]); // State to store all boot data

    // Determine the base URL based on the environment
    const baseUrl = window.location.origin;
    const apiUrl = process.env.NODE_ENV === 'production'
        ? `${baseUrl}`
        : 'http://localhost:3001';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`${apiUrl}/boot/allBoots`);
                console.log(response.data.boots);
                setAllBoots(response.data.boots);
            } catch (error) {
                console.error("Error fetching boots data: ", error);
            }
        };

        fetchData();
    }, [apiUrl]);

    const handleImageLoaded = () => {
        // Placeholder for any image load handling logic
    };

    const properLettering = (word) => {
        // this function will parse a string and remove
        // any _ characters

        // create a new variable that will be returned
        // this variable will be an array
        let newString = [];

        for (let i = 0; i < word.length; i++) {
            // loop through the string, and for every element
            // check to see if it is an underscore and if it is
            // push a blank space into the array '', if it is not
            if (word[i] !== '_') {
                // push the letter into the array
                newString.push(word[i]);
            } else {
                newString.push(' ');
            }
        }
        // after getting out of the array join the array
        // into a string, and return the string
        return newString.join('');
    };

    return (
        <React.Fragment>
            {/* Conditionally render a Loader component if images are not loaded */}
            {/* {!imagesLoaded && <Loader />} */}

            <Header /> {/* Render the Header component */}
            <div className='fullCategoryBody'>
                <br/>
                <h1 className='categoryHeader'>Boots</h1>
                <div className='submenuBody'>
                    {allBoots.map(boot => (
                        <Link key={boot.product_id} to={`/boot/${boot.product_id}`}>
                            <SubMenuComponent
                                onImageLoad={handleImageLoaded}
                                name={properLettering(boot.name)}
                                path={boot.image_path}
                                product_price={boot.product_price}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Boots; // Export the Boots component as the default export
