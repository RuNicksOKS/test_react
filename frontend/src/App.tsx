import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationComponent from './components/navigation/Navigation';
import { ScrollToTop } from './components/scrolltotop';

function App() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 메인 페이지인지 확인
  const isHomePage = location.pathname === '/';

  // 페이지 이동 시 스크롤을 맨 위로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 헤더 스크롤 효과 (메인 페이지에서만 적용)
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true); // 메인 페이지가 아니면 항상 스크롤된 상태로 설정
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <div>
      {/* 전역 네비게이션 컴포넌트 */}
      <NavigationComponent />
      
      {/* 라우트 컴포넌트들이 여기에 렌더링됩니다 */}
      <Outlet />
      
      {/* 스크롤을 맨 위로 올려주는 버튼 */}
      <ScrollToTop />
    </div>
  );
}

export default App;