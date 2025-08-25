import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './Recruitment.module.css';

// Image
import passionImage from '../../assets/images/passion.png';
import futureOrientedImage from '../../assets/images/Future-oriented.png';
import professionalImage from '../../assets/images/Professional.png';
import innovationImage from '../../assets/images/Innovation.png';
import responsibilityImage from '../../assets/images/Responsibility.png';
import benefitsImage from '../../assets/images/Benefits.png';

// Icon
import peopleIcon from '../../assets/icon/people.png';

// Styled Components
const EnglishTitle = styled(Typography)(({ theme }) => ({
  fontSize: '4.2rem',
  fontWeight: 700,
  color: '#abacb4',
  textAlign: 'center',
  marginTop: '-10px',
  marginBottom: '20px',
  opacity: 0,
  transform: 'translateY(50px)',
  transition: 'all 0.8s ease-out',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  fontFamily: '"Noto Sans", sans-serif',
  lineHeight: 1,
  wordSpacing: '0.3em',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
    marginTop: '-5px',
    marginBottom: '15px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
    marginTop: '0px',
    marginBottom: '10px',
    wordSpacing: '0.1em'
  }
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 900,
  color: '#00136C',
  marginTop: '-50px',
  marginBottom: '100px',
  letterSpacing: '-0.02em',
  textAlign: 'center',
  opacity: 0,
  transform: 'translateY(50px)',
  transition: 'all 0.8s ease-out',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '2.8rem',
    marginTop: '-30px',
    marginBottom: '70px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
    marginTop: '-20px',
    marginBottom: '50px'
  }
}));

const SectionBox = styled(Box)(({ theme }) => ({
  marginBottom: '80px',
  background: 'white',
  borderRadius: '12px',
  padding: '50px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  opacity: 0,
  transform: 'translateY(50px)',
  transition: 'all 0.8s ease-out'
}));

const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '20px',
  marginBottom: '24px',
  borderBottom: '3px solid #db9615',
  paddingBottom: '12px',
  
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px'
  },
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px'
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: '#00136C',
  margin: 0,
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1.8rem'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem'
  }
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 500,
  color: '#db9615',
  margin: 0,
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1.1rem'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem'
  }
}));

// 인재상 섹션 스타일
const TalentSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: '60px 0',
  marginBottom: '-100px'
}));

const CircleCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isAnimated'
})<{ isAnimated?: boolean }>(({ theme, isAnimated }) => ({
  position: 'relative',
  width: '240px',
  height: '240px',
  borderRadius: '50%',
  background: 'rgba(96, 124, 214, 0.8)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: 'white',
  padding: '30px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 1,
  opacity: 1,
  transform: 'scale(1) translateX(0)',
  
  '&.left-circle': {
    opacity: isAnimated ? 1 : 0,
    transform: isAnimated ? 'scale(1) translateX(-250px)' : 'scale(1) translateX(0)',
  },
  
  '&.right-circle': {
    opacity: isAnimated ? 1 : 0,
    transform: isAnimated ? 'scale(1) translateX(250px)' : 'scale(1) translateX(0)',
  },
  
  [theme.breakpoints.down('md')]: {
    width: '200px',
    height: '200px',
    padding: '25px',
    '&.left-circle': {
      opacity: isAnimated ? 1 : 0,
      transform: isAnimated ? 'scale(1) translateX(-65px)' : 'scale(1) translateX(0)',
    },
    '&.right-circle': {
      opacity: isAnimated ? 1 : 0,
      transform: isAnimated ? 'scale(1) translateX(65px)' : 'scale(1) translateX(0)',
    }
  },
  
  [theme.breakpoints.down('sm')]: {
    width: '160px',
    height: '160px',
    padding: '20px',
    '&.left-circle': {
      opacity: isAnimated ? 1 : 0,
      transform: isAnimated ? 'scale(1) translateX(-50px)' : 'scale(1) translateX(0)',
    },
    '&.right-circle': {
      opacity: isAnimated ? 1 : 0,
      transform: isAnimated ? 'scale(1) translateX(50px)' : 'scale(1) translateX(0)',
    }
  }
}));

const CircleTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  fontWeight: 700,
  marginBottom: '15px',
  lineHeight: 1.2,
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1.2rem',
    marginBottom: '12px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    marginBottom: '10px'
  }
}));

const CircleDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  lineHeight: 1.6,
  opacity: 0.95,
  
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem'
  }
}));

const ValuesSection = styled(Box)(({ theme }) => ({
  padding: '40px 0',
  background: 'white',
  borderRadius: '15px',
  marginTop: '40px'
}));

const ValuesTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 600,
  color: '#333',
  textAlign: 'center',
  marginBottom: '40px',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1.6rem',
    marginBottom: '30px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.4rem',
    marginBottom: '25px'
  }
}));

const TalentCard = styled(Box)(({ theme }) => ({
  background: 'white',
  borderRadius: '12px',
  padding: '40px 25px',
  textAlign: 'center',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1px solid #f0f0f0',
  minWidth: '200px',
  maxWidth: '220px',
  
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)'
  },
  
  [theme.breakpoints.down('md')]: {
    minWidth: '180px',
    maxWidth: '200px'
  },
  
  [theme.breakpoints.down('sm')]: {
    minWidth: '160px',
    maxWidth: '180px'
  }
}));

const TalentIcon = styled('img')(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: '#f8f9fa',
  border: '2px solid #e9ecef',
  objectFit: 'contain',
  padding: '15px',
  marginBottom: '25px',
  
  [theme.breakpoints.down('md')]: {
    width: '70px',
    height: '70px',
    padding: '12px',
    marginBottom: '20px'
  },
  
  [theme.breakpoints.down('sm')]: {
    width: '60px',
    height: '60px',
    padding: '10px',
    marginBottom: '18px'
  }
}));

const TalentTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 700,
  color: '#db9615',
  marginBottom: '15px',
  lineHeight: 1.2,
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1.2rem',
    marginBottom: '12px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
    marginBottom: '10px'
  }
}));

const TalentDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 400,
  color: '#333',
  lineHeight: 1.6,
  
  [theme.breakpoints.down('md')]: {
    fontSize: '0.95rem'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem'
  }
}));

// 복리후생 시스템 스타일
const WelfareSystemContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '700px',
  padding: '20px 20px',
  
  [theme.breakpoints.down('md')]: {
    minHeight: '550px',
    padding: '15px 15px'
  },
  
  [theme.breakpoints.down('sm')]: {
    minHeight: 'auto',
    padding: '10px 10px',
    flexDirection: 'column',
    gap: '20px',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '130px',
      left: '50%',
      width: '2px',
      height: 'calc(100% - 180px)',
      background: 'linear-gradient(to bottom, #bdc3c7, #ecf0f1)',
      transform: 'translateX(-50%)',
      zIndex: 1
    }
  },
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '20px',
    padding: '10px 5px',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '130px',
      left: '50%',
      width: '2px',
      height: 'calc(100% - 180px)',
      background: 'linear-gradient(to bottom, #bdc3c7, #ecf0f1)',
      transform: 'translateX(-50%)',
      zIndex: 1
    }
  }
}));

const CentralCircle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  backgroundColor: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  zIndex: 10,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    right: '-10px',
    bottom: '-10px',
    borderRadius: '50%',
    backgroundImage: `url(${benefitsImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -1
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-20px',
    left: '-20px',
    right: '-20px',
    bottom: '-20px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #bdc3c7,rgb(167, 173, 164))',
    zIndex: -2
  },
  
  [theme.breakpoints.down('md')]: {
    width: '160px',
    height: '160px'
  },
  
  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    transform: 'none',
    width: '120px',
    height: '120px',
    margin: '0 auto 20px auto'
  },
  
  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    transform: 'none',
    width: '90px',
    height: '90px',
    margin: '0 auto 20px auto'
  }
}));

const CentralTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 700,
  textAlign: 'center',
  lineHeight: 1.2,
  color: 'white',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  padding: '8px 16px',
  borderRadius: '20px',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
    padding: '6px 12px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: '5px 10px'
  }
}));

const WelfareCategory = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isAnimated' && prop !== 'animationDelay'
})<{ isAnimated?: boolean; animationDelay?: number }>(({ theme, isAnimated, animationDelay = 0 }) => ({
  position: 'absolute',
  width: '220px',
  background: 'white',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e0e0e0',
  zIndex: 5,
  opacity: isAnimated ? 1 : 0,
  transform: isAnimated ? 'scale(1) translate(0, 0)' : 'scale(0.3) translate(0, 0)',
  transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${animationDelay}ms`,
  
  [theme.breakpoints.down('md')]: {
    width: '180px',
    padding: '15px'
  },
  
  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    width: '100%',
    padding: '20px',
    marginBottom: '10px',
    opacity: 1,
    transform: 'scale(1) translate(0, 0)',
    transition: 'none',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-8px',
      left: '50%',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: '#316b91',
      border: '2px solid white',
      transform: 'translateX(-50%)',
      zIndex: 2,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)'
    }
  },
  
  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    width: '100%',
    padding: '20px',
    marginBottom: '10px',
    opacity: 1,
    transform: 'scale(1) translate(0, 0)',
    transition: 'none'
  }
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 700,
  color: '#2c3e50',
  marginBottom: '12px',
  textAlign: 'center',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
    marginBottom: '10px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    marginBottom: '8px'
  }
}));

