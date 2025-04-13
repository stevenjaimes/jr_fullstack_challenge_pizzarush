
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};