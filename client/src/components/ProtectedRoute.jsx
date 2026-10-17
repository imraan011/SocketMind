import { useState, useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { isAuthenticated, checkAuthApi } from '../services/auth.service';

/**
 * Route protection wrapper. Redirects unauthenticated requests to /login
 * preserving the target location for post-login redirect.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const [isAuthed, setIsAuthed] = useState(isAuthenticated());

  // Backend session verify kar rahe hain
  useEffect(() => {
    let isMounted = true;
    checkAuthApi().then((user) => {
      if (isMounted) {
        setIsAuthed(Boolean(user));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
}

