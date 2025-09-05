import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { SwiperRef } from 'swiper/react';
import { useInView } from 'react-intersection-observer';
import Marquee from 'react-fast-marquee';
import GoogleMap from '../../components/map/GoogleMap';
// CSS 모듈 import 제거 - Material-UI styled components로 대체

// images
import aiImage from '../../assets/images/AI.jpg';
import itDImage from '../../assets/images/IT Developers.jpg';
import securityImage from '../../assets/images/Security.jpg';
import semiImage from '../../assets/images/Semiconductor.jpg';
import rndImage from '../../assets/images/R&D.jpg';

// icon
import copyrightIcon from '../../assets/icon/copyright.png';
import codeIcon from '../../assets/icon/code.png';
import dataIcon from '../../assets/icon/database.png';
import agileIcon from '../../assets/icon/agile.png';
import securityIcon from '../../assets/icon/security.png';


// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Styled Components
const ContainerWrapper = styled(Box)(({ theme }) => ({
  fontFamily: "'Noto Sans JP', sans-serif",
  backgroundColor: '#f2ebe1',
  '& *': {
    fontFamily: "'Noto Sans JP', sans-serif !important"
  }
}));

// News Button Styled Component
const NewsDetailsButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
  alignSelf: 'flex-start',
  color: '#cf4506',
  borderColor: '#cf4506',
  fontSize: '0.75rem',
  padding: '4px 12px',
  backgroundColor: 'white',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#cf4506',
    backgroundColor: '#cf4506',
    color: 'white'
  }
}));

// Solution Icon Typography Styled Component
const SolutionIconTypography = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  color: '#00136C',
  marginBottom: '24px'
}));

// Global Presence Title Styled Component
const GlobalPresenceTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '38px',
  color: '#00136C',
  fontWeight: 500,
  fontFamily: "'Noto Sans JP', sans-serif",
  fontSize: '3.0rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
    marginBottom: '25px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
    marginBottom: '12px'
  },
}));

// Footer Social Icon Styled Component
const FooterSocialIcon = styled('img')(({ theme }) => ({
  cursor: 'pointer',
  width: '20px',
  height: '20px',
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 0.8
  }
}));

// Global Presence Section Styled Components
const GlobalPresenceSection = styled(Box)(({ theme }) => ({
  padding: '80px 0',
  backgroundColor: '#f2ebe1',
  [theme.breakpoints.down('md')]: {
    padding: '60px 0'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '40px 0'
  }
}));

const CounterGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '48px',
  marginBottom: '48px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: '32px',
    marginBottom: '36px'
  },
  [theme.breakpoints.down('sm')]: {
    gap: '24px',
    marginBottom: '24px'
  }
}));

const CounterItem = styled(Box)(({ theme }) => ({
  textAlign: 'center'
}));

const CounterNumber = styled(Typography)(({ theme }) => ({
  color: '#00136C',
  fontWeight: 900,
  fontSize: '3rem',
  marginBottom: '16px',
  fontFamily: "'Noto Sans JP', sans-serif",
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
    marginBottom: '12px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
    marginBottom: '8px'
  },
}));

const CounterLabel = styled(Typography)(({ theme }) => ({
  color: '#666',
  fontWeight: 600,
  fontSize: '1.2rem',
  fontFamily: "'Noto Sans JP', sans-serif",
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem'
  },
}));

// Footer Styled Components
const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f2ebe1',
  color: 'white',
  padding: '60px 0 20px',
  [theme.breakpoints.down('md')]: {
    padding: '48px 0 16px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '36px 0 12px'
  }
}));

const FooterGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '48px',
  marginBottom: '40px',
  marginTop: '-50px',
  [theme.breakpoints.down('md')]: {
    gap: '32px',
    marginBottom: '32px'
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const FooterSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  color: '#4d4b4b',
  fontWeight: 700,
  fontSize: '1.2rem',
  marginBottom: '16px',
  fontFamily: "'Noto Sans JP', sans-serif",
  [theme.breakpoints.down('md')]: {
    fontSize: '1.1rem',
    marginBottom: '14px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    marginBottom: '12px'
  }
}));

const FooterLink = styled(Typography)(({ theme }) => ({
  color: '#4d4b4b',
  cursor: 'pointer',
  transition: 'color 0.3s ease',
  fontFamily: "'Noto Sans JP', sans-serif",
  width: 'fit-content',
  '&:hover': {
    color: 'rgb(182, 179, 179)'
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem'
  }
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  borderTop: '1px solid #d4c5b8',
  paddingTop: '20px',
  [theme.breakpoints.down('md')]: {
    paddingTop: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: '12px'
  }
}));

const FooterBottomContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'center'
  },
  [theme.breakpoints.down('sm')]: {
    gap: '12px'
  }
}));

const FooterCopyright = styled(Typography)(({ theme }) => ({
  color: '#4d4b4b',
  fontFamily: "'Noto Sans JP', sans-serif",
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem'
  }
}));

const FooterContact = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  }
}));

const FooterEmail = styled(Typography)(({ theme }) => ({
  color: '#4d4b4b',
  fontFamily: "'Noto Sans JP', sans-serif",
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem'
  }
}));

const HeroSection = styled(Box)(({ theme }) => ({
  height: '100vh',
  position: 'relative'
}));

const HeroSlide1 = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)',
  backgroundSize: '400% 400%',
  animation: 'gradientShift 8s ease infinite',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0,19,108,0.4), rgba(0,19,108,0.2))',
    zIndex: 1
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
    backgroundSize: '50px 50px',
    animation: 'float 20s linear infinite',
    zIndex: 1
  },
  '@keyframes gradientShift': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  },
  '@keyframes float': {
    '0%': { transform: 'translate(0, 0)' },
    '100%': { transform: 'translate(50px, 50px)' }
  }
}));

const HeroSlide2 = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  background: 'linear-gradient(-45deg, #ff8c42, #6b1f04, #35080c, #220501)',
  backgroundSize: '400% 400%',
  animation: 'gradientShift 8s ease infinite',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,140,66,0.3), rgba(255,107,53,0.1))',
    zIndex: 1
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
    backgroundSize: '50px 50px',
    animation: 'float 20s linear infinite',
    zIndex: 1
  }
}));

const HeroSlide3 = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  background: 'linear-gradient(-45deg,rgb(25, 105, 175),rgb(14, 178, 187),rgb(15, 134, 55),rgb(6, 179, 147))',
  backgroundSize: '400% 400%',
  animation: 'gradientShift 8s ease infinite',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(79,172,254,0.3), rgba(0,242,254,0.2))',
    zIndex: 1
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
    backgroundSize: '50px 50px',
    animation: 'float 20s linear infinite',
    zIndex: 1
  }
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  color: 'white',
  maxWidth: '800px',
  margin: '0 auto',
  padding: '0 20px'
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 900,
  marginBottom: '24px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
    marginBottom: '20px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
    marginBottom: '16px'
  }
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: '40px',
  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.2rem',
    marginBottom: '32px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    marginBottom: '24px'
  }
}));

const CustomSectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: '#00136C',
  fontWeight: 500,
  fontFamily: "'Noto Sans JP', sans-serif",
  fontSize: '3.5rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem'
  }
}));

// 추가 Styled Components
const SlideControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '40px',
  left: '40px',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.down('md')]: {
    bottom: '30px',
    left: '30px',
    gap: '18px'
  }
}));

const SlideIndicators = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    gap: '11px'
  }
}));

const SlideIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  width: isActive ? '24px' : '12px',
  height: '12px',
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: isActive ? 'white' : 'rgba(255,255,255,0.5)',
  transform: isActive ? 'scale(1.1)' : 'scale(1)',
  '&:hover': {
    backgroundColor: 'white',
    transform: 'scale(1.05)'
  },
  [theme.breakpoints.down('md')]: {
    width: isActive ? '22px' : '11px',
    height: '10px'
  }
}));

const SlideControlButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    gap: '12px'
  }
}));

const SlideButton = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'direction'
})<{ direction?: 'left' | 'right' }>(({ theme, direction }) => ({
  color: 'white',
  fontSize: '2rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  userSelect: 'none',
  '&:hover': {
    transform: direction === 'left' ? 'translateX(-4px)' : 'translateX(4px)',
    textShadow: '0 0 10px rgba(255,255,255,0.8)'
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem'
  }
}));

const PlayPauseButton = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '1.5rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  userSelect: 'none',
  '&:hover': {
    transform: 'scale(1.1)',
    textShadow: '0 0 10px rgba(255,255,255,0.8)'
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.2rem'
  }
}));

