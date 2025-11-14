'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { validateToken } from '@/lib/apis/auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { accessToken, clearAuth } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      // 로그인 페이지나 회원가입 페이지는 검증 스킵
      if (pathname === '/login' || pathname === '/signup') {
        return;
      }

      // 토큰이 있으면 검증
      if (accessToken) {
        try {
          await validateToken();
        } catch (error) {
          // 토큰 유효하지 않으면 클리어하고 로그인 페이지로
          clearAuth();
          router.push('/login');
        }
      }
    };

    checkAuth();
  }, [pathname, accessToken, router, clearAuth]);

  return <>{children}</>;
};

