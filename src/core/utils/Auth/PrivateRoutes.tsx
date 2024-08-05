import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';

function PrivateRoutes() {
  // const { token } = useAuth();
  const token = localStorage.getItem('authToken');
  return token ? <Outlet /> : <Navigate to="login" />;
}

export default PrivateRoutes;
