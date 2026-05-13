// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("role") !== null;
  
  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  // If logged in, show the requested page
  return children;
}

export default ProtectedRoute;