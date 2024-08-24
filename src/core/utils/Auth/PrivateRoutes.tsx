import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
  const token = localStorage.getItem('authToken');

  return token ? <Outlet /> : <Navigate to="login" />;
}

export default PrivateRoutes;
