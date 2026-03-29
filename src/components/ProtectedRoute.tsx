import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import { RootState } from '../store/store';

export default function ProtectedRoute() {
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
