import React, { useEffect, useRef } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './Company.module.css';

// Styled Components
const MainTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 900,
  color: '#00136C',
  marginBottom: '16px',
  letterSpacing: '-0.02em',
  textAlign: 'center',
  fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif",
  opacity: 0,
  transform: 'translateY(50px)',
  transition: 'all 0.8s ease-out'
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 400,
  color: '#666',
  marginBottom: '60px',
  textAlign: 'center',
  fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif",
  opacity: 0,
  transform: 'translateY(50px)',
  transition: 'all 0.8s ease-out'
}));

const SectionBox = styled(Box)(({ theme }) => ({
  marginBottom: '60px',
  background: 'white',
  borderRadius: '12px',
  padding: '40px',
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
  paddingBottom: '12px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: '#00136C',
  marginBottom: 0,
  fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif"
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 600,
  color: '#666',
  marginBottom: 0,
  textAlign: 'left',
  fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif"
}));

const CeoMainMessage = styled(Typography)(({ theme }) => ({
  fontSize: '2.2rem',
  fontWeight: 700,
  color: '#00136C',
  marginBottom: '30px',
  textAlign: 'right',
  lineHeight: 1.4,
  fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif"
}));

const SectionContent = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  lineHeight: 1.8,
  color: '#333',
  textAlign: 'justify',
  fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif"
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
  marginBottom: '15px',
  fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif"
}));

const PointTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  fontWeight: 700,
  color: '#00136C',
  marginBottom: '15px',
  lineHeight: 1.4,
  fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif"
}));

const PointContent = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  lineHeight: 1.8,
  color: '#333',
  textAlign: 'justify',
  fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif"
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
  borderBottom: '1px solid #e0e0e0',
  fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif"
}));

const Company: React.FC = () => {
  const mainTitleRef = useRef<HTMLDivElement>(null);
  const subTitleRef = useRef<HTMLDivElement>(null);
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
          // 인라인 스타일로 애니메이션 적용
          if (entry.target instanceof HTMLElement) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        }
      });
    }, observerOptions);

    const elements = [
      mainTitleRef.current,
      subTitleRef.current,
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
      <Container maxWidth="lg">
        <Box className={styles.content}>
          <MainTitle 
            variant="h1" 
            ref={mainTitleRef}
          >
            会社情報
          </MainTitle>
          <SubTitle 
            variant="h2" 
            ref={subTitleRef}
          >
            企業理念と会社概要
          </SubTitle>
          
          <SectionBox 
            ref={section1Ref}
          >
            <TitleContainer>
              <SectionTitle variant="h3">
                代表の一言
              </SectionTitle>
              <SectionSubtitle variant="h4">
                CEO Message
              </SectionSubtitle>
            </TitleContainer>
            <CeoMainMessage variant="h5">
              人から始まり、人で終わる<br />
              人は会社の成長に大きな<br />
              影響を与える
            </CeoMainMessage>
            <SectionContent variant="body1">
              エニテックのホームページをご訪問いただき誠にありがとうございます。<br />
              当社は2006年9月に設立し、今はまだ小さい会社にすぎませんが、大きな目標を目指して邁進してまいります。
            </SectionContent>
            
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

            代表取締役
          </SectionBox>

          <SectionBox ref={section2Ref}>
            <SectionTitle variant="h3">
              企業理念
            </SectionTitle>
            <SectionContent variant="body1">
              技術革新を通じて、より良い社会の実現に貢献する。
              私たちは常に最新技術を追求し、お客様と共に成長していきます。
            </SectionContent>
          </SectionBox>

          <SectionBox ref={section3Ref}>
            <SectionTitle variant="h3">
              会社概要
            </SectionTitle>
            <CompanyInfoContainer>
              <InfoItem variant="body1">
                <strong style={{ color: '#00136C', marginRight: '12px' }}>社名:</strong> Enitec株式会社
              </InfoItem>
              <InfoItem variant="body1">
                <strong style={{ color: '#00136C', marginRight: '12px' }}>設立:</strong> 2020年
              </InfoItem>
              <InfoItem variant="body1">
                <strong style={{ color: '#00136C', marginRight: '12px' }}>事業内容:</strong> ITコンサルティング、システム開発
              </InfoItem>
              <InfoItem variant="body1">
                <strong style={{ color: '#00136C', marginRight: '12px' }}>従業員数:</strong> 50名
              </InfoItem>
            </CompanyInfoContainer>
          </SectionBox>
        </Box>
      </Container>
    </div>
  );
};

export default Company;
