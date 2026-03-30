import { useLogoutMutation } from '../store/api/authApi';
import toast from 'react-hot-toast';

export const useLogout = () => {
  const [logout, { isLoading, error }] = useLogoutMutation();

  const performLogout = async (redirectPath: string = '/login') => {
    try {
      await logout().unwrap();
      toast.success('Logged out successfully');
    } catch (err) {
      console.error('Logout API failed:', err);
      toast.error('Logout failed');
    } finally {
      // The API handles localStorage cleanup, just redirect
      window.location.href = redirectPath;
    }
  };

  return {
    logout: performLogout,
    isLoading,
    error,
  };
};
