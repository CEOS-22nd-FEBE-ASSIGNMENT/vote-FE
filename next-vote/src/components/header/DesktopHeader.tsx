'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { useAuth } from '@/hooks/auth/useAuth';

const DesktopHeader = () => {
  const pathname = usePathname();
  const { accessToken } = useAuthStore();
  const { logout, isLogoutLoading } = useAuth();
  const isLoggedIn = !!accessToken;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
        {/* 좌측 로고 */}
        <Link href="/" className="text-head-3-bold text-black">
          2025 CEOS AWARD
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="flex items-center gap-8">
          <Link
            href="/voting"
            className={`text-body-1-semibold transition-colors ${
              pathname === '/voting' ? 'text-blue-600' : 'text-black hover:text-blue-600'
            }`}
          >
            VOTING
          </Link>
          <Link
            href="/members"
            className={`text-body-1-semibold transition-colors ${
              pathname === '/members' ? 'text-blue-600' : 'text-black hover:text-blue-600'
            }`}
          >
            MEMBERS
          </Link>
          {isLoggedIn ? (
            <button
              onClick={() => logout()}
              disabled={isLogoutLoading}
              className="text-body-1-semibold text-black hover:text-blue-600 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isLogoutLoading ? 'LOGOUT...' : 'LOGOUT'}
            </button>
          ) : (
            <Link
              href="/login"
              className={`text-body-1-semibold transition-colors ${
                pathname === '/login' ? 'text-blue-600' : 'text-black hover:text-blue-600'
              }`}
            >
              LOGIN
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default DesktopHeader;
