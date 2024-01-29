// LoginModal.js
import React from 'react';
import { useState } from 'react';
import './LoginModal.scss';   

const LoginModal = (props,{ isOpen, onClose }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // You can perform your API call to the /login route here using username and password state values
    // Example: const response = await fetch('/login', { method: 'POST', body: JSON.stringify({ username, password }), headers: { 'Content-Type': 'application/json' } });
    // Add your logic based on the response

    // For now, let's just log the credentials
    console.log('Username:', username);
    console.log('Password:', password);

    // Close the modal
    onClose();
  };


  if (!isOpen) return null;

  return (
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
              onChange={(e) => setUsername(e.target.value)}
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

          <p className="create-account-link" onClick={() => props.handleModalToggle('signup')}>New? Create account</p>
        </form>      </div>
    </div>
  );
};

export default LoginModal;
