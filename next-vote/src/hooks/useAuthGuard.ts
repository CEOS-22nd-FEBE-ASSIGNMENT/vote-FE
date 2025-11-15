'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';

export const useLoginGuard = (redirectTo: string = '/login') => {
  const router = useRouter();
  const { accessToken, isAuthChecked } = useAuthStore();

  useEffect(() => {
    if (!isAuthChecked) return;
    if (!accessToken) {
      router.replace(redirectTo);
    }
  }, [accessToken, isAuthChecked, router, redirectTo]);
};

export const useGuestGuard = (redirectTo: string = '/') => {
  const router = useRouter();
  const { accessToken, isAuthChecked } = useAuthStore();

  useEffect(() => {
    if (!isAuthChecked) return;
    if (accessToken) {
      router.replace(redirectTo);
    }
  }, [accessToken, isAuthChecked, router, redirectTo]);
};
