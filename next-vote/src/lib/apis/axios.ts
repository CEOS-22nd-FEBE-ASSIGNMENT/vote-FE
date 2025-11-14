import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';
import type { RefreshResponse } from '@/types/auth/dto';

// refreshTokenApi는 순환 참조를 피하기 위해 여기서 직접 정의
// auth.ts의 refreshToken은 useAuth 훅에서 수동 호출용
const refreshTokenApi = async (): Promise<string> => {
  const response = await axios.post<RefreshResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
    {},
    { withCredentials: true },
  );
  const { accessToken } = response.data.result;
  if (accessToken) {
    useAuthStore.getState().setAccessToken(accessToken);
    return accessToken;
  }
  throw new Error('No access token received');
};

// 해당 api는 인증 없이 접근 가능
const NON_AUTH_URLS = [
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/refresh',
  '/api/check/login-id',
  '/api/check/email',
];

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request Interceptor: accessToken 자동 주입
axiosInstance.interceptors.request.use(
  (config) => {
    const isAuthRequest = NON_AUTH_URLS.some((path) => config.url?.includes(path));

    if (!isAuthRequest) {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 토큰 재발급 상태 관리
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: unknown) => void }> = [];

// Response Interceptor: 새 accessToken 자동 저장 및 401 에러 처리
axiosInstance.interceptors.response.use(
  (response) => {
    const authHeader = response.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      const newToken = authHeader.split(' ')[1];
      useAuthStore.getState().setAccessToken(newToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, refresh 요청이 아닌 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/api/auth/refresh')
    ) {
      if (isRefreshing) {
        // 이미 refresh 중이면 대기
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // refreshTokenApi 사용 (순환 참조 방지를 위해 직접 정의된 함수)
        const accessToken = await refreshTokenApi();

        // 새 토큰으로 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // 대기 중인 요청들 처리
        failedQueue.forEach(({ resolve }) => resolve());
        failedQueue = [];

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // refresh 실패 시 로그인 페이지로
        failedQueue.forEach(({ reject }) => reject(refreshError));
        failedQueue = [];
        useAuthStore.getState().clearAuth();

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
