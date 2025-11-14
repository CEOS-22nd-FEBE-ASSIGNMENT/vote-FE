import { create } from 'zustand';

interface AuthStore {
  accessToken: string;
  isLoggedIn: boolean;

  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: '',
  isLoggedIn: false,

  setAccessToken: (token) =>
    set({
      accessToken: token,
      isLoggedIn: true,
    }),

  clearAuth: () =>
    set({
      accessToken: '',
      isLoggedIn: false,
    }),
}));
