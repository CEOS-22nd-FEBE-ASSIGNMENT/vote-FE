import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';

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

// Response Interceptor: 새 accessToken 자동 저장
axiosInstance.interceptors.response.use(
  (response) => {
    const authHeader = response.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      const newToken = authHeader.split(' ')[1];
      useAuthStore.getState().setAccessToken(newToken);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
