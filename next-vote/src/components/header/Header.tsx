import DesktopHeader from '@/components/header/DesktopHeader';
import MobileHeader from '@/components/header/MobileHeader';

const Header = () => {
  return (
    <>
      {/* 데스크톱 헤더 (md 이상에서만 표시) */}
      <div className="hidden md:block">
        <DesktopHeader />
      </div>

      {/* 모바일 헤더 (md 미만에서만 표시) */}
      <div className="md:hidden">
        <MobileHeader />
      </div>
    </>
  );
};

export default Header;
