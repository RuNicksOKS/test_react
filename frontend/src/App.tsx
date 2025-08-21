import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import EnitecHome from './pages/home/EnitecHome';
import Copyright from './pages/copyright/Copyright';
import News from './pages/news/News';
import Company from './pages/company/Company';
import NavigationComponent from './components/navigation/Navigation';

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
      <NavigationComponent isScrolled={isScrolled} />
      
      <Routes>
        <Route path="/" element={<EnitecHome />} />
        <Route path="/copyright" element={<Copyright />} />
        <Route path="/news" element={<News />} />
        <Route path="/company" element={<Company />} />
      </Routes>
    </div>
  );
}

export default App;