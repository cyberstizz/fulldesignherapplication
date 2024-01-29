import React from 'react';
import './Header.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './LoginModal';
import Signup from './SignUp';




const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);


  const handleModalToggle = (modalType) => {
    setIsLoginModalOpen(modalType === 'login');
    setIsSignupModalOpen(modalType === 'signup');
  };

    const navigate = useNavigate();

  const handleLogoClick = () => {
    // Navigate to the home page when the logo is clicked
    navigate('/');
  };
     
    return(
        
 <header className="mainHeader">

<LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} handleModalToggle={handleModalToggle} />
      <Signup
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onOpenLoginModal={() => {
          setIsLoginModalOpen(true);
          setIsSignupModalOpen(false);
          console.log('Signup Modal opened');
        }}
      />


    <FontAwesomeIcon className="lockIcon" icon={faLock} onClick={() => setIsLoginModalOpen(true)} />
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


