import React, { useState } from 'react';
import './SignUp.scss';
import Axios from 'axios';

const SignUp = ({ isOpen, onClose, afterSignup }) => {
  // Define the base URL based on the current environment
  const baseUrl = window.location.origin;

  const apiUrl = process.env.NODE_ENV === 'production'
    ? `${baseUrl}`
    : 'http://localhost:3001';

  // State variables for form fields
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to register a new user
      const response = await Axios.post(`${apiUrl}/register`, {
        username: username.toLowerCase(), // Convert username to lowercase
        email_address: email,
        password, // Keep password as is to maintain case sensitivity
        first_name: firstName,
        last_name: lastName,
      });

      // Check the response status and handle accordingly
      if (response.status === 201) {
        console.log('Registration successful!');
        // Trigger the afterSignup function on success
        afterSignup();
      } else {
        console.error('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }

    // Close the modal
    onClose();
  };

  // Render the sign-up form modal
  return isOpen && (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form className="signup-form" onSubmit={handleSignup}>
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
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
