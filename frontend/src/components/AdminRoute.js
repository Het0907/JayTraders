import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  console.log('AdminRoute - Current user:', user);
  console.log('AdminRoute - User role:', user?.role);
  
  // Check if user is logged in and has admin role
  if (!user || user.role !== 'admin') {
    console.log('AdminRoute - Access denied, redirecting to home');
    return <Navigate to="/" />;
  }

  console.log('AdminRoute - Access granted');
  return children;
};

export default AdminRoute; 