'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { loginSchema } from '@/schemas/loginSchema';

const LoginPage = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ loginId?: string; password?: string }>({});

  const { login, isLoginLoading } = useAuth();
  const isPending = isLoginLoading;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // zod 검증
    const result = loginSchema.safeParse({ loginId, password });

    if (!result.success) {
      const fieldErrors: { loginId?: string; password?: string } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as 'loginId' | 'password'] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    login({ loginId, password });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md bg-white rounded-[20px] shadow-lg p-6 md:p-10">
        {/* 제목 */}
        <h1 className="text-head-1-bold text-black text-center mb-2">로그인</h1>

        {/* 서브타이틀 */}
        <p className="text-body-1-medium text-gray-700 text-center mb-6 md:mb-8">투표 시스템에 오신 것을 환영합니다</p>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* 아이디 입력 */}
          <div>
            <label htmlFor="loginId" className="block text-body-2-semibold text-black mb-2">
              아이디
            </label>
            <input
              type="text"
              id="loginId"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="아이디를 입력하세요"
              className={`w-full px-4 py-3 bg-gray-200 rounded-[14px] text-body-1-medium text-black placeholder:text-gray-700 focus:outline-none`}
              disabled={isPending}
            />
            {errors.loginId && <p className="text-body-2-semibold text-red-500 mt-1">{errors.loginId}</p>}
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label htmlFor="password" className="block text-body-2-semibold text-black mb-2">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className={`w-full px-4 py-3 bg-gray-200 rounded-[14px] text-body-1-medium text-black placeholder:text-gray-700 focus:outline-none`}
              disabled={isPending}
            />
            {errors.password && <p className="text-body-2-semibold text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-blue-600 text-white text-body-1-semibold rounded-[14px] hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {isPending ? '로그인 중...' : '로그인하기'}
          </button>
        </form>

        {/* 회원가입 링크 */}
        <p className="text-center mt-6">
          <Link href="/signup" className="text-body-2-medium text-gray-600 hover:text-blue-600">
            계정이 없으신가요? 회원가입하러 가기
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
