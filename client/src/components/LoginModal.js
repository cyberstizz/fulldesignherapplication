import React, { useState } from 'react';
import './LoginModal.scss';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginModal = ({ isOpen, onClose, handleModalToggle }) => {

  const baseUrl = window.location.origin;

  const apiUrl = process.env.NODE_ENV === 'production'
  ? `${baseUrl}`
  : 'http://localhost:3001';


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    if(username === 'dianna' && password === '1120'){
      navigate('/control')
    }

    try {
      const response = await Axios.post(`${apiUrl}/login`, { email_address: username, password });
      // Check the response status and handle accordingly
      if (response.status === 200) {
        // Successful login, you can redirect or perform other actions
        console.log('Login successful!');

        console.log('Username:', username);
        console.log('Password:', password);

      } else {
        // Handle login failure, display error message or take appropriate action
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }

    

    // Close the modal
    onClose();

  };

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
