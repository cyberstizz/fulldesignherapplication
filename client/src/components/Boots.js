import React, { useState, useEffect } from 'react'; // Consolidated React imports
import './Boots.scss'; // Import the stylesheet for this component
import { Link } from 'react-router-dom'; // Import Link component for navigation
import Axios from 'axios'; // Import Axios for making HTTP requests
import SubMenuComponent from './SubmenuComponent'; // Import SubMenuComponent
import Header from './Header'; // Import Header component

const Boots = () => {
    const [allBoots, setAllBoots] = useState([]); // State to store all boot data

    // Determine the base URL based on the environment
    const baseUrl = window.location.origin;
    const apiUrl = process.env.NODE_ENV === 'production'
        ? `${baseUrl}`
        : 'http://localhost:3001';

    // Fetch boot data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to fetch boot data
                const response = await Axios.get(`${apiUrl}/boot/allBoots`);
                console.log(response.data.boots); // Log the response data for debugging
                setAllBoots(response.data.boots); // Update the state with fetched data
            } catch (error) {
                console.error("Error fetching boots data: ", error); // Log any error that occurs
            }
        };

        fetchData(); // Call the fetchData function
    }, [apiUrl]); // Dependency array for useEffect

    // Placeholder function for handling image load events
    const handleImageLoaded = () => {
        // Placeholder for any image load handling logic
    };

    // Function to remove underscores from a string and replace with spaces
    const properLettering = (word) => {
        // Create a new array to store the processed characters
        let newString = [];

        // Loop through each character in the string
        for (let i = 0; i < word.length; i++) {
            // If the character is not an underscore, add it to the array
            if (word[i] !== '_') {
                newString.push(word[i]);
            } else {
                // If the character is an underscore, add a space to the array
                newString.push(' ');
            }
        }
        // Join the array into a string and return it
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
                    {/* Map over allBoots array and render a SubMenuComponent for each boot */}
                    {allBoots.map(boot => (
                        <Link key={boot.product_id} to={`/boot/${boot.product_id}`}>
                            <SubMenuComponent
                                onImageLoad={handleImageLoaded} // Pass the image load handler
                                name={properLettering(boot.name)} // Pass the processed name
                                path={boot.image_path} // Pass the image path
                                product_price={boot.product_price} // Pass the product price
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Boots; // Export the Boots component as the default export
