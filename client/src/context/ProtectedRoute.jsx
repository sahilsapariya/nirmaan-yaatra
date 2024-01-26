import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext);

  return !user ? <Navigate to="/sign-in" /> : children;
};

export default ProtectedRoute;
