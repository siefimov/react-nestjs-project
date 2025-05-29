import { useEffect } from 'react';
import { useAuthStore } from '@/features';
import { http } from '@/shared/lib/api';
import { API_ROUTES } from '@/shared/constants';
import type { AuthUserDto } from '@/features/auth';

export const useAuthInit = () => {
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return;
    }

    const getUserProfile = async () => {
      try {
        const response = await http.get<{ user: AuthUserDto }>(
          API_ROUTES.PROFILE,
          {
            withAuth: true,
          },
        );
        setUser(response.user);
      } catch {
        setUser(null);
      }
    };

    getUserProfile();
  }, [setUser]);
};
