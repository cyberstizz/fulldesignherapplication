import React, { useState, useEffect } from 'react';
import './Sneakers.scss';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import SubMenuComponent from './SubmenuComponent';
import Header from './Header';

const Sneakers = () => {
  // State to hold all sneakers data
  const [allSneakers, setAllSneakers] = useState([]);

  // Base URL based on the current environment
  const baseUrl = window.location.origin;

  const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}`
    : 'http://localhost:3001';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all sneakers data from the server
        const response = await Axios.get(`${apiUrl}/sneaker/allsneakers`);
        console.log(response.data.sneakers);
        setAllSneakers(response.data.sneakers);
      } catch (error) {
        console.error("Error fetching sneakers data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleImageLoaded = () => {
    // Placeholder for image load handling
  };

  return (
    <React.Fragment>
      {/* Header component */}
      <Header />
      <div className='fullCategoryBody'>
        <br />
        <h1 className='categoryHeader'>Sneakers</h1>
        <div className='submenuBody'>
          {allSneakers.map(sneaker => (
            <Link key={sneaker.product_id} to={`/sneaker/${sneaker.product_id}`}>
              <SubMenuComponent
                onImageLoad={handleImageLoaded}
                name={sneaker.name}
                path={sneaker.image_path}
                product_price={sneaker.product_price}
              />
            </Link>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Sneakers;
