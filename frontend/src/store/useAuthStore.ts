import { create } from 'zustand';
import { apiClient } from '../services/api';

export interface User {
  id: string;
  discordId: string;
  username: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  checkAuth: async () => {
    try {
      const res = await apiClient('/users/me');
      set({ user: res.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
  logout: async () => {
     await apiClient('/auth/logout', { method: 'POST' });
     set({ user: null, isAuthenticated: false });
  }
}));
