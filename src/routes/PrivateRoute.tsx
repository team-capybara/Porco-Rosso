import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // 쿠키에서 access_token 확인
  const isAuthenticated = document.cookie.includes('access_token');

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
