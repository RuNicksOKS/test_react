import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './Company.module.css';

// images
import ceoImage from '../../assets/images/Ceo.jpg';

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
  marginBottom: 0,
  whiteSpace: 'nowrap',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1.8rem'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem'
  }
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 600,
  color: '#666',
  marginBottom: 0,
  textAlign: 'left',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1.1rem'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem'
  }
}));

const CeoMessageContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '30px',
  position: 'relative',
  overflow: 'visible', // 텍스트가 사진 위로 겹칠 수 있도록
  
  // 모바일 반응형
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '20px'
  }
}));

const CeoImage = styled('img')(({ theme }) => ({
  width: '450px',
  height: '300px',
  borderRadius: '50px',
  objectFit: 'cover',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  border: '4px solid #db9615',
  marginLeft: '60px', // 왼쪽에서 살짝 중앙으로 이동
  filter: 'brightness(0.8) contrast(0.9)', // 살짝 뿌옇게
  
  // 태블릿 반응형
  [theme.breakpoints.down('md')]: {
    width: '350px',
    height: '250px',
    marginLeft: '30px'
  },
  
  // 모바일 반응형
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '200px',
    marginLeft: '0',
    borderRadius: '20px'
  }
}));

const CeoMainMessage = styled(Typography)(({ theme }) => ({
  fontSize: '2.2rem',
  fontWeight: 700,
  color: '#00136C',
  textAlign: 'right',
  lineHeight: 1.4,
  position: 'absolute',
  right: '0',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '60%',
  zIndex: 10, // 이미지 위로 지나가도록 높은 z-index
  whiteSpace: 'nowrap', // 줄바꿈 방지
  
  // 태블릿 반응형
  [theme.breakpoints.down('md')]: {
    fontSize: '1.8rem',
    width: '50%',
    whiteSpace: 'normal' // 태블릿에서는 줄바꿈 허용
  },
  
  // 모바일 반응형
  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    fontSize: '1.5rem',
    width: '100%',
    textAlign: 'center',
    marginTop: '20px',
    whiteSpace: 'normal',
    right: 'auto',
    top: 'auto',
    transform: 'none'
  }
}));

const SectionContent = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  lineHeight: 1.8,
  color: '#333',
  textAlign: 'justify'
}));

const CeoPointsContainer = styled(Box)(({ theme }) => ({
  marginTop: '40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px'
}));

const CeoPoint = styled(Box)(({ theme }) => ({
  background: '#f8f9fa',
  borderRadius: '12px',
  padding: '30px',
  borderLeft: '4px solid #db9615',
  position: 'relative',
  transition: 'all 0.3s ease',
  transform: 'translateY(0)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    background: '#ffffff',
  }
}));

const PointNumber = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#db9615',
  marginBottom: '15px'
}));

const PointTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  fontWeight: 700,
  color: '#00136C',
  marginBottom: '15px',
  lineHeight: 1.4
}));

const PointContent = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  lineHeight: 1.8,
  color: '#333',
  textAlign: 'justify'
}));

const CompanyInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
}));

const InfoItem = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  lineHeight: 1.6,
  color: '#333',
  padding: '12px 0',
  borderBottom: '1px solid #e0e0e0'
}));

const InfoLabel = styled('strong')(({ theme }) => ({
  color: '#00136C',
  marginRight: '12px'
}));

const InfoValue = styled('span')(({ theme }) => ({
  color: '#333',
  fontWeight: 400,
  display: 'inline-block',
  width: '300px',
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  verticalAlign: 'top',
  
  [theme.breakpoints.down('md')]: {
    width: '250px'
  },
  
  [theme.breakpoints.down('sm')]: {
    width: '200px'
  }
}));

const PhilosophyCircle = styled(Box)(({ theme }) => ({
  width: '130px',
  height: '130px',
  borderRadius: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #00136C 0%, #db9615 100%)',
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  margin: '0 auto 20px',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
  },
  '&.active': {
    background: 'linear-gradient(135deg, #db9615 0%, #00136C 100%)',
    transform: 'scale(1.1)',
  }
}));

const CircleNumber = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 900,
  marginBottom: '6px'
}));

const CircleTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 600,
  textAlign: 'center',
  lineHeight: 1.2
}));


const PhilosophyGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '40px',
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '30px',
    maxWidth: '100%'
  },
  
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: '20px',
    padding: '0 10px'
  }
}));

