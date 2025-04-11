// components/HideForLoggedIn.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const HideForLoggedIn = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? <Navigate to="/" replace /> : children;
};

export default HideForLoggedIn;
