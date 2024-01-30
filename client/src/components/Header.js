import React, { useState } from 'react';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './LoginModal';
import SignUp from './SignUp';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleModalToggle = (modalType) => {
    setIsLoginModalOpen(modalType === 'login');
    setIsSignupModalOpen(modalType === 'signup');
  };

  return (
    <header className="mainHeader">
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} handleModalToggle={handleModalToggle} />
      <SignUp isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} onOpenLoginModal={() => handleModalToggle('login')} />

      <FontAwesomeIcon className="lockIcon" icon={faLock} onClick={() => handleModalToggle('login')} />
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
};

export default Header;
