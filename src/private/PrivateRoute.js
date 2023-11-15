import { Navigate } from "react-router-dom";
import { Dynamic } from "../context/DynamicContext";

const PrivateRoute = ({ children }) => {
  const { idUser } = Dynamic();
  if (!idUser) return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
