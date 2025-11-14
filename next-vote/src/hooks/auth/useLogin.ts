'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/apis/auth';

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.isSuccess && data.result.accessToken) {
        router.push('/');
      }
    },
    onError: (error) => {
      alert(`로그인 실패: ${error.message}`);
    },
  });
};