// News 섹션 Styled Components
const LatestNewsSection = styled(Box)(({ theme }) => ({
  padding: '70px 0',
  height: '430px',
  [theme.breakpoints.down('md')]: {
    padding: '50px 0',
    height: '380px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '40px 0',
    height: '350px'
  }
}));

const NewsMarquee = styled(Marquee)(({ theme }) => ({
  height: '430px',
  [theme.breakpoints.down('md')]: {
    height: '380px'
  },
  [theme.breakpoints.down('sm')]: {
    height: '350px'
  }
}));

const NewsCardWrapper = styled('div')(({ theme }) => ({
  marginRight: '24px',
  display: 'inline-block',
  [theme.breakpoints.down('md')]: {
    marginRight: '20px'
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: '16px'
  }
}));

const NewsCard = styled(Box)(({ theme }) => ({
  minWidth: '300px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
  },
  [theme.breakpoints.down('md')]: {
    minWidth: '250px'
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '200px'
  }
}));

const NewsImage = styled(Box)(({ theme }) => ({
  height: '200px',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: '180px'
  },
  [theme.breakpoints.down('sm')]: {
    height: '160px'
  }
}));

const NewsContent = styled(Box)(({ theme }) => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  height: '150px',
  [theme.breakpoints.down('md')]: {
    padding: '16px',
    height: '130px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '12px',
    height: '110px'
  }
}));

const NewsCategory = styled(Typography)(({ theme }) => ({
  color: '#cf4506',
  fontWeight: 600,
  fontSize: '0.8rem',
  marginBottom: '8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
    marginBottom: '6px'
  }
}));

const NewsTitle = styled(Typography)(({ theme }) => ({
  color: '#00136C',
  fontWeight: 600,
  fontSize: '1rem',
  lineHeight: 1.4,
  marginBottom: '12px',
  flex: 1,
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
    marginBottom: '10px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    marginBottom: '8px'
  }
}));

// Solutions 섹션 Styled Components
const SolutionsSection = styled(Box)(({ theme }) => ({
  padding: '20px 0'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '64px',
  color: '#00136C',
  fontWeight: 700,
  fontSize: '2.5rem',
  fontFamily: "'Noto Sans JP', sans-serif",
  [theme.breakpoints.down('md')]: {
    fontSize: '2.0rem',
    marginBottom: '36px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
    marginBottom: '24px'
  },
}));

const SolutionsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '32px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px'
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  }
}));

const SolutionCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: '32px',
  textAlign: 'center',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
  },
  [theme.breakpoints.down('md')]: {
    padding: '24px',
    borderRadius: '14px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
    borderRadius: '12px'
  }
}));

const SolutionIcon = styled('img')(({ theme }) => ({
  width: '64px',
  height: '64px',
  marginBottom: '24px',
  [theme.breakpoints.down('md')]: {
    width: '56px',
    height: '56px',
    marginBottom: '20px'
  },
  [theme.breakpoints.down('sm')]: {
    width: '48px',
    height: '48px',
    marginBottom: '16px'
  }
}));

const SolutionTitle = styled(Typography)(({ theme }) => ({
  color: '#00136C',
  fontWeight: 700,
  fontSize: '1.5rem',
  marginBottom: '16px',
  fontFamily: "'Noto Sans JP', sans-serif",
  [theme.breakpoints.down('md')]: {
    fontSize: '1.3rem',
    marginBottom: '14px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
    marginBottom: '12px'
  }
}));

const SolutionDescription = styled(Typography)(({ theme }) => ({
  color: '#666',
  lineHeight: 1.6,
  fontFamily: "'Noto Sans JP', sans-serif",
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
    lineHeight: 1.5
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    lineHeight: 1.4
  }
}));

