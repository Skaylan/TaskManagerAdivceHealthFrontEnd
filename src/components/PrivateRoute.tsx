import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = Cookies.get('token');

  const isAuthenticated = !!token;
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};