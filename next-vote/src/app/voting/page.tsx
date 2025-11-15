'use client';

import { useLoginGuard } from '@/hooks/useAuthGuard';

const VotingPage = () => {
  useLoginGuard(); // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center">
        <h1 className="text-head-1-bold mb-4 text-color-black">투표 페이지</h1>
      </div>
    </main>
  );
};

export default VotingPage;
