import React, { useEffect, useRef } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// CSS 모듈 import 제거 - Material-UI styled components로 대체

// icon
import Si_icon1 from '../../assets/icon/Si_icon1.png';
import Si_icon2 from '../../assets/icon/Si_icon2.png';
import Si_icon3 from '../../assets/icon/Si_icon3.png';

// solution images
import solution1 from '../../assets/images/solution1.png';
import solution2 from '../../assets/images/solution2.png';
import solution3 from '../../assets/images/solution3.png';

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
  padding: '50px 50px 20px 50px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  opacity: 0,
  transform: 'translateY(50px)',
  transition: 'all 0.8s ease-out',
  
  [theme.breakpoints.down('md')]: {
    padding: '40px 40px 20px 40px',
    marginBottom: '60px'
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: '25px 25px 10px 25px',
    marginBottom: '40px'
  }
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

const ServiceChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
  color: '#00136C',
  fontWeight: 600,
  margin: '6px 8px 6px 0',
  border: '2px solid #e8eaf6',
  borderRadius: '20px',
  fontSize: '0.85rem',
  height: '32px',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '0.80rem',
    height: '28px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    height: '26px',
    margin: '6px 6px 6px 0'
  }
}));

const SubSectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 600,
  color: '#DB9615',
  padding: '8px 20px',
  borderRadius: '8px 8px 0 0',
  position: 'absolute',
  top: '-20px',
  left: '20px',
  zIndex: 10,
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1.2rem',
    padding: '6px 16px',
    top: '-18px',
    left: '16px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
    padding: '5px 12px',
    top: '-16px',
    left: '12px'
  }
}));

const ServiceIconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '20px'
}));

const ServiceIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '5px',
  '& img': {
    width: '80px',
    height: '80px',
    objectFit: 'contain'
  }
}));

const ServiceContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
  borderTop: '3px solid #db9615',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    background: '#ffffff',
  },
  
  [theme.breakpoints.down('md')]: {
    padding: '18px'
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: '15px',
    textAlign: 'left'
  }
}));

const ServiceHeader = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#00136C',
  marginBottom: '15px',
  textAlign: 'center',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    marginBottom: '12px',
    textAlign: 'left'
  }
}));

const ResponsiveText = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  lineHeight: 1.8,
  color: '#333',
  marginBottom: '20px',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
    lineHeight: 1.7
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.85rem',
    lineHeight: 1.6,
    marginBottom: '15px'
  }
}));

const SectionContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  padding: '30px',
  marginBottom: '40px',
  borderLeft: '4px solid #db9615',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    background: '#ffffff',
  },
  
  [theme.breakpoints.down('md')]: {
    padding: '40px',
    marginBottom: '60px'
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: '25px',
    marginBottom: '40px'
  }
}));

// Solution Section Styled Components
const SolutionSection = styled(Box)(({ theme }) => ({
  marginBottom: '64px',
  
  [theme.breakpoints.down('md')]: {
    marginBottom: '48px'
  },
  
  [theme.breakpoints.down('sm')]: {
    marginBottom: '32px'
  }
}));

const SolutionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '24px',
  fontSize: '2rem',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
    marginBottom: '20px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
    marginBottom: '16px'
  }
}));

const SolutionDescription = styled(Typography)(({ theme }) => ({
  color: '#666',
  marginBottom: '24px',
  fontSize: '1.1rem',
  fontWeight: 500,
  lineHeight: 1.8,
  
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
    fontWeight: 400,
    marginBottom: '20px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.85rem',
    fontWeight: 400,
    marginBottom: '16px'
  }
}));

const SolutionContentBox = styled(Box)(({ theme }) => ({
  padding: '24px',
  
  [theme.breakpoints.down('md')]: {
    padding: '20px'
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
  }
}));

const SolutionImageContainer = styled(Box)(({ theme }) => ({
  height: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  border: '3px solid #db9615',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    background: '#ffffff',
  },

  [theme.breakpoints.down('md')]: {
    height: '350px'
  },
  
  [theme.breakpoints.down('sm')]: {
    height: '300px',
    marginTop: '-50px',
    marginBottom: '20px'
  }
}));

const SolutionImage = styled('img')(({ theme }) => ({
  maxWidth: '90%',
  maxHeight: '90%',
  objectFit: 'contain'
}));

const BulletPoint = styled(Typography)(({ theme }) => ({
  color: '#333',
  marginBottom: '8px',
  fontSize: '0.95rem',
  fontWeight: 500,
  
  [theme.breakpoints.down('md')]: {
    fontSize: '0.95rem',
    fontWeight: 400,
    marginBottom: '20px'
  },
  
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.85rem',
    fontWeight: 400,
    marginBottom: '16px'
  }
}));

// Container and Content Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f2ebe1',
  paddingTop: '120px',
  paddingBottom: '80px',
  [theme.breakpoints.down('md')]: {
    paddingTop: '100px',
    paddingBottom: '60px'
  }
}));

