import { Navigate } from "react-router-dom";
import { Dynamic } from "../context/DynamicContext";

const PrivateRoute = ({ children }) => {
  const { token } = Dynamic();
  if (!token) return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
