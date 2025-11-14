import { useAuthStore } from '@/stores/useAuthStore';
import type { LoginRequest, LoginResponse, ValidateResponse, RefreshResponse } from '@/types/auth/dto';
import { axiosInstance } from '@/lib/apis/axios';

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/api/auth/login', payload);

  // accessToken은 response body에 포함되어 있음
  const { accessToken } = response.data.result;

  if (accessToken) {
    useAuthStore.getState().setAccessToken(accessToken);
  }

  return response.data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post('/api/auth/logout');
  useAuthStore.getState().clearAuth();
};

export const validateToken = async (): Promise<ValidateResponse> => {
  const response = await axiosInstance.get<ValidateResponse>('/api/auth/validate');
  return response.data;
};

export const refreshToken = async (): Promise<RefreshResponse> => {
  const response = await axiosInstance.post<RefreshResponse>('/api/auth/refresh');
  const { accessToken } = response.data.result;
  if (accessToken) {
    useAuthStore.getState().setAccessToken(accessToken);
  }
  return response.data;
};
