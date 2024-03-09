import React, { useState } from 'react';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './LoginModal';
import SignUp from './SignUp';
import { useEffect } from 'react';
import Axios from 'axios';
import UserModal from './UserModal';
import WelcomeModal from './WelcomeModal';
import WelcomeUserModal from  './WelcomeUserModal';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isWelcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [isWelcomeUserModalOpen, setWelcomeUserModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [query, setQuery] = useState('');

  const handleOpenWelcomeModal = () => setWelcomeModalOpen(true);
  const handleOpenWelcomeUserModal = () => setWelcomeUserModalOpen(true);
  const handleOpenUserModal = () => setUserModalOpen(true);


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

  const handleCloseModal = () => {
    setWelcomeModalOpen(false);
    setWelcomeUserModalOpen(false);
    setUserModalOpen(false);
  };


  const handleLogout = async () => {
    try {
      // Call the logout endpoint
      await Axios.get('/logout');
      console.log('Logged out successfully');
  
      handleCloseModal();
      navigate(0, { replace: true, state: { key: Date.now() } }); // navigate(0) is a way to refresh the page
  
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  }

  const handleOpenWelcome = () => {
    //this function simply calls the hook that will open or close the welcome modal
    setWelcomeModalOpen(true); // Directly open the Welcome Modal
  }


  //function responsible for checking a users search
  const handleSearch = async (e) => {
    e.preventDefault();
    // Navigate to the search page and pass the query as state
    navigate('/search', { state: { query } });
  };


  const handleLogoClick = () => {
    navigate('/');
  };


  const handleModalToggle = (modalType) => {
    setIsLoginModalOpen(modalType === 'login');
    setIsSignupModalOpen(modalType === 'signup');
  };

  return (
    <header className="mainHeader">
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} handleModalToggle={handleModalToggle} handleOpen={handleOpenWelcome} />
      <SignUp isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} onOpenLoginModal={() => handleModalToggle('login')} afterSignup={handleOpenWelcomeUserModal} />
      <WelcomeModal isOpen={isWelcomeModalOpen} onClose={handleCloseModal} />
      <WelcomeUserModal isOpen={isWelcomeUserModalOpen} onClose={handleCloseModal} user={user} />
      <UserModal isOpen={isUserModalOpen} onClose={handleCloseModal} onLogout={handleLogout} user={user} />
      {user ? (
        <div className="userWelcome" onClick={handleOpenUserModal}> {user.username}</div>
      ) : (
        <FontAwesomeIcon className="lockIcon" icon={faLock} onClick={() => handleModalToggle('login')} />
      )}     
     
     
      <div className='mainLogo' onClick={handleLogoClick}> sign in</div>

      <div className='headerRightSide'>
      <form onSubmit={handleSearch} className='searchForm'>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for products..." 
        className='searchBar'
        />
        </form>
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
