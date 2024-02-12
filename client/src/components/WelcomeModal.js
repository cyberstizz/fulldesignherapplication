import React from 'react';
import './WelcomeModal.scss'; // Adjust path as needed
import { useNavigate } from 'react-router';

const WelcomeModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="welcomeModal-overlay" onClick={onClose}>
      <div className="welcomeModal" onClick={e => e.stopPropagation()}>
        <h2>Welcome!</h2>
        <p className="welcomeModal">Welcome to the Designher profile. click on your name to view your profile.</p>
        <button className="welcomeModal-btn" onClick={() => {
          navigate(0, { replace: true, state: { key: Date.now() } }); // navigate(0) is a way to refresh the page
          onClose()
        }}>OK</button>
      </div>
    </div>
  );
};

export default WelcomeModal;
