import { useGetCurrentUserQuery } from '../store/api/authApi';
import { skipToken } from '@reduxjs/toolkit/query';

export function useAuth() {
  const token = localStorage.getItem('access_token');
  
  const { data: currentUser, isLoading, error } = useGetCurrentUserQuery(
    token ? undefined : skipToken
  );

  const isAuthenticated = !!token && !!currentUser;
  const user = currentUser?.data;

  return { user, isAuthenticated, isLoading, error };
}
