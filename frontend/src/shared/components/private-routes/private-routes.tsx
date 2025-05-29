import { Navigate, Outlet } from 'react-router';
import { APP_ROUTES } from '../../constants/app-routes.const';

export const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to={APP_ROUTES.LOGIN} replace />;
};
