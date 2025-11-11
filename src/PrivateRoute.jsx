import { useAuthContext } from "./AuthProvider";
import { Navigate } from "react-router";
import { useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }
  return children;
};

export default PrivateRoute;
