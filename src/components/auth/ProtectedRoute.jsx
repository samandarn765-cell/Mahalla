import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useMahalla } from '../../context/MahallaContext';

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, userRole } = useMahalla();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // If not authorized for admin, redirect to home with error
    return <Navigate to="/" replace />;
  }

  return children;
};
