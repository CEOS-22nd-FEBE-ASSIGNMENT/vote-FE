import { useMutation, useQuery } from '@tanstack/react-query';
import { signup, checkIdDuplicate, checkEmailDuplicate } from '@/lib/apis/signup';
import type { SignupRequest } from '@/types/auth/dto';

// 회원가입
export const useSignupMutation = () =>
  useMutation({
    mutationFn: (payload: SignupRequest) => signup(payload),
  });

// 아이디 중복 검사
export const useCheckIdDuplicateQuery = (id: string) =>
  useQuery({
    queryKey: ['checkIdDuplicate', id],
    queryFn: () => checkIdDuplicate(id),
    enabled: !!id,
  });

// 이메일 중복 검사
export const useCheckEmailDuplicateQuery = (email: string) =>
  useQuery({
    queryKey: ['checkEmailDuplicate', email],
    queryFn: () => checkEmailDuplicate(email),
    enabled: !!email,
  });
