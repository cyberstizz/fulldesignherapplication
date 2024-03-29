import React from 'react';
import { Link } from 'react-router-dom';
import './UserModal.scss'; // Make sure the path matches your file structure

const UserModal = ({ isOpen, onClose, onLogout, onProfile }) => {
  if (!isOpen) return null;

  return (
    <div className="userModal-overlay" onClick={onClose}>
      <div className="userModal" onClick={e => e.stopPropagation()}>
        <Link to={`/profile`}><button className="userModal-btn" onClick={onProfile}>Profile</button></Link>
        <button className="userModal-btn" onClick={onLogout}>Logout</button>
        <button className="userModal-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserModal;
