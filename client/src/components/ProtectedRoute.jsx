import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/auth.service';

/**
 * Route protection wrapper. Redirects unauthenticated requests to /login
 * preserving the target location for post-login redirect.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();

  // Check if session token/user credentials exist
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
}
