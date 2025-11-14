import Link from 'next/link';

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        {/* Main Title */}
        <h1 className="text-head-1-bold text-color-black">Welcome to Voting System</h1>

        {/* Subtitle */}
        <p className="text-head-1-bold text-gray-800">투표에 참여하고 여러분의 의견을 공유해보세요</p>

        {/* 투표하러가기 버튼 */}
        <Link
          href="/voting"
          className="px-8 py-3 rounded-[14px] text-head-4-semibold text-white gradient-linear shadow-md"
        >
          투표하러 가기
        </Link>
      </div>
    </main>
  );
};

export default Home;
