import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Get the user's role from localStorage (or another source, e.g., context)
  const role = localStorage.getItem('role');

  // Check if the user is an admin
  if (role !== 'admin') {
    // Redirect to the home page or login page if not authorized
    return <Navigate to="/" />;
  }

  // Render the child components if the user is an admin
  return children;
};

export default AdminRoute;