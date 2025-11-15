import { useMutation, useQuery } from '@tanstack/react-query';
import { signup, checkIdDuplicate, checkEmailDuplicate } from '@/lib/apis/signup';
import type { SignupRequest } from '@/types/auth/dto';

// 회원가입
export const useSignupMutation = () =>
  useMutation({
    mutationFn: (payload: SignupRequest) => signup(payload),
  });

// 아이디 중복 검사

export const useCheckIdDuplicateQuery = (id: string, options?: object) =>
  useQuery({
    queryKey: ['checkIdDuplicate', id],
    queryFn: () => checkIdDuplicate(id),
    enabled: false,
    ...options,
  });

// 이메일 중복 검사

export const useCheckEmailDuplicateQuery = (email: string, options?: object) =>
  useQuery({
    queryKey: ['checkEmailDuplicate', email],
    queryFn: () => checkEmailDuplicate(email),
    enabled: false,
    ...options,
  });
