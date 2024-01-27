import React from 'react';
import './Header.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SubMenuComponent from './SubmenuComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';




const Header = () => {


    const navigate = useNavigate();

  const handleLogoClick = () => {
    // Navigate to the home page when the logo is clicked
    navigate('/');
  };
     
    return(
        
 <header className="mainHeader">
    <FontAwesomeIcon className="lockIcon" icon={faLock} />
    <div className='mainLogo' onClick={handleLogoClick}> sign in</div>
<div className='headerRightSide'>
    <input type='search' className='searchBar'></input>
    <div className='navigationBar'>
       <Link to="/jackets"><div className='firstNavItem'>Jackets</div></Link>
       <Link to="/crocs"><div className='navItem'>Crocs</div></Link>
    </div>

    <div className='navigationBarTwo'>
        <Link to='/sneakers'><div className='firstNavItem'>Sneakers</div></Link>
        <Link to='/boots'><div className='navItem'>Boots</div></Link>
    </div>
</div>
</header> 
                
    );
}

export default Header;


