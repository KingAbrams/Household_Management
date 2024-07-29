import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './Authentication';

function PrivateRoutes() {
  const token = isAuthenticated();
  return token ? <Outlet /> : <Navigate to="login" />;
}

export default PrivateRoutes;
