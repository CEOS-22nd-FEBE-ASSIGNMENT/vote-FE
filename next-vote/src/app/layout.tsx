import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/header/Header';
import ReactQueryProvider from '@/utils/reactQueryProvider';
import { AuthProvider } from '@/providers/AuthProvider';

export const metadata: Metadata = {
  title: '2025 CEOS AWARD',
  description: 'CEOS 투표 시스템에 오신 것을 환영합니다. 투표에 참여하고 여러분의 의견을 공유해보세요.',
  icons: { icon: '/modelly-favicon.svg' },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className="antialiased gradient-radial min-h-screen">
        <ReactQueryProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