const CategoryList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
}));

const CategoryItem = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  color: '#34495e',
  lineHeight: 1.4,
  position: 'relative',
  paddingLeft: '12px',
  
  '&::before': {
    content: '"•"',
    position: 'absolute',
    left: 0,
    color: '#3498db'
  },
  
  [theme.breakpoints.down('md')]: {
    fontSize: '0.8rem',
    paddingLeft: '10px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    paddingLeft: '8px'
  }
}));



const StyledContainer = styled(Container)(({ theme }) => ({
  fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
  '& *': {
    fontFamily: 'inherit !important'
  }
}));

const StyledBox = styled(Box)(({ theme }) => ({
  fontFamily: 'inherit !important'
}));

const DownloadButton = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  padding: '15px 30px',
  backgroundColor: '#db9615',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(219, 150, 21, 0.3)',
  width: '280px',
  justifyContent: 'center',
  boxSizing: 'border-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  
  '&:hover': {
    backgroundColor: '#c0850f',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(219, 150, 21, 0.4)'
  },
  
  [theme.breakpoints.down('md')]: {
    width: '100%',
    justifyContent: 'center',
    padding: '12px 20px',
    fontSize: '0.9rem',
    whiteSpace: 'normal'
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: '10px 15px',
    fontSize: '0.85rem'
  }
}));

const DownloadIcon = styled(Box)(({ theme }) => ({
  width: '20px',
  height: '20px',
  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'white\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z\'/%3E%3C/svg%3E")',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  
  [theme.breakpoints.down('md')]: {
    width: '18px',
    height: '18px'
  },
  
  [theme.breakpoints.down('sm')]: {
    width: '16px',
    height: '16px'
  }
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap',
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    width: '100%',
    maxWidth: '500px',
    padding: '0 15px'
  },
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    maxWidth: '400px',
    padding: '0 10px'
  }
}));

const DownloadSection = styled(Box)(({ theme }) => ({
  marginTop: '60px',
  padding: '40px',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  border: '1px solid #e9ecef',
  textAlign: 'center',
  
  [theme.breakpoints.down('sm')]: {
    padding: '25px 15px'
  }
}));

const DownloadNote = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: '#888',
  marginTop: '30px',
  fontStyle: 'italic',
  textAlign: 'left',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 'fit-content',
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem'
  }
}));

const ProcessCircle = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  backgroundColor: '#db9615',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: 700,
  fontSize: '1.1rem',
  textAlign: 'center',
  flexShrink: 0,
  
  [theme.breakpoints.down('sm')]: {
    width: '100px',
    height: '100px',
    fontSize: '1rem',
    marginBottom: '20px'
  }
}));

const RecruitmentTable = styled(Box)(({ theme }) => ({
  border: '1px solid #ddd',
  borderRadius: '4px',
  overflow: 'hidden',
  marginBottom: '40px'
}));

const TableRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 3fr',
  
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr'
  }
}));

const TableHeader = styled(Box)(({ theme }) => ({
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #ddd',
  display: 'flex',
  alignItems: 'center',
  
  [theme.breakpoints.down('sm')]: {
    borderBottom: 'none',
    borderRight: '1px solid #ddd'
  }
}));

