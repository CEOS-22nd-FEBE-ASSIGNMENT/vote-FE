import { z } from 'zod';

export const loginSchema = z.object({
  loginId: z.string().min(1, '아이디를 입력해주세요').max(20, '아이디는 20자 이하여야 합니다'),
  password: z.string().min(1, '비밀번호를 입력해주세요').max(255, '비밀번호는 255자 이하여야 합니다'),
});

export type LoginInput = z.infer<typeof loginSchema>;
