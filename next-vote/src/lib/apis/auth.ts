import { useAuthStore } from '@/stores/useAuthStore';
import type { LoginRequest, LoginResponse, RefreshResponse } from '@/types/auth/dto';
import { axiosInstance } from '@/lib/apis/axios';
import axios from 'axios';

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/api/auth/login', payload);

  // accessToken은 response body에 포함되어 있음
  const { accessToken } = response.data.result;

  if (accessToken) {
    useAuthStore.getState().setAccessToken(accessToken);
    localStorage.removeItem('skipAutoLogin');
  }

  return response.data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post('/api/auth/logout');
  useAuthStore.getState().clearAuth();
  localStorage.setItem('skipAutoLogin', 'true');
};

export const refreshToken = async (): Promise<boolean> => {
  const { setAccessToken, clearAuth } = useAuthStore.getState();
  try {
    const response = await axiosInstance.post<RefreshResponse>('/api/auth/refresh');
    const { accessToken } = response.data.result;

    if (!accessToken) throw new Error('Authorization 헤더에 토큰 없음');

    setAccessToken(accessToken);
    localStorage.removeItem('skipAutoLogin');
    return true;
  } catch (err) {
    if (axios.isAxiosError(err) && [400, 401].includes(err.response?.status ?? 0)) {
      console.info('refreshToken 쿠키가 없거나 만료됨');
    } else {
      console.error('refreshToken 예외 발생:', err);
    }

    clearAuth();
    localStorage.setItem('skipAutoLogin', 'true');
    return false;
  }
};
