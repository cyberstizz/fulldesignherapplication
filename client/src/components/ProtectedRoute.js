import React from 'react';
import { Navigate } from 'react-router-dom';
import './ProtectedRoute.scss';

const ProtectedRoute = ({ hasAccess, children }) => {
    if (!hasAccess) {
      // Redirect to home where your login form is, or to a specific login page
      return <Navigate to="/" replace />;
    }
  
    return children;
  };

  export default ProtectedRoute;