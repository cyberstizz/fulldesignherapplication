import React, { useState, useEffect } from 'react';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './LoginModal';
import SignUp from './SignUp';
import Axios from 'axios';
import UserModal from './UserModal';
import WelcomeModal from './WelcomeModal';
import WelcomeUserModal from './WelcomeUserModal';

const Header = () => {
  // State variables for managing modals and user data
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isWelcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [isWelcomeUserModalOpen, setWelcomeUserModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Check user authentication on component mount
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

  // Function to close all modals
  const handleCloseModal = () => {
    setWelcomeModalOpen(false);
    setWelcomeUserModalOpen(false);
    setUserModalOpen(false);
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await Axios.get('/logout'); // Call the logout endpoint
      console.log('Logged out successfully');
      handleCloseModal();
      navigate(0, { replace: true, state: { key: Date.now() } }); // Refresh the page
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  // Function to open the welcome modal
  const handleOpenWelcome = () => {
    setWelcomeModalOpen(true);
  };

  // Function to handle user search
  const handleSearch = async (e) => {
    e.preventDefault();
    navigate('/search', { state: { query } }); // Navigate to the search page with query
  };

  // Function to navigate to the home page on logo click
  const handleLogoClick = () => {
    navigate('/');
  };

  // Function to toggle login and signup modals
  const handleModalToggle = (modalType) => {
    setIsLoginModalOpen(modalType === 'login');
    setIsSignupModalOpen(modalType === 'signup');
  };

  return (
    <header className="mainHeader">
      {/* Modal components for login, signup, and user actions */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        handleModalToggle={handleModalToggle}
        handleOpen={handleOpenWelcome}
      />
      <SignUp
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onOpenLoginModal={() => handleModalToggle('login')}
        afterSignup={handleOpenWelcomeUserModal}
      />
      <WelcomeModal isOpen={isWelcomeModalOpen} onClose={handleCloseModal} />
      <WelcomeUserModal isOpen={isWelcomeUserModalOpen} onClose={handleCloseModal} user={user} />
      <UserModal isOpen={isUserModalOpen} onClose={handleCloseModal} onLogout={handleLogout} userId={user} />

      {user ? (
        // Display username if user is logged in
        <div className="userWelcome" onClick={handleOpenUserModal}>{user.username}</div>
      ) : (
        // Display lock icon for login if no user is logged in
        <FontAwesomeIcon className="lockIcon" icon={faLock} onClick={() => handleModalToggle('login')} />
      )}

      {/* Logo and navigation links */}
      <div className='mainLogo' onClick={handleLogoClick}></div>

      <div className='headerRightSide'>
        <form onSubmit={handleSearch} className='searchForm'>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className='searchBar'
          />
        </form>

        <div className='navigationBar'>
          <Link to="/jackets"><div className='firstNavItem'>Jackets</div></Link>
          <Link to="/crocs"><div className='navItem'>Crocs</div></Link>
        </div>

        <div className='navigationBarTwo'>
          <Link to='/sneakers'><div className='firstNavItem' id='justSneakers'>Sneakers</div></Link>
          <Link to='/boots'><div className='navItem' id='justBoots'>Boots</div></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
