import React from 'react';
import { Link } from 'react-router-dom';
import './UserModal.scss'; 

const UserModal = ({ isOpen, onClose, onLogout, onProfile, userId }) => {
  if (!isOpen) return null; // Return null if modal is not open
  console.log(userId);

  return (
    <div className="userModal-overlay" onClick={onClose}>
      <div className="userModal" onClick={e => e.stopPropagation()}>
        {/* Button to navigate to user profile */}
        <Link to={`/profile/${userId.user_id}`}>
          <button className="userModal-btn" onClick={onProfile}>Profile</button>
        </Link>
        {/* Button to log out */}
        <button className="userModal-btn" onClick={onLogout}>Logout</button>
        {/* Button to close the modal */}
        <button className="userModal-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserModal;
