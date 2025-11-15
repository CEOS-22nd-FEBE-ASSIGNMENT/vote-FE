import { create } from 'zustand';

interface AuthStore {
  accessToken: string;
  isLoggedIn: boolean;
  isAuthChecked: boolean;

  setAccessToken: (token: string) => void;
  clearAuth: () => void;
  setAuthChecked: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: '',
  isLoggedIn: false,
  isAuthChecked: false,

  setAccessToken: (token) =>
    set({
      accessToken: token,
      isLoggedIn: true,
    }),

  clearAuth: () =>
    set({
      accessToken: '',
      isLoggedIn: false,
      isAuthChecked: true,
    }),

  setAuthChecked: () => set({ isAuthChecked: true }),
}));
