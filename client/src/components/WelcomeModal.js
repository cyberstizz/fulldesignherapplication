import React from 'react';
import './WelcomeModal.scss'; // Adjust path as needed

const WelcomeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="welcomeModal-overlay" onClick={onClose}>
      <div className="welcomeModal" onClick={e => e.stopPropagation()}>
        <h2>Welcome!</h2>
        <p>Welcome to the Designher profile. If you would like to view your profile, click on your name at the top of the screen.</p>
        <button className="welcomeModal-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default WelcomeModal;
