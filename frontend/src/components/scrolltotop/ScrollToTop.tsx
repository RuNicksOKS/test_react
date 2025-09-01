import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import topArrowIcon from '../../assets/icon/top_arrow.png';

// Styled Components
const ScrollToTopContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: '80px',
  right: '60px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 1000,
  opacity: 0,
  animation: 'fadeIn 0.3s ease forwards',
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  [theme.breakpoints.down('md')]: {
    bottom: '30px',
    right: '35px'
  },
  '&:hover .scroll-to-top-text': {
    color: '#a0a0a0'
  }
}));

const ScrollToTopText = styled(Typography)(({ theme }) => ({
  color: '#d3d3d3',
  fontSize: '12px',
  fontWeight: 500,
  marginBottom: '8px',
  letterSpacing: '1px',
  transition: 'color 0.3s ease',
  [theme.breakpoints.down('md')]: {
    fontSize: '11px',
    marginBottom: '6px'
  }
}));

const ScrollToTopButton = styled(Box)(({ theme }) => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: 'transparent',
  border: '2px solid #d3d3d3',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('md')]: {
    width: '45px',
    height: '45px'
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    borderColor: '#a0a0a0',
    background: 'rgba(255, 255, 255, 0.1)',
    '& img': {
      animation: 'bounce 1s infinite'
    }
  },
  '&:active': {
    transform: 'translateY(-1px)'
  },
  '& img': {
    width: '20px',
    height: '20px',
    filter: 'brightness(0) invert(0.6)',
    transition: 'transform 0.2s ease',
    [theme.breakpoints.down('md')]: {
      width: '18px',
      height: '18px'
    }
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0)'
    },
    '40%': {
      transform: 'translateY(-8px)'
    },
    '60%': {
      transform: 'translateY(-4px)'
    }
  }
}));

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
        <ScrollToTopContainer>
          <ScrollToTopText className="scroll-to-top-text">TOP</ScrollToTopText>
          <ScrollToTopButton
            onClick={scrollToTop}
            aria-label="맨 위로 이동"
          >
            <img src={topArrowIcon} alt="맨 위로" />
          </ScrollToTopButton>
        </ScrollToTopContainer>
      )}
    </>
  );
};

export default ScrollToTop;
