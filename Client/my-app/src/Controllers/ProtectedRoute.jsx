import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  
  // If the user data is still being fetched, show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user (logged out), redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the protected route
  return children;
};

export default ProtectedRoute;
