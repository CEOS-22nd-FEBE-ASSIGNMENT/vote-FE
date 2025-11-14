'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login, logout, validateToken, refreshToken } from '@/lib/apis/auth';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 로그인
  const loginMutation = useMutation({
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

  // 로그아웃
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
    },
  });

  // 토큰 검증
  const validateQuery = useQuery({
    queryKey: ['validateToken'],
    queryFn: validateToken,
    enabled: false, // 수동 호출
  });

  // 토큰 재발급
  const refreshMutation = useMutation({
    mutationFn: refreshToken,
  });

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    validateToken: validateQuery.refetch,
    refreshToken: refreshMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    isValidating: validateQuery.isFetching,
    isRefreshing: refreshMutation.isPending,
  };
};
