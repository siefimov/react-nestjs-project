import { create } from 'zustand';
import { type AuthUserDto } from '../schemas';

type AuthState = {
  user: AuthUserDto | null;
  setUser: (user: AuthUserDto | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  setUser: user => set({ user }),
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },
}));
