import React from 'react';
import './Header.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import SubMenuComponent from './SubmenuComponent';




const Header = () => {
     
    return(
        
 <header className="mainHeader">

<div className='mainLogo'></div>
<form className='headerRightSide'>
    <input type='search' className='searchBar'></input>
    <div className='navigationBar'>
      <ul className='navUlTag'>
       <Link to="/jackets"><li className='firstNavItem'>Jackets</li></Link>
       <Link to="/crocs"><li className='navItem'>Crocs</li></Link>
      </ul>
    </div>

    <div className='navigationBarTwo'>
       <ul className='navUlTag'> 
        <Link to='/sneakers'><li className='firstNavItem'>Sneakers</li></Link>
        <Link to='/boots'><li className='navItem'>Boots</li></Link>
      </ul>
    </div>
</form>
</header> 
                
    );
}

export default Header;


