import { axiosInstance } from '@/lib/apis/axios';
import type { SignupRequest, SignupResponse, CheckAvailableResponse } from '@/types/auth/dto';

export const signup = async (payload: SignupRequest): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>('/api/auth/signup', payload);
  return response.data;
};

export const checkIdDuplicate = async (loginId: string): Promise<CheckAvailableResponse> => {
  const response = await axiosInstance.get<CheckAvailableResponse>(`/api/check/login-id?value=${loginId}`);
  return response.data;
};

export const checkEmailDuplicate = async (email: string): Promise<CheckAvailableResponse> => {
  const response = await axiosInstance.post<CheckAvailableResponse>('/api/check/email', { value: email });
  return response.data;
};
