import React, { useState, useEffect } from 'react';
import topArrowIcon from '../../assets/icon/top_arrow.png';
import './ScrollToTop.css';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치를 감지하여 버튼 표시/숨김 제어
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <div className="scroll-to-top-container">
          <div className="scroll-to-top-text">TOP</div>
          <button
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="맨 위로 이동"
          >
            <img src={topArrowIcon} alt="맨 위로" />
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
