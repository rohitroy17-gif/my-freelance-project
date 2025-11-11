import { useAuthContext } from "./AuthProvider";
import { Navigate } from "react-router";
import { useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return <p>Loading...</p>; // spinner or skeleton

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;

