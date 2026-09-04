import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoute = ({ children, requireRole }) => {
  const { user, isLoading } = useAppContext();

  if (isLoading) {
    return <p className="text-center py-32 text-gray-400">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireRole && user.role !== requireRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
