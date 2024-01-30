import React, { useState } from 'react';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './LoginModal';
import SignUp from './SignUp';
import { useEffect } from 'react';
import Axios from 'axios';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [user, setUser] = useState(null); // Assuming user state holds user information

  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await Axios.get('/user');
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking user authentication:', error.message);
      }
    };

    checkUserAuthentication();
  }, []);

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

      {user ? (
        <div className="userWelcome">Welcome, {user.username}</div>
      ) : (
        <FontAwesomeIcon className="lockIcon" icon={faLock} onClick={() => handleModalToggle('login')} />
      )}     
     
     
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
