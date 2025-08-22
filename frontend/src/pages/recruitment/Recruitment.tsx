import React, { useEffect, useRef } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './Recruitment.module.css';

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

const Recruitment: React.FC = () => {
  const englishTitleRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

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
      section3Ref.current,
      section4Ref.current
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
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#333' }}>
              私たちが求める人材は、技術力だけでなく、コミュニケーション能力と
              チームワークを大切にする方です。新しい技術への好奇心と学習意欲を持ち、
              お客様の課題解決に情熱を持って取り組める方を歓迎いたします。
            </Typography>
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
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#333' }}>
              充実した福利厚生制度を整備し、社員の皆様が安心して働ける環境を提供いたします。
              各種保険、退職金制度、研修制度など、働きやすい職場づくりを心がけています。
            </Typography>
          </SectionBox>

          <SectionBox ref={section3Ref} id="recruitment-info">
            <TitleContainer>
              <SectionTitle variant="h3">
                募集案内
              </SectionTitle>
              <SectionSubtitle variant="h4">
                Recruitment Information
              </SectionSubtitle>
            </TitleContainer>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#333' }}>
              現在、システムエンジニア、プログラマー、プロジェクトマネージャーなどの
              ポジションで募集を行っています。詳細はお気軽にお問い合わせください。
            </Typography>
          </SectionBox>

          <SectionBox ref={section4Ref} id="application-method">
            <TitleContainer>
              <SectionTitle variant="h3">
                志願方法
              </SectionTitle>
              <SectionSubtitle variant="h4">
                Application Method
              </SectionSubtitle>
            </TitleContainer>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#333' }}>
              履歴書、職務経歴書をメールまたは郵送にてお送りください。
              書類選考後、面接のご連絡をさせていただきます。
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </Typography>
          </SectionBox>
        </StyledBox>
      </StyledContainer>
    </div>
  );
};

export default Recruitment;
