import { z } from 'zod';

export const signUpSchema = z.object({
  userEmail: z.string().email('이메일 형식이 올바르지 않습니다.'),
  password: z.string(),
  passwordCheck: z.string(),
}).refine(data => data.password === data.passwordCheck, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['passwordCheck'],
});

export type SignUpInput = z.infer<typeof signUpSchema>;
