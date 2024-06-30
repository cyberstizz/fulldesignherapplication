import React, { useState } from 'react';
import './LoginModal.scss';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose, handleModalToggle, handleOpen }) => {
  // State to manage user access
  const [hasAccess, setHasAccess] = useState(false);

  // Base URL based on environment
  const baseUrl = window.location.origin;
  const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}`
    : 'http://localhost:3001';

  // State to manage input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Retrieve environment variables
    const theUsername = process.env.REACT_APP_USERNAME;
    const thePassword = process.env.REACT_APP_PASSWORD;

    // Check if the provided credentials match the environment variables
    if (username === theUsername && password === thePassword) {
      navigate('/control');
      return;
    }

    try {
      // Send login request to the server
      const response = await Axios.post(`${apiUrl}/login`, { username, password });

      // Check the response status and handle accordingly
      if (response.status === 200) {
        console.log('Login successful!');
        console.log('Username:', username);
        console.log('Password:', password);

        // Open the welcome modal
        handleOpen();
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }

    // Close the modal
    onClose();
  };

  // Render the modal only if it's open
  return isOpen && (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="create-account-link" onClick={() => handleModalToggle('signup')}>
            New? Create account
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