const PhilosophyCard = styled(Box)(({ theme }) => ({
  background: 'white',
  borderRadius: '15px',
  padding: '30px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  textAlign: 'left',
  transition: 'all 0.3s ease',
  border: '1px solid #f0f0f0',
  overflow: 'hidden',
  
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)'
  },
  
  [theme.breakpoints.down('md')]: {
    padding: '25px'
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: '20px'
  }
}));

const PhilosophyIcon = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #00136C 0%, #db9615 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 20px 0 0',
  color: 'white',
  fontSize: '2rem',
  fontWeight: 'bold',
  flexShrink: 0,
  
  [theme.breakpoints.down('md')]: {
    width: '70px',
    height: '70px',
    fontSize: '1.8rem',
    margin: '0 15px 0 0'
  },
  
  [theme.breakpoints.down('sm')]: {
    width: '60px',
    height: '60px',
    fontSize: '1.5rem',
    margin: '0 12px 0 0'
  }
}));

const PhilosophyCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#00136C',
  marginBottom: '0px',
  lineHeight: 1.4,
  display: 'flex',
  alignItems: 'center',
  wordBreak: 'break-word',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1.3rem'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem'
  }
}));

const PhilosophyCardContent = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: '#666',
  lineHeight: 1.6,
  textAlign: 'left',
  wordBreak: 'break-word',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.95rem'
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

const StyledCollapse = styled(Collapse)(({ theme }) => ({
  fontFamily: 'inherit !important'
}));

const PhilosophyMainText = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#00136C',
  lineHeight: 1.6,
  fontStyle: 'italic',
  textAlign: 'center',
  marginBottom: '50px',
  fontFamily: 'inherit !important',
  wordBreak: 'break-word',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
    marginBottom: '40px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    padding: '0 10px'
  }
}));

const TimelineContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '800px',
  margin: '0 auto',
  padding: '40px 0'
}));

const TimelineLine = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '130px',
  top: '0',
  bottom: '0',
  width: '4px',
  background: '#00136C',
  
  [theme.breakpoints.down('sm')]: {
    left: '89px'
  }
}));

const TimelineItem = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '40px',
  
  '&:last-child': {
    marginBottom: '0'
  }
}));

const TimelineDot = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '120px',
  top: '8px',
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  background: '#8B5CF6',
  border: '4px solid white',
  boxShadow: '0 0 0 4px #00136C',
  zIndex: 2,
  
  [theme.breakpoints.down('sm')]: {
    left: '80px',
    width: '14px',
    height: '14px'
  }
}));

const TimelineDate = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 700,
  color: '#00136C',
  width: '100px',
  textAlign: 'right',
  paddingRight: '30px',
  lineHeight: 1.4,
  
  [theme.breakpoints.down('sm')]: {
    width: '70px',
    paddingRight: '20px',
    fontSize: '1rem'
  }
}));

const TimelineContent = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: '#333',
  lineHeight: 1.6,
  marginLeft: '50px',
  flex: 1,
  
  [theme.breakpoints.down('sm')]: {
    marginLeft: '30px',
    fontSize: '1rem'
  }
}));

