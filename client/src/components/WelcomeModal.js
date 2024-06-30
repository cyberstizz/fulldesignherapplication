import React from 'react';
import './WelcomeModal.scss'; 
import { useNavigate } from 'react-router';

const WelcomeModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null; // Return null if modal is not open

  return (
    <div className="welcomeModal-overlay" onClick={onClose}>
      <div className="welcomeModal" onClick={e => e.stopPropagation()}>
        <h2>Welcome!</h2>
        <p className="welcomeModal">Welcome to the Designher profile. Click on your name to view your profile.</p>
        {/* Button to refresh the page and close the modal */}
        <button className="welcomeModal-btn" onClick={() => {
          navigate(0, { replace: true, state: { key: Date.now() } }); // Refresh the page
          onClose(); // Close the modal
        }}>OK</button>
      </div>
    </div>
  );
};

export default WelcomeModal;