const EnitecHome: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  // const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [counterValues, setCounterValues] = useState({
    companies: 0,
    developers: 0,
    satisfaction: 0
  });

  // 스크롤 함수
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 120; // 네비게이션 바 높이 + 여유 공간
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // 메인 항목 클릭 핸들러
  const handleMainItemClick = (itemLabel: string) => {
    if (itemLabel === "会社情報") {
      navigate('/company');
    } else if (itemLabel === "事業分野") {
      navigate('/business');
    } else if (itemLabel === "採用情報") {
      navigate('/recruitment');
    }
  };

  // 서브 항목 클릭 핸들러
  const handleSubItemClick = (subItem: string) => {
    if (subItem === "代表の一言") {
      navigate('/company');
      setTimeout(() => scrollToSection('ceo-message'), 100);
    } else if (subItem === "企業理念") {
      navigate('/company');
      setTimeout(() => scrollToSection('corporate-philosophy'), 100);
    } else if (subItem === "会社概要") {
      navigate('/company');
      setTimeout(() => scrollToSection('company-summary'), 100);
    } else if (subItem === "沿革") {
      navigate('/company');
      setTimeout(() => scrollToSection('company-history'), 100);
    } else if (subItem === "SI事業") {
      navigate('/business');
      setTimeout(() => scrollToSection('si-business'), 100);
    } else if (subItem === "ソリューション") {
      navigate('/business');
      setTimeout(() => scrollToSection('solutions'), 100);
    } else if (subItem === "人材像") {
      navigate('/recruitment');
      setTimeout(() => scrollToSection('ideal-candidate'), 100);
    } else if (subItem === "福利厚生") {
      navigate('/recruitment');
      setTimeout(() => scrollToSection('benefits'), 100);
    } else if (subItem === "採用案内") {
      navigate('/recruitment');
      setTimeout(() => scrollToSection('recruitment-info'), 100);
    }
  };

  const swiperRef = useRef<SwiperRef>(null);
  const prevSlideRef = useRef(0);

  // 카운터 애니메이션
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = {
        companies: 15000 / steps,
        developers: 27000000 / steps,
        satisfaction: 75 / steps
      };

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setCounterValues({
          companies: Math.round(stepValue.companies * currentStep),
          developers: Math.round(stepValue.developers * currentStep),
          satisfaction: Math.round((stepValue.satisfaction * currentStep) * 10) / 10
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [inView]);

  // 자동 재생 토글
  const toggleAutoplay = () => {
    try {
      if (swiperRef.current?.swiper?.autoplay) {
        if (isAutoplay) {
          swiperRef.current.swiper.autoplay.stop();
        } else {
          swiperRef.current.swiper.autoplay.start();
        }
        setIsAutoplay(!isAutoplay);
      }
    } catch (error) {
      console.warn('자동 재생 토글 처리 중 오류:', error);
    }
  };

  // 슬라이드 변경 핸들러
  const handleSlideChange = (swiper: { realIndex?: number }) => {
    try {
      if (swiper && typeof swiper.realIndex !== 'undefined') {
        const newSlide = swiper.realIndex;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const prevSlide = prevSlideRef.current;
        
        setCurrentSlide(newSlide);
        prevSlideRef.current = newSlide;
      }
    } catch (error) {
      console.warn('슬라이드 변경 처리 중 오류:', error);
    }
  };

  // Hero 슬라이드 데이터
  const heroSlides = [
    {
      id: 1,
      title: "Empowering visionary talents to change the world",
      subtitle: "世界を変える人材に力を与えます",
      backgroundClass: "slide1"
    },
    {
      id: 2,
      title: "Bridging the world through advanced AI technology",
      subtitle: "最先端のAI技術で世界とつながります",
      backgroundClass: "slide2"
    },
    {
      id: 3,
      title: "Your vision drives the future we create together",
      subtitle: "あなたのビジョンは、私たちが共に作る未来を導きます",
      backgroundClass: "slide3"
    }
  ];

  // 최신 뉴스 데이터
  const latestNews = [
    {
      id: 1,
      category: "AI",
      title: "AI時代、開発者の役割再定義。",
      thumbnail: aiImage
    },
    {
      id: 2,
      category: "IT",
      title: "IT人材の不足、未来を競争しよう！",
      thumbnail: itDImage,
    },
    {
      id: 3,
      category: "Security",
      title: "セキュリティ、開発者が守るべき価値！",
      thumbnail: securityImage
    },
    {
      id: 4,
      category: "semiconductor",
      title: "半導体革新、グローバルITの勢力図を揺さぶる！",
      thumbnail: semiImage
    },
    {
      id: 5,
      category: "R&D",
      title: "R&D投資、企業生存の必須条件",
      thumbnail: rndImage
    }
  ];

  // 솔루션 데이터
  const solutions = [
    {
      id: 1,
      title: "Full Stack",
      description: "企画、開発、QAまで最高の専門人材",
      icon: codeIcon
    },
    {
      id: 2,
      title: "Data Solutions",
      description: "体系的なデータ分析による最適なソリューション",
      icon: dataIcon
    },
    {
      id: 3,
      title: "Agile Process",
      description: "迅速かつ柔軟な開発プロセスで迅速に対応",
      icon: agileIcon
    },
    {
      id: 4,
      title: "Secure Systems",
      description: "徹底したセキュリティで安全なITインフラを提供",
      icon: securityIcon
    }
  ];

  return (
    <ContainerWrapper>
      {/* Language Switcher */}
      {/* Hero 섹션 */}
      <HeroSection>
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={false}
          pagination={false}
          autoplay={isAutoplay ? { delay: 5000 } : false}
          loop={true}
          effect="slide"
          speed={800}
          onSlideChange={handleSlideChange}
          style={{ height: '100%' }}
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              {slide.id === 1 ? (
                <HeroSlide1>
                  <Container maxWidth="xl">
                    <HeroContent>
                      <HeroTitle variant="h1">
                        {slide.title}
                      </HeroTitle>
                      <HeroSubtitle variant="h5">
                        {slide.subtitle}
                      </HeroSubtitle>
                    </HeroContent>
                  </Container>
                </HeroSlide1>
              ) : slide.id === 2 ? (
                <HeroSlide2>
                  <Container maxWidth="xl">
                    <HeroContent>
                      <HeroTitle variant="h1">
                        {slide.title}
                      </HeroTitle>
                      <HeroSubtitle variant="h5">
                        {slide.subtitle}
                      </HeroSubtitle>
                    </HeroContent>
                  </Container>
                </HeroSlide2>
              ) : (
                <HeroSlide3>
                  <Container maxWidth="xl">
                    <HeroContent>
                      <HeroTitle variant="h1">
                        {slide.title}
                      </HeroTitle>
                      <HeroSubtitle variant="h5">
                        {slide.subtitle}
                      </HeroSubtitle>
                    </HeroContent>
                  </Container>
                </HeroSlide3>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 고정된 슬라이드 컨트롤 */}
        <SlideControls>
          {/* 슬라이드 인디케이터 */}
          <SlideIndicators>
            {heroSlides.map((_, index) => (
              <SlideIndicator
                key={index}
                isActive={index === currentSlide}
                onClick={() => swiperRef.current?.swiper?.slideTo(index)}
              />
            ))}
          </SlideIndicators>
          
          {/* 슬라이드 컨트롤 버튼 */}
          <SlideControlButtons>
            <SlideButton
              direction="left"
              onClick={() => swiperRef.current?.swiper?.slidePrev()}
            >
             〈
            </SlideButton>
            
            {/* 재생/일시정지 버튼 */}
            <PlayPauseButton onClick={toggleAutoplay}>
              {isAutoplay ? '❚❚' : '▶'}
            </PlayPauseButton>
            
            <SlideButton
              direction="right"
              onClick={() => swiperRef.current?.swiper?.slideNext()}
            >
             〉
            </SlideButton>
          </SlideControlButtons>
        </SlideControls>
      </HeroSection>

      {/* Latest News 섹션 */}
      <LatestNewsSection>
        <Container maxWidth="xl">
          <CustomSectionTitle variant="h2">
            最新ニュース
          </CustomSectionTitle>
          
          <NewsMarquee
            speed={50}
            pauseOnHover={true}
            gradient={false}
          >
            {latestNews.map((news) => (
              <NewsCardWrapper key={news.id}>
                <NewsCard>
                  <NewsImage>
                    <img 
                      src={news.thumbnail} 
                      alt={news.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </NewsImage>
                  <NewsContent>
                    <NewsCategory variant="caption">
                      {news.category}
                    </NewsCategory>
                    <NewsTitle variant="h6">
                      {news.title}
                    </NewsTitle>
                    <NewsDetailsButton
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/news?newsId=${news.id}`)}
                    >
                      Details
                    </NewsDetailsButton>
                  </NewsContent>
                </NewsCard>
              </NewsCardWrapper>
            ))}
          </NewsMarquee>
        </Container>
      </LatestNewsSection>

      {/* Solutions 섹션 */}
      <SolutionsSection>
        <Container maxWidth="xl">
          <SectionTitle variant="h2">
            最高のチームが開発とビジネスをリードしていきます
          </SectionTitle>
          
          <SolutionsGrid>
            {solutions.map((solution) => (
              <SolutionCard key={solution.id}>
                {solution.id === 1 ? (
                  <SolutionIcon src={codeIcon} alt={solution.title} />
                ) : solution.id === 2 ? (
                  <SolutionIcon src={dataIcon} alt={solution.title} />
                ) : solution.id === 3 ? (
                  <SolutionIcon src={agileIcon} alt={solution.title} />
                ) : solution.id === 4 ? (
                  <SolutionIcon src={securityIcon} alt={solution.title} />
                ) : (
                  <SolutionIconTypography variant="h1">
                    {solution.icon}
                  </SolutionIconTypography>
                )}
                <SolutionTitle variant="h5">
                  {solution.title}
                </SolutionTitle>
                <SolutionDescription variant="body1">
                  {solution.description}
                </SolutionDescription>
              </SolutionCard>
            ))}
          </SolutionsGrid>
        </Container>
      </SolutionsSection>

      {/* Global Presence 섹션 */}
      <GlobalPresenceSection ref={ref}>
        <Container maxWidth="xl">
          <GlobalPresenceTitle variant="h2">
            SI Global Presence
          </GlobalPresenceTitle>
          
          <CounterGrid>
            <CounterItem>
              <CounterNumber variant="h1">
                {counterValues.companies.toLocaleString()}+
              </CounterNumber>
              <CounterLabel variant="h6">SI企業数</CounterLabel>
            </CounterItem>
            
            <CounterItem>
              <CounterNumber variant="h1">
                {(counterValues.developers / 1000000).toFixed(1)}M
              </CounterNumber>
              <CounterLabel variant="h6">開発者数</CounterLabel>
            </CounterItem>
            
            <CounterItem>
              <CounterNumber variant="h1">
                {counterValues.satisfaction.toFixed(1)}%
              </CounterNumber>
              <CounterLabel variant="h6">開発者満足度</CounterLabel>
            </CounterItem>
          </CounterGrid>
          
          <GoogleMap 
            title="Access"
            height="500px"
            address="エニテック株式会社"
            latitude = {35.674279067542734}
            longitude = {139.66539339810726}
            zoom={15}
            language="ja"
          />
        </Container>
      </GlobalPresenceSection>

      {/* Footer */}
      <Footer>
        <Container maxWidth="xl">
          <FooterGrid>
            <FooterSection>
              <FooterTitle variant="h6">
                会社情報
              </FooterTitle>
              <FooterLink 
                variant="body2" 
                onClick={() => handleSubItemClick("代表の一言")}
              >
                代表の一言
              </FooterLink>
              <FooterLink 
                variant="body2" 
                onClick={() => handleSubItemClick("企業理念")}
              >
                企業理念
              </FooterLink>
              <FooterLink 
                variant="body2" 
                onClick={() => handleSubItemClick("会社概要")}
              >
                会社概要
              </FooterLink>
              <FooterLink 
                variant="body2" 
                onClick={() => handleSubItemClick("沿革")}
              >
                沿革
              </FooterLink>
            </FooterSection>
            
            <FooterSection>
              <FooterTitle variant="h6">
                事業分野
              </FooterTitle>
              <FooterLink 
                variant="body2" 
                onClick={() => handleSubItemClick("SI事業")}
              >
                SI事業
              </FooterLink>
              <FooterLink 
                variant="body2" 
                onClick={() => handleSubItemClick("ソリューション")}
              >
                ソリューション
              </FooterLink>
            </FooterSection>
            
            <FooterSection>
              <FooterTitle variant="h6">
                採用情報
              </FooterTitle>
              <FooterLink 
                variant="body2" 
                onClick={() => handleSubItemClick("人材像")}
              >
                人材像
              </FooterLink>
              <FooterLink 
                variant="body2" 
                onClick={() => handleSubItemClick("福利厚生")}
              >
                福利厚生
              </FooterLink>
              <FooterLink 
                variant="body2" 
                onClick={() => handleSubItemClick("採用案内")}
              >
                採用案内
              </FooterLink>
            </FooterSection>
          </FooterGrid>
          
          <FooterBottom>
            <FooterBottomContent>
              <FooterCopyright variant="body2">
                © Enitec. All rights reserved.
              </FooterCopyright>
              
              <FooterContact>
                <FooterEmail variant="body2">
                  info@enitec.com
                </FooterEmail>
                <FooterSocialIcon 
                  src={copyrightIcon}
                  alt="저작권"
                  onClick={() => navigate('/copyright')}
                />
              </FooterContact>
            </FooterBottomContent>
          </FooterBottom>
        </Container>
      </Footer>
    </ContainerWrapper>
  );
};

export default EnitecHome;
