import React, { useEffect, useRef } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './Business.module.css';

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

const StyledContainer = styled(Container)(({ theme }) => ({
  fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
  '& *': {
    fontFamily: 'inherit !important'
  }
}));

const StyledBox = styled(Box)(({ theme }) => ({
  fontFamily: 'inherit !important'
}));

const Business: React.FC = () => {
  const englishTitleRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

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

  return (
    <div className={styles.container}>
      <StyledContainer maxWidth="lg">
        <StyledBox className={styles.content}>
          <EnglishTitle variant="h6" ref={englishTitleRef}>
            Business Fields
          </EnglishTitle>
          <MainTitle variant="h1" ref={mainTitleRef}>
            事業分野
          </MainTitle>
          
          <SectionBox ref={section1Ref} id="si-business">
            <TitleContainer>
              <SectionTitle variant="h3">
                SI事業
              </SectionTitle>
              <SectionSubtitle variant="h4">
                SI Business
              </SectionSubtitle>
            </TitleContainer>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#333' }}>
              SI事業では、お客様のビジネスニーズに合わせたシステム開発を行っています。
              最新の技術を活用し、高品質で信頼性の高いソリューションを提供いたします。
            </Typography>
          </SectionBox>

          <SectionBox ref={section2Ref} id="solutions">
            <TitleContainer>
              <SectionTitle variant="h3">
                ソリューション
              </SectionTitle>
              <SectionSubtitle variant="h4">
                Solutions
              </SectionSubtitle>
            </TitleContainer>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#333' }}>
              お客様の課題解決のための包括的なソリューションを提供いたします。
              技術的な専門知識と豊富な経験を活かし、最適なソリューションを提案いたします。
            </Typography>
          </SectionBox>

          <SectionBox ref={section3Ref} id="consulting">
            <TitleContainer>
              <SectionTitle variant="h3">
                コンサルティング
              </SectionTitle>
              <SectionSubtitle variant="h4">
                Consulting
              </SectionSubtitle>
            </TitleContainer>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#333' }}>
              IT戦略からシステム設計まで、お客様のビジネス成功をサポートする
              コンサルティングサービスを提供いたします。
            </Typography>
          </SectionBox>
        </StyledBox>
      </StyledContainer>
    </div>
  );
};

export default Business;
