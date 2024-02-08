import React from 'react';
import './WelcomeUserModal.scss'; // Adjust path as needed

const WelcomeUserModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="welcomeUserModal-overlay" onClick={onClose}>
      <div className="welcomeUserModal" onClick={e => e.stopPropagation()}>
        <h2>Welcome {user}!</h2>
        <p>Thanks for joining the Designher community. We will notify you about important updates and happenings within our ecosystem. You can click your name at the top of the screen to view your profile.</p>
        <button className="welcomeUserModal-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default WelcomeUserModal;
