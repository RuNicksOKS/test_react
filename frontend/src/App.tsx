import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import EnitecHome from './pages/home/EnitecHome';
import NavigationComponent from './components/navigation/Navigation';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  // 헤더 스크롤 효과
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* 전역 네비게이션 컴포넌트 */}
      <NavigationComponent isScrolled={isScrolled} />
      
      <Routes>
        <Route path="/" element={<EnitecHome />} />
      </Routes>
    </div>
  );
}

export default App;