const PageContent = styled(Box)(({ theme }) => ({
  padding: '0 20px',
  [theme.breakpoints.down('md')]: {
    padding: '0 15px'
  }
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
    <PageContainer>
      <StyledContainer maxWidth="lg">
        <PageContent>
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
            
            <Typography variant="h6" sx={{ color: '#00136C', marginBottom: '20px', fontWeight: 600 }}>
              SIの定義と事業適用領域
            </Typography>
            
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#333', marginBottom: '30px' }}>
              顧客の既存電算システムの統合、新しいシステムを構築し業務プロセスを画期的に改善するなど、
              これによって、顧客は生産費節減と品質向上などの効果を得る。
            </Typography>

            <Grid container spacing={4} sx={{ marginBottom: '40px' }}>
              <Grid item xs={12} md={4}>
                <ServiceIconContainer>
                  <ServiceIcon>
                    <img src={Si_icon1} alt="Application System" />
                  </ServiceIcon>
                  <ServiceContentBox>
                    <ServiceHeader variant="h6">
                      Application System
                    </ServiceHeader>
                    <Typography variant="body2" sx={{ marginBottom: '10px', color: '#333', textAlign: 'left' }}>
                      • アプリケーション開発、維持補修
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333', textAlign: 'left' }}>
                      • 運営サポート・性能向上サービス
                    </Typography>
                  </ServiceContentBox>
                </ServiceIconContainer>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <ServiceIconContainer>
                  <ServiceIcon>
                    <img src={Si_icon2} alt="Service Service" />
                  </ServiceIcon>
                  <ServiceContentBox>
                    <ServiceHeader variant="h6">
                      System Service
                    </ServiceHeader>
                    <Typography variant="body2" sx={{ marginBottom: '10px', color: '#333', textAlign: 'left' }}>
                      • H/W・S/W・N/W の責任運営
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333', textAlign: 'left' }}>
                      • システム維持補修・統合整備
                    </Typography>
                  </ServiceContentBox>
                </ServiceIconContainer>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <ServiceIconContainer>
                  <ServiceIcon>
                    <img src={Si_icon3} alt="Network Service" />
                  </ServiceIcon>
                  <ServiceContentBox>
                    <ServiceHeader variant="h6">
                      Network Service
                    </ServiceHeader>
                    <Typography variant="body2" sx={{ marginBottom: '10px', color: '#333', textAlign: 'left' }}>
                      • コンサルから維持補修まで一貫提供
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333', textAlign: 'left' }}>
                      • 効率性・信頼性・適合性を重視したソリューション
                    </Typography>
                  </ServiceContentBox>
                </ServiceIconContainer>
              </Grid>
            </Grid>

            <SectionContentBox>
              <SubSectionTitle variant="h5">
                システム構築事業
              </SubSectionTitle>
              <ResponsiveText variant="body1">
                生産管理、製造工程、公共、介護など多様な分野に対応。
              </ResponsiveText>
              
              <Box sx={{ marginBottom: '30px' }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#17297E', marginBottom: '5px', fontWeight: 500 }}>
                  主要技術スタック
                </Typography>
                <ServiceChip label="Python" />
                <ServiceChip label="Java" />
                <ServiceChip label="C" />
                <ServiceChip label=".NET" />
                <ServiceChip label="PHP" />
                <ServiceChip label="JavaScript" />
                <ServiceChip label="React" />
                <ServiceChip label="Node.js" />
                <ServiceChip label="Docker" />
              </Box>
              
              <Box sx={{ marginBottom: '30px' }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#17297E', marginBottom: '5px', fontWeight: 500 }}>
                  構築分野
                </Typography>
                <ServiceChip label="生産管理" />
                <ServiceChip label="製造工程管理" />
                <ServiceChip label="装置オンライン" />
                <ServiceChip label="公共システム" />
                <ServiceChip label="介護システム" />
                <ServiceChip label="DX推進支援" />
              </Box>

              <Box sx={{ marginBottom: '0px' }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#17297E', marginBottom: '5px', fontWeight: 500 }}>
                  システム運用管理
                </Typography>
                <ResponsiveText variant="body1" sx={{ marginBottom: '0px' }}>
                  お客様の運用されているシステムの安定稼動の為に運用管理サービスを行います。<br />
                  24時間365日の監視体制で、安定稼働と信頼性を確保。
                </ResponsiveText>
              </Box>
            </SectionContentBox>

            <SectionContentBox>
              <Box sx={{ marginBottom: '30px' }}>
                <SubSectionTitle variant="h5">
                  Web関連事業
                </SubSectionTitle>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#17297E', marginBottom: '5px', fontWeight: 500 }}>
                  Webアプリケーション開発
                </Typography>
                <ResponsiveText variant="body1" sx={{ marginBottom: '0px' }}>
                  最新のWeb技術を活用した高機能なアプリケーション開発
                </ResponsiveText>
                <ServiceChip label="クラウド" />
                <ServiceChip label="API" />
                <ServiceChip label="モバイル最適化" />
              </Box>
              <Box sx={{ marginBottom: '0px' }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#17297E', marginBottom: '5px', fontWeight: 500 }}>
                  Webコンテンツ活性化
                </Typography>
                <ResponsiveText variant="body1" sx={{ marginBottom: '0px' }}>
                  魅力的で効果的なWebコンテンツの企画・制作・運用
                </ResponsiveText>
                <ServiceChip label="SEO" />
                <ServiceChip label="UX" />
                <ServiceChip label="デジタルマーケティング" />
              </Box>
            </SectionContentBox>

            <SectionContentBox>
              <SubSectionTitle variant="h5">
                海外ITアイテムの交流
              </SubSectionTitle>
              <ResponsiveText variant="body1" sx={{ marginBottom: '0px' }}>
                海外顧客・パートナーとネットワークを構築し、グローバル展開やDX推進を支援。
              </ResponsiveText>
            </SectionContentBox>
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

            {/* 첫 번째 섹션: 信頼できるオフショア開発 */}
            <SolutionSection>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 1 } }}>
                  <SolutionContentBox>
                    <SolutionTitle variant="h4">
                      信頼できるオフショア開発
                    </SolutionTitle>
                    <SolutionDescription variant="body1">
                      豊富な経験を持つ専門開発者の責任感のある実行により、お客様のプロジェクトを成功に導きます。
                    </SolutionDescription>
                    <Box sx={{ mb: 3 }}>
                      <BulletPoint variant="body2">• 豊富な経験を持つ専門開発者の責任感のある実行</BulletPoint>
                      <BulletPoint variant="body2">• 体系的な品質管理と透明な開発プロセス</BulletPoint>
                      <BulletPoint variant="body2">• 安定して信頼できる結果物提供</BulletPoint>
                      <BulletPoint variant="body2">• 容易に引き継いで維持管理できる構造設計</BulletPoint>
                    </Box>
                  </SolutionContentBox>
                </Grid>
                
                <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 2 } }}>
                  <SolutionImageContainer>
                    <SolutionImage 
                      src={solution1} 
                      alt="信頼できるオフショア開発" 
                    />
                  </SolutionImageContainer>
                </Grid>
              </Grid>
            </SolutionSection>

            {/* 두 번째 섹션: 実力ある専門チーム */}
            <SolutionSection>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                  <SolutionContentBox>
                    <SolutionTitle variant="h4">
                      実力ある専門チーム
                    </SolutionTitle>
                    <SolutionDescription variant="body1">
                      顧客のニーズを正確に分析し、最適なソリューションを提案する専門チームです。
                    </SolutionDescription>
                    <Box sx={{ mb: 3 }}>
                      <BulletPoint variant="body2">• 顧客のニーズを正確に分析し、最適なソリューションを提案</BulletPoint>
                      <BulletPoint variant="body2">• 類似プロジェクトの経験に基づく高い効率性と完成度</BulletPoint>
                      <BulletPoint variant="body2">• 集中力のある協力で成功を導く</BulletPoint>
                      <BulletPoint variant="body2">• スケジュールと予算に最適化されたカスタマイズコンサルティング</BulletPoint>
                      <BulletPoint variant="body2">• 設定された期間とコスト内で確実に完成させる</BulletPoint>
                    </Box>
                  </SolutionContentBox>
                </Grid>
                
                <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
                  <SolutionImageContainer>
                    <SolutionImage 
                      src={solution2} 
                      alt="実力ある専門チーム" 
                    />
                  </SolutionImageContainer>
                </Grid>
              </Grid>
            </SolutionSection>

            {/* 세 번째 섹션: 最高の成果, 持続可能なメンテナンス */}
            <SolutionSection>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 1 } }}>
                  <SolutionContentBox>
                    <SolutionTitle variant="h4">
                      最高の成果<br/>持続可能なメンテナンス
                    </SolutionTitle>
                    <SolutionDescription variant="body1">
                      単純納品を超えて長期的な安定性を保障し、持続可能な価値を提供します。
                    </SolutionDescription>
                    <Box sx={{ mb: 3 }}>
                      <BulletPoint variant="body2">• 単純納品を超えて長期的な安定性を保障</BulletPoint>
                      <BulletPoint variant="body2">• 容易に引き継いで維持管理できる構造設計</BulletPoint>
                      <BulletPoint variant="body2">• 成果中心の開発と迅速な対応で持続可能な価値を提供</BulletPoint>
                      <BulletPoint variant="body2">• 不確実な採用事情と複雑な開発リスクなし</BulletPoint>
                      <BulletPoint variant="body2">• 専任チームが製品を継続的に成長・高度化</BulletPoint>
                    </Box>
                  </SolutionContentBox>
                </Grid>
                
                <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 2 } }}>
                  <SolutionImageContainer>
                    <SolutionImage 
                      src={solution3} 
                      alt="最高の成果, 持続可能なメンテナンス" 
                    />
                  </SolutionImageContainer>
                </Grid>
              </Grid>
            </SolutionSection>
          </SectionBox>
        </PageContent>
      </StyledContainer>
    </PageContainer>
  );
};

export default Business;
