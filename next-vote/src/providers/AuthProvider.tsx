'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { refreshToken } from '@/lib/apis/auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked);

  useEffect(() => {
    const checkAuth = async () => {
      const skipAutoLogin = localStorage.getItem('skipAutoLogin') === 'true';
      if (!skipAutoLogin) await refreshToken();

      setAuthChecked();
    };
    checkAuth();
  }, [setAuthChecked]);

  return <>{children}</>;
};