const Company: React.FC = () => {
  const englishTitleRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  
  const [activePhilosophy, setActivePhilosophy] = useState<number | null>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 인라인 스타일로 애니메이션 적용
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

  const handlePhilosophyClick = (index: number) => {
    setActivePhilosophy(activePhilosophy === index ? null : index);
  };
  return (
    <div className={styles.container}>
      <StyledContainer maxWidth="lg">
        <StyledBox className={styles.content}>
          <EnglishTitle variant="h6" ref={englishTitleRef}>
            Company Information
          </EnglishTitle>
          <MainTitle variant="h1" ref={mainTitleRef}>
            会社情報
          </MainTitle>
          
          <SectionBox ref={section1Ref} id="ceo-message">
            <TitleContainer>
              <SectionTitle variant="h3">
                代表の一言
              </SectionTitle>
              <SectionSubtitle variant="h4">
                CEO Message
              </SectionSubtitle>
            </TitleContainer>
            <CeoMessageContainer>
              <CeoImage src={ceoImage} alt="CEO" />
              <CeoMainMessage variant="h5">
                人から始まり、人で終わる<br />
                人は会社の成長に大きな<br />
                影響を与える
              </CeoMainMessage>
            </CeoMessageContainer>
            
            <CeoPointsContainer>
              <CeoPoint>
                <PointNumber variant="h6">
                  01
                </PointNumber>
                <PointTitle variant="h6">
                  人から始まり<br />人で終わる
                </PointTitle>
                <PointContent variant="body1">
                  現代社会は、あらゆる場面で情報処理技術が活用される高度情報化社会と呼ばれております。しかしながら、どれほど技術が発展したとしても、その原点も成果の最終地点も「人」であることに変わりはありません。当社は、この「人」を中心に据える姿勢を何よりも大切にしております。
                </PointContent>
              </CeoPoint>

              <CeoPoint>
                <PointNumber variant="h6">
                  02
                </PointNumber>
                <PointTitle variant="h6">
                  人は会社の成長に<br />大きな影響を与える
                </PointTitle>
                <PointContent variant="body1">
                  IT 技術やシステムが進歩することで、利便性は飛躍的に向上してきました。しかし、企業の成長を本質的に支えるのは常に「人」であり、技術が人に取って代わることはできません。当社にとって「人」は何よりも重要な財産であり、その力こそが未来を創り出す原動力であると考えております。
                </PointContent>
              </CeoPoint>

              <CeoPoint>
                <PointNumber variant="h6">
                  03
                </PointNumber>
                <PointTitle variant="h6">
                  ひたむきな気持ちで<br />初心を保とう
                </PointTitle>
                <PointContent variant="body1">
                  エニテックは、創業の精神を忘れることなく、常に「人」と「お客様」を大切にし、「信頼」を基盤に歩み続けてまいります。これからも社員一人ひとりが誠実な姿勢で挑戦を重ね、共に成長していけるよう努力してまいります。皆さまからの温かいご支援とご期待を賜りますよう、心よりお願い申し上げます。
                </PointContent>
              </CeoPoint>
            </CeoPointsContainer>
          </SectionBox>

          <SectionBox ref={section2Ref} id="corporate-philosophy">
            <TitleContainer>
              <SectionTitle variant="h3">
                企業理念
              </SectionTitle>
              <SectionSubtitle variant="h4">
                Corporate Philosophy
              </SectionSubtitle>
            </TitleContainer>
            
            <PhilosophyMainText variant="h4">
              人間尊重の経営を目指して<br />
              お客様と共に発展する事により<br />
              社会に貢献する
            </PhilosophyMainText>

            <PhilosophyGrid>
              <PhilosophyCard>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '15px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <PhilosophyIcon>1</PhilosophyIcon>
                  <PhilosophyCardTitle variant="h6">
                    Contribution
                  </PhilosophyCardTitle>
                </Box>
                <PhilosophyCardContent variant="body2">
                    社会のルールを守り、法令を遵守してIT技術により、社会を豊かにする。私たちは、社会の一員として果たすべき責任を常に意識し、法令や社会規範を誠実に遵守することを基本といたします。
                </PhilosophyCardContent>
              </PhilosophyCard>

              <PhilosophyCard>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '15px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <PhilosophyIcon>2</PhilosophyIcon>
                  <PhilosophyCardTitle variant="h6">
                    Profit and Growth
                  </PhilosophyCardTitle>
                </Box>
                <PhilosophyCardContent variant="body2">
                  高度なIT技術を駆使して、お客様の発展に寄与する事により、利益と成長を図る。私たちは、最新かつ高度なIT技術を駆使し、お客様の事業発展や競争力向上に貢献することを使命としています。
                </PhilosophyCardContent>
              </PhilosophyCard>

              <PhilosophyCard>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '15px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <PhilosophyIcon>3</PhilosophyIcon>
                  <PhilosophyCardTitle variant="h6">
                    Work Efficiency
                  </PhilosophyCardTitle>
                </Box>
                <PhilosophyCardContent variant="body2">
                  働きやすくモチベーションを高められる職場により技術を高めて仕事の効率を上げる。社員一人ひとりが安心して働ける環境を整えることは、企業の発展に欠かせない基盤です。
                </PhilosophyCardContent>
              </PhilosophyCard>

              <PhilosophyCard>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '15px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <PhilosophyIcon>4</PhilosophyIcon>
                  <PhilosophyCardTitle variant="h6">
                    Human Respect
                  </PhilosophyCardTitle>
                </Box>
                <PhilosophyCardContent variant="body2">
                  一人一人が能力を発揮して自己実現ができる人間尊重の職場をつくる。私たちは、全ての社員が持つ個性や能力を尊重し、その力を存分に発揮できる環境を築くことを重要な使命と考えています。
                </PhilosophyCardContent>
              </PhilosophyCard>
            </PhilosophyGrid>
          </SectionBox>

          <SectionBox ref={section3Ref} id="company-summary">
            <TitleContainer>
              <SectionTitle variant="h3">
                会社概要
              </SectionTitle>
              <SectionSubtitle variant="h4">
                Summary
              </SectionSubtitle>
            </TitleContainer>

            <CompanyInfoContainer>
              <InfoItem variant="body1">
                <InfoLabel>商号:</InfoLabel> <InfoValue>エニテック株式会社</InfoValue>
              </InfoItem>
              <InfoItem variant="body1">
                <InfoLabel>設立:</InfoLabel> <InfoValue>2006年9月15日</InfoValue>
              </InfoItem>
              <InfoItem variant="body1">
                <InfoLabel>資本金:</InfoLabel> <InfoValue>1,000万円</InfoValue>
              </InfoItem>
              <InfoItem variant="body1">
                <InfoLabel>決算:</InfoLabel> <InfoValue>12月</InfoValue>
              </InfoItem>
              <InfoItem variant="body1">
                <InfoLabel>所在地:</InfoLabel> <InfoValue>東京都渋谷区笹塚2-19-2</InfoValue>
              </InfoItem>
              <InfoItem variant="body1">
                <InfoLabel>代表者:</InfoLabel> <InfoValue>ヨム ジェホ / 廉 堤皓</InfoValue>
              </InfoItem>
              <InfoItem variant="body1">
                <InfoLabel>事業内容:</InfoLabel>
                <InfoValue>
                  • 半導体ソフトウェア構築<br />
                  • セキュリティソルーション<br />
                  • システム構築<br />
                  • システム運用<br />
                  • WEB関連事業
                </InfoValue>
              </InfoItem>

            </CompanyInfoContainer>
          </SectionBox>

          <SectionBox ref={section4Ref} id="company-history">
            <TitleContainer>
              <SectionTitle variant="h3">
                沿革
              </SectionTitle>
              <SectionSubtitle variant="h4">
                History
              </SectionSubtitle>
            </TitleContainer>

            <TimelineContainer>
              
              <TimelineLine />
              
              <TimelineItem>
                <TimelineDot />
                <TimelineDate variant="body1">2006 09</TimelineDate>
                <TimelineContent variant="body1">会社設立</TimelineContent>
              </TimelineItem>
              
              <TimelineItem>
                <TimelineDot />
                <TimelineDate variant="body1">2007 03</TimelineDate>
                <TimelineContent variant="body1">富士通セミコンダクターITシステムズ株式会社様業務基本契約締結</TimelineContent>
              </TimelineItem>
              
              <TimelineItem>
                <TimelineDot />
                <TimelineDate variant="body1">09</TimelineDate>
                <TimelineContent variant="body1">会社移転</TimelineContent>
              </TimelineItem>
              
              <TimelineItem>
                <TimelineDot />
                <TimelineDate variant="body1">2008 09</TimelineDate>
                <TimelineContent variant="body1">ASP(Application Service Provider)基盤医療機器管理ソリューション「ME-Pro ME機器管理システム」開発及びサービス開始</TimelineContent>
              </TimelineItem>
              
              <TimelineItem>
                <TimelineDot />
                <TimelineDate variant="body1">2011 01</TimelineDate>
                <TimelineContent variant="body1">会社移転</TimelineContent>
              </TimelineItem>
              
              <TimelineItem>
                <TimelineDot />
                <TimelineDate variant="body1">2014 01</TimelineDate>
                <TimelineContent variant="body1">LG日立株式会社様と業務基本契約締結</TimelineContent>
              </TimelineItem>
              
              <TimelineItem>
                <TimelineDot />
                <TimelineDate variant="body1">2015 06</TimelineDate>
                <TimelineContent variant="body1">ミライト情報システム様と業務基本契約締結</TimelineContent>
              </TimelineItem>
              
              <TimelineItem>
                <TimelineDot />
                <TimelineDate variant="body1">2019 04</TimelineDate>
                <TimelineContent variant="body1">オン・セミコンダクター会津㈱様と業務契約締結</TimelineContent>
              </TimelineItem>
              
              <TimelineItem>
                <TimelineDot />
                <TimelineDate variant="body1">2019 11</TimelineDate>
                <TimelineContent variant="body1">東京都渋谷区笹塚に移転</TimelineContent>
              </TimelineItem>
            </TimelineContainer>
          </SectionBox>
        </StyledBox>
      </StyledContainer>
    </div>
  );
};

export default Company;
