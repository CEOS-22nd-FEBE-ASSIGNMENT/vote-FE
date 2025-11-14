'use client';

import Link from 'next/link';
import { useState } from 'react';
import HamburgerIcon from '@/svgs/common/hambergurBar.svg';

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
          {/* 좌측 로고 */}
          <Link href="/" className="text-head-3-bold text-black ">
            2025 CEOS AWARD
          </Link>

          {/* 모바일 햄버거 아이콘 */}
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            aria-label="메뉴 열기"
          >
            <HamburgerIcon width={24} height={24} />
          </button>
        </div>
      </header>

      {/* 모바일 사이드 드로어 메뉴 */}
      <>
        {/* 오버레이 배경 */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeMenu}
        />

        {/* 드로어 메뉴 */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="flex flex-col pt-20 px-8">
            <Link
              href="/voting"
              className="text-body-1-semibold text-black py-6 border-b border-gray-200 hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              VOTING
            </Link>
            <Link
              href="/members"
              className="text-body-1-semibold text-black py-6 border-b border-gray-200 hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              MEMBERS
            </Link>
            <Link
              href="/login"
              className="text-body-1-semibold text-black py-6 hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              LOGIN
            </Link>
          </nav>
        </div>
      </>
    </>
  );
};

export default MobileHeader;