const TableContent = styled(Box)(({ theme }) => ({
  padding: '20px',
  borderBottom: '1px solid #ddd',
  
  [theme.breakpoints.down('sm')]: {
    borderBottom: '1px solid #ddd'
  }
}));

const TableContentLast = styled(Box)(({ theme }) => ({
  padding: '20px'
}));

const RecruitmentTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#00136C',
  marginBottom: '30px',
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem'
  }
}));

const Recruitment: React.FC = () => {
  const englishTitleRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const [isCircleAnimated, setIsCircleAnimated] = useState(false);
  const [isWelfareAnimated, setIsWelfareAnimated] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target instanceof HTMLElement) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        }
      });
    }, observerOptions);

    const elements = [
      englishTitleRef.current,
      mainTitleRef.current,
      section1Ref.current,
      section2Ref.current,
      section3Ref.current
    ].filter(Boolean);

    elements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // 원형 애니메이션 효과
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCircleAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 복리후생 애니메이션 효과
  useEffect(() => {
    const welfareObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsWelfareAnimated(true);
          }, 300);
        }
      });
    }, { threshold: 0.3 });

    if (section2Ref.current) {
      welfareObserver.observe(section2Ref.current);
    }

    return () => {
      if (section2Ref.current) {
        welfareObserver.unobserve(section2Ref.current);
      }
    };
  }, []);

  const talentProfiles = [
    {
      image: passionImage,
      title: '情熱',
      description: '仕事と目標に対して熱い情熱を持つ人材'
    },
    {
      image: futureOrientedImage,
      title: '未来志向',
      description: '綿密な計画と積極的なマインドで未来をリードする人材'
    },
    {
      image: professionalImage,
      title: '専門',
      description: '自分の能力を発揮し、専門家へと成長する人材'
    },
    {
      image: innovationImage,
      title: '革新',
      description: '時代の変化と革新に迅速に対応する人材'
    },
    {
      image: responsibilityImage,
      title: '責任',
      description: '与えられた業務に最善を尽くし、積極的に問題を解決する人材'
    }
  ];

  return (
    <div className={styles.container}>
      <StyledContainer maxWidth="lg">
        <StyledBox className={styles.content}>
          <EnglishTitle variant="h6" ref={englishTitleRef}>
            Recruitment
          </EnglishTitle>
          <MainTitle variant="h1" ref={mainTitleRef}>
            採用情報
          </MainTitle>
          
          <SectionBox ref={section1Ref} id="ideal-candidate">
            <TitleContainer>
              <SectionTitle variant="h3">
                人材像
              </SectionTitle>
              <SectionSubtitle variant="h4">
                Ideal Candidate
              </SectionSubtitle>
            </TitleContainer>
            
            <TalentSection>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                marginBottom: '40px',
                position: 'relative',
                zIndex: 1,
                height: '240px',
                '@media (max-width: 900px)': {
                  display: 'none'
                },
                '@media (max-width: 600px)': {
                  display: 'none'
                }
              }}>
                <Box sx={{ 
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '240px'
                }}>
                  {/* 중간 원형 (항상 보임) */}
                  <CircleCard isAnimated={isCircleAnimated}>
                    <CircleTitle>変化と実行</CircleTitle>
                    <Box sx={{ width: '60px', height: '2px', background: 'white', margin: '10px 0' }} />
                    <CircleDescription>
                      絶えず悩み<br />
                      変化し、実行する人
                    </CircleDescription>
                  </CircleCard>
                  
                  {/* 왼쪽 원형 (애니메이션 시 나타남) */}
                  <Box sx={{ 
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2
                  }}>
                    <CircleCard isAnimated={isCircleAnimated} className="left-circle">
                      <CircleTitle>挑戦と情熱</CircleTitle>
                      <Box sx={{ width: '60px', height: '2px', background: 'white', margin: '10px 0' }} />
                      <CircleDescription>
                        挑戦と情熱を基盤に<br />
                        能動的、自主的に働く人
                      </CircleDescription>
                    </CircleCard>
                  </Box>
                  
                  {/* 오른쪽 원형 (애니메이션 시 나타남) */}
                  <Box sx={{ 
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2
                  }}>
                    <CircleCard isAnimated={isCircleAnimated} className="right-circle">
                      <CircleTitle>配慮と尊重</CircleTitle>
                      <Box sx={{ width: '60px', height: '2px', background: 'white', margin: '10px 0' }} />
                      <CircleDescription>
                        温かい心で<br />
                        幸せな職場を作る人
                      </CircleDescription>
                    </CircleCard>
                  </Box>
                </Box>
              </Box>
              
              <ValuesSection>
                <ValuesTitle>
                  エニテックはこのような人材と共に歩んでいます。
                </ValuesTitle>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'stretch',
                  gap: '30px',
                  flexWrap: 'wrap'
                }}>
                  {talentProfiles.map((profile, index) => (
                    <TalentCard key={index}>
                      <TalentIcon src={profile.image} alt={profile.title} />
                      <TalentTitle>
                        {profile.title}
                      </TalentTitle>
                      <TalentDescription>
                        {profile.description}
                      </TalentDescription>
                    </TalentCard>
                  ))}
                </Box>
              </ValuesSection>
            </TalentSection>
          </SectionBox>

          <SectionBox ref={section2Ref} id="benefits">
            <TitleContainer>
              <SectionTitle variant="h3">
                福利厚生
              </SectionTitle>
              <SectionSubtitle variant="h4">
                Benefits
              </SectionSubtitle>
            </TitleContainer>
            
            <WelfareSystemContainer>
              {/* 중앙 원형 */}
              <CentralCircle sx={{
                '@media (max-width: 600px)': {
                  order: 0
                }
              }}>
                <CentralTitle>福利厚生制度</CentralTitle>
              </CentralCircle>
              
              {/* 복리후생 카테고리들 - 데스크톱 원형 배치 */}
              <WelfareCategory 
                isAnimated={isWelfareAnimated}
                animationDelay={200}
                sx={{ 
                  top: '30%', 
                  left: '17%', 
                  transform: 'translateX(-50%)',
                  '@media (max-width: 600px)': {
                    position: 'relative',
                    top: 'auto',
                    left: 'auto',
                    transform: 'none',
                    order: 1
                  }
                }}
              >
                <CategoryTitle>勤務時間・休日</CategoryTitle>
                <CategoryList>
                  <CategoryItem>勤務時間：平日 9:00 ~ 18:00</CategoryItem>
                  <CategoryItem>休日：完全週休2日制、祝日、年末年始、夏期休暇（3日）</CategoryItem>
                </CategoryList>
              </WelfareCategory>
              
              <WelfareCategory 
                isAnimated={isWelfareAnimated}
                animationDelay={400}
                sx={{ 
                  top: '5%', 
                  right: '50%', 
                  transform: 'translateX(50%)',
                  '@media (max-width: 600px)': {
                    position: 'relative',
                    top: 'auto',
                    right: 'auto',
                    transform: 'none',
                    order: 3
                  }
                }}
              >
                <CategoryTitle>休暇制度</CategoryTitle>
                <CategoryList>
                  <CategoryItem>年次有給休暇</CategoryItem>
                  <CategoryItem>慶弔休暇</CategoryItem>
                  <CategoryItem>産前産後休暇</CategoryItem>
                  <CategoryItem>特別休暇</CategoryItem>
                </CategoryList>
              </WelfareCategory>
              
              <WelfareCategory 
                isAnimated={isWelfareAnimated}
                animationDelay={600}
                sx={{ 
                  top: '40%', 
                  right: '5%', 
                  transform: 'translateY(-50%)',
                  '@media (max-width: 600px)': {
                    position: 'relative',
                    top: 'auto',
                    right: 'auto',
                    transform: 'none',
                    order: 4
                  }
                }}
              >
                <CategoryTitle>給与・評価制度</CategoryTitle>
                <CategoryList>
                  <CategoryItem>昇給：年2回</CategoryItem>
                  <CategoryItem>賞与：年2回（年末成果給あり）</CategoryItem>
                  <CategoryItem>経験・スキルに応じた優遇あり</CategoryItem>
                </CategoryList>
              </WelfareCategory>
              
              <WelfareCategory 
                isAnimated={isWelfareAnimated}
                animationDelay={800}
                sx={{ 
                  bottom: '15%', 
                  right: '25%', 
                  transform: 'translateX(50%)',
                  '@media (max-width: 600px)': {
                    position: 'relative',
                    bottom: 'auto',
                    right: 'auto',
                    transform: 'none',
                    order: 5
                  }
                }}
              >
                <CategoryTitle>手当・支給</CategoryTitle>
                <CategoryList>
                  <CategoryItem>通勤費：実費支給</CategoryItem>
                  <CategoryItem>住宅補助手当</CategoryItem>
                </CategoryList>
              </WelfareCategory>
              
              <WelfareCategory 
                isAnimated={isWelfareAnimated}
                animationDelay={1000}
                sx={{ 
                  bottom: '15%', 
                  left: '25%', 
                  transform: 'translateX(-50%)',
                  '@media (max-width: 600px)': {
                    position: 'relative',
                    bottom: 'auto',
                    left: 'auto',
                    transform: 'none',
                    order: 7
                  }
                }}
              >
                <CategoryTitle>福利厚生・医療</CategoryTitle>
                <CategoryList>
                  <CategoryItem>社会保険加入</CategoryItem>
                  <CategoryItem>年1回 定期健康診断</CategoryItem>
                </CategoryList>
              </WelfareCategory>              
              
            </WelfareSystemContainer>
          </SectionBox>

          <SectionBox ref={section3Ref} id="recruitment-info">
            <TitleContainer>
              <SectionTitle variant="h3">
                採用案内
              </SectionTitle>
              <SectionSubtitle variant="h4">
                Recruitment Guide
              </SectionSubtitle>
            </TitleContainer>
            
            {/* 신입사원 상시채용 */}
            <Box sx={{ marginBottom: '60px' }}>
              <RecruitmentTitle variant="h4">
                新卒者 随時採用
              </RecruitmentTitle>
              
              {/* 채용분야와 응시자격 테이블 */}
              <RecruitmentTable>
                {/* 채용분야 */}
                <TableRow>
                  <TableHeader>
                    <Typography sx={{ 
                      fontWeight: 700, 
                      color: '#00136C',
                      fontSize: '1.1rem'
                    }}>
                      採用分野
                    </Typography>
                  </TableHeader>
                  <TableContent>
                    <Typography sx={{ marginBottom: '8px', fontSize: '1rem' }}>
                      ・Application Engineer（各種アプリケーション設計・開発）
                    </Typography>
                    <Typography sx={{ marginBottom: '8px', fontSize: '1rem' }}>
                      ・Web Application Engineer（Web関連システム開発）
                    </Typography>
                  </TableContent>
                </TableRow>
                
                {/* 응시자격 */}
                <TableRow>
                  <TableHeader>
                    <Typography sx={{ 
                      fontWeight: 700, 
                      color: '#00136C',
                      fontSize: '1.1rem'
                    }}>
                      受験資格
                    </Typography>
                  </TableHeader>
                  <TableContentLast>
                    <Typography sx={{ fontSize: '1rem' }}>
                      ・大学・大学院・専門学校を卒業の方
                    </Typography>
                    <Typography sx={{ fontSize: '1rem' }}>
                      ・プログラミングなどIT分野に強い関心をお持ちの方
                    </Typography>
                    <Typography sx={{ fontSize: '1rem' }}>
                      ・チームワークを重視し、コミュニケーション能力を発揮できる方
                    </Typography>
                  </TableContentLast>
                </TableRow>
              </RecruitmentTable>

              {/* 채용절차 */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '20px',
                '@media (max-width: 600px)': {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '15px',
                  position: 'relative'
                }
              }}>
                <ProcessCircle>
                  採用手続き
                </ProcessCircle>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  flex: 1,
                  position: 'relative',
                  '@media (max-width: 600px)': {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    paddingLeft: '50px',
                    position: 'relative'
                  }
                }}>
                  {/* 연결선 */}
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    right: '0',
                    height: '2px',
                    background: 'linear-gradient(to right, #ddd, #eee)',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    '@media (max-width: 600px)': {
                      display: 'none'
                    }
                  }} />
                  
                  {/* 모바일 세로선 */}
                  <Box sx={{
                    display: 'none',
                    '@media (max-width: 600px)': {
                      display: 'block',
                      position: 'absolute',
                      left: '32px',
                      top: '10px',
                      bottom: '20px',
                      width: '2px',
                      background: 'linear-gradient(to bottom, #ddd, #eee)',
                      zIndex: 1
                    }
                  }} />
                  
                  {[
                    { step: 'STEP 1', title: '書類受付', subtitle: '' },
                    { step: 'STEP 2', title: '1次面接', subtitle: '' },
                    { step: 'STEP 3', title: '採用検診', subtitle: '' },
                    { step: 'STEP 4', title: '入社', subtitle: '' }
                  ].map((item, index) => (
                    <Box key={index} sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      flex: 1,
                      position: 'relative',
                      zIndex: 2,
                      '@media (max-width: 600px)': {
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: '15px',
                        width: '100%',
                        position: 'relative'
                      }
                    }}>
                      <Typography sx={{ 
                        fontSize: '0.8rem', 
                        color: '#db9615', 
                        fontWeight: 600,
                        marginBottom: '5px',
                        '@media (max-width: 600px)': {
                          marginBottom: '0',
                          marginRight: '10px',
                          minWidth: '60px'
                        }
                      }}>
                        {item.step}
                      </Typography>
                      <Box sx={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#db9615',
                        marginBottom: '5px',
                        border: '2px solid white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        '@media (max-width: 600px)': {
                          position: 'absolute',
                          left: '-25px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginBottom: '0',
                          marginRight: '0',
                          zIndex: 2
                        }
                      }} />
                      <Typography sx={{ 
                        fontSize: '0.9rem', 
                        fontWeight: 600,
                        textAlign: 'center',
                        marginBottom: '2px',
                        marginTop: '15px',
                        '@media (max-width: 600px)': {
                          textAlign: 'left',
                          marginBottom: '0',
                          marginTop: '0',
                          marginRight: '10px'
                        }
                      }}>
                        {item.title}
                      </Typography>
                      {item.subtitle && (
                        <Typography sx={{ 
                          fontSize: '0.8rem', 
                          color: '#666',
                          textAlign: 'center',
                          '@media (max-width: 600px)': {
                            textAlign: 'left'
                          }
                        }}>
                          {item.subtitle}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            
            {/* 경력사원 수시채용 */}
            <Box sx={{ marginBottom: '60px' }}>
              <RecruitmentTitle variant="h4">
                経歴者 随時採用
              </RecruitmentTitle>
              
              {/* 채용분야와 응시자격 테이블 */}
              <RecruitmentTable>
                {/* 채용분야 */}
                <TableRow>
                  <TableHeader>
                    <Typography sx={{ 
                      fontWeight: 700, 
                      color: '#00136C',
                      fontSize: '1.1rem'
                    }}>
                      採用分野
                    </Typography>
                  </TableHeader>
                  <TableContent>
                    <Typography sx={{ marginBottom: '8px', fontSize: '1rem' }}>
                      ・Project Leader / Group Leader（システム構築）
                    </Typography>
                    <Typography sx={{ marginBottom: '8px', fontSize: '1rem' }}>
                      ・System, Network, Application, Web Engineer（基幹業務システム企画・設計・構築）
                    </Typography>
                    <Typography sx={{ marginBottom: '8px', fontSize: '1rem' }}>
                      ・半導体関連 System Engineer（半導体製造装置ソフトウェア開発）
                    </Typography>
                    <Typography sx={{ marginBottom: '8px', fontSize: '1rem' }}>
                      ・ERP Consultant（SAP等ERPシステム導入・コンサルティング）
                    </Typography>
                  </TableContent>
                </TableRow>
                
                {/* 응시자격 */}
                <TableRow>
                  <TableHeader>
                    <Typography sx={{ 
                      fontWeight: 700, 
                      color: '#00136C',
                      fontSize: '1.1rem'
                    }}>
                      受験資格
                    </Typography>
                  </TableHeader>
                  <TableContentLast>
                    <Typography sx={{ fontSize: '1rem' }}>
                      ・システム構築・開発プロジェクトリーダー経験者
                    </Typography>
                    <Typography sx={{ fontSize: '1rem' }}>
                      ・各職種に関連する専門知識・実務経験をお持ちの方
                    </Typography>
                    <Typography sx={{ fontSize: '1rem' }}>
                      ・プロジェクト推進能力、コミュニケーション力のある方
                    </Typography>
                  </TableContentLast>
                </TableRow>
              </RecruitmentTable>
              
              {/* 채용절차 */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '20px',
                '@media (max-width: 600px)': {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '15px',
                  position: 'relative'
                }
              }}>
                <ProcessCircle>
                  採用手続き
                </ProcessCircle>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  flex: 1,
                  position: 'relative',
                  '@media (max-width: 600px)': {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    paddingLeft: '50px',
                    position: 'relative'
                  }
                }}>
                  {/* 연결선 */}
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    right: '0',
                    height: '2px',
                    background: 'linear-gradient(to right, #ddd, #eee)',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    '@media (max-width: 600px)': {
                      display: 'none'
                    }
                  }} />
                  
                  {/* 모바일 세로선 */}
                  <Box sx={{
                    display: 'none',
                    '@media (max-width: 600px)': {
                      display: 'block',
                      position: 'absolute',
                      left: '32px',
                      top: '10px',
                      bottom: '20px',
                      width: '2px',
                      background: 'linear-gradient(to bottom, #ddd, #eee)',
                      zIndex: 1
                    }
                  }} />
                  
                  {[
                    { step: 'STEP 1', title: '書類受付', subtitle: '' },
                    { step: 'STEP 2', title: '1次面接', subtitle: '' },
                    { step: 'STEP 3', title: '処遇協議', subtitle: '' },
                    { step: 'STEP 4', title: '採用検診', subtitle: '' },
                    { step: 'STEP 5', title: '入社', subtitle: '' }
                  ].map((item, index) => (
                    <Box key={index} sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      flex: 1,
                      position: 'relative',
                      zIndex: 2,
                      '@media (max-width: 600px)': {
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: '15px',
                        width: '100%',
                        position: 'relative'
                      }
                    }}>
                      <Typography sx={{ 
                        fontSize: '0.8rem', 
                        color: '#db9615', 
                        fontWeight: 600,
                        marginBottom: '5px',
                        '@media (max-width: 600px)': {
                          marginBottom: '0',
                          marginRight: '10px',
                          minWidth: '60px'
                        }
                      }}>
                        {item.step}
                      </Typography>
                      <Box sx={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#db9615',
                        marginBottom: '5px',
                        border: '2px solid white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        '@media (max-width: 600px)': {
                          position: 'absolute',
                          left: '-25px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginBottom: '0',
                          marginRight: '0',
                          zIndex: 2
                        }
                      }} />
                      <Typography sx={{ 
                        fontSize: '0.9rem', 
                        fontWeight: 600,
                        textAlign: 'center',
                        marginBottom: '2px',
                        marginTop: '15px',
                        '@media (max-width: 600px)': {
                          textAlign: 'left',
                          marginBottom: '0',
                          marginTop: '0',
                          marginRight: '10px'
                        }
                      }}>
                        {item.title}
                      </Typography>
                      {item.subtitle && (
                        <Typography sx={{ 
                          fontSize: '0.8rem', 
                          color: '#666',
                          textAlign: 'center',
                          '@media (max-width: 600px)': {
                            textAlign: 'left'
                          }
                        }}>
                          {item.subtitle}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* 지원서류 다운로드 섹션 */}
            <DownloadSection>
              <Typography variant="h5" sx={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#00136C', 
                marginBottom: '20px'
              }}>
                支援書類
                ダウンロード
              </Typography>
              
              <Typography sx={{ 
                fontSize: '1rem', 
                color: '#666', 
                marginBottom: '30px',
                lineHeight: 1.6
              }}>
                採用応募に必要な書類をダウンロードしてください。
              </Typography>
              
              {/* 다운로드 버튼 */}
              <Box sx={{ 
                marginBottom: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }}>
                <ButtonContainer>
                  <DownloadButton href="/application/personal.zip" download>
                    <DownloadIcon />
                    新卒者書類
                  </DownloadButton>
                  
                  <DownloadButton href="/application/career.zip" download>
                    <DownloadIcon />
                    経歴者書類
                  </DownloadButton>
                </ButtonContainer>
              </Box>
                            
              <DownloadNote>
                ※ ダウンロードし作成後、オンライン提出<br/>
                TEL : 03-6276-6506<br/>
                mail: info@enitec.co.jp<br/>
              </DownloadNote>
            </DownloadSection>
          </SectionBox>


        </StyledBox>
      </StyledContainer>
    </div>
  );
};

export default Recruitment;
