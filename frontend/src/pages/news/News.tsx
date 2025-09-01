import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';

// 이미지 import
import aiImage from '../../assets/images/AI.jpg';
import itImage from '../../assets/images/IT Developers.jpg';
import securityImage from '../../assets/images/Security.jpg';
import semiconductorImage from '../../assets/images/Semiconductor.jpg';
import rdImage from '../../assets/images/R&D.jpg';

// 공통 스타일 정의
const commonStyles = {
  // 색상
  colors: {
    primary: '#00136C',
    secondary: '#cf4506',
    background: '#f2ebe1',
    text: '#333',
    white: 'white'
  },
  
  // 카드 스타일
  card: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    marginBottom: '32px',
    border: 'none'
  },
  
  // 카테고리 칩 스타일
  categoryChip: {
    backgroundColor: '#cf4506',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.8rem'
  },
  
  // 제목 스타일
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#00136C',
    marginBottom: '24px',
    lineHeight: 1.3
  },
  
  // 내용 스타일
  content: {
    fontSize: '1rem',
    lineHeight: 1.8,
    color: '#333',
    marginTop: '20px'
  },
  
  // 이미지 스타일
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  }
};

const News: React.FC = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const newsRefs = useRef<(HTMLDivElement | null)[]>([]);

  // URL 파라미터에서 뉴스 ID 가져오기
  const targetNewsId = searchParams.get('newsId');

  // 페이지 로드 상태 관리
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // 페이지 로드 시 특정 뉴스로 스크롤
  useEffect(() => {
    if (targetNewsId && isPageLoaded) {
      const newsIndex = parseInt(targetNewsId) - 1;
      
      const scrollToNews = () => {
        const element = newsRefs.current[newsIndex];
        if (element) {
          // 요소의 위치 계산
          const elementTop = element.offsetTop;
          const headerHeight = 50;
          const scrollPosition = elementTop - headerHeight;
          
          // 한 번에 정확한 위치로 스크롤
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }
      };

      // DOM이 완전히 렌더링된 후 스크롤 실행
      setTimeout(scrollToNews, 500);
    }
  }, [targetNewsId, isPageLoaded]);

  const newsData = [
    {
      id: 1,
      category: "AI",
      title: "AI時代、開発者の役割の再定義。",
      image: aiImage,
      content: `AIはもはや単なる技術的なツールではなく、産業全体のパラダイムを変える中核的な原動力となっています。自動化や効率化を超えて、創造的な問題解決や新たなビジネスモデルの創出を可能にし、すべての企業が導入すべき戦略的資産として位置づけられています。しかし同時に、AIの進展は開発者に新たな役割と責任を求めています。単にコードを書くことにとどまらず、データを理解し分析し、AIが正しい方向で機能するように倫理的基準を整えることが重要です。また、AIは人間の仕事を代替するのではなく、人間と協力しながらより大きな価値を生み出す手段であるべきです。開発者はAIによって業務効率を高めると同時に、人間中心の技術エコシステムを構築することに貢献しなければなりません。`
    },
    {
      id: 2,
      category: "IT",
      title: "IT人材不足、未来を競おう！",
      image: itImage,
      content: `世界のIT産業は急速に成長を続けていますが、その一方で深刻な人材不足に直面しています。クラウド、ビッグデータ、AI、サイバーセキュリティなど各分野で求められる専門人材は爆発的に増加しているものの、供給が需要に追いついていません。そのため企業は優秀な人材を確保するために熾烈な競争を繰り広げており、人材不足は企業の成長停滞に直結する重要課題となっています。特に技術変化のスピードが速い今、単なる人材確保だけでは十分ではありません。継続的な教育、そして社員が長期的に成長できる環境を提供することが重要です。企業はもはや単に人材を雇用するだけにとどまらず、ともに成長・発展できるITパートナーシップを築かなければなりません。未来の競争力は結局「人」から生まれるものであり、それを準備できる企業だけが市場で生き残り、先を行くことができるのです。`
    },
    {
      id: 3,
      category: "Security",
      title: "セキュリティ、開発者が守るべき価値！",
      image: securityImage,
      content: `セキュリティはデジタル時代において、企業とユーザーが守るべき最も重要な価値の一つです。たった一度のセキュリティ事故でも企業の信頼を失墜させ、回復困難な打撃を与える可能性があります。したがって、セキュリティは単にIT部門や専門組織だけの課題ではなく、すべての開発者が必ず考慮すべき基本原則です。開発段階からセキュリティを組み込む「セキュアコーディング（Secure Coding）」はもはや選択ではなく必須であり、セキュリティは製品やサービスの品質を評価する重要な指標となっています。個人情報保護、ネットワークセキュリティ、クラウド環境のセキュリティなど、多様な領域で新たな脅威が次々と現れる中、開発者は常に最新のセキュリティトレンドを学び、コードに反映させる必要があります。これは単なる技術的対応にとどまらず、顧客との信頼を構築する核心的なプロセスであり、企業ブランドの価値を守る最も確実な方法です。結局、セキュリティを守ることはすなわち顧客の信頼を守ることに他なりません。`
    },
    {
      id: 4,
      category: "Semiconductor",
      title: "半導体革新、グローバルITの勢力図を揺さぶる！",
      image: semiconductorImage,
      content: `半導体は現代IT産業の「心臓」とも言える存在です。スマートフォン、サーバー、人工知能、自動運転車に至るまで、ほぼすべての先端技術の基盤には半導体があります。近年のグローバルなサプライチェーン不安や技術覇権競争は、半導体の重要性を一層際立たせており、各国は自国の半導体産業を強化するために莫大な投資を惜しんでいません。半導体技術の進化は単にハードウェア性能を高めることにとどまりません。より小さく、より速く、より効率的な半導体はAIの学習速度を高め、クラウドコンピューティングの性能を向上させ、未来技術の発展を加速させる核心的な原動力となります。したがって半導体は、もはや単なる部品ではなく、グローバルITの勢力図を揺るがす「戦略的な武器」と言えます。企業や国家は半導体の革新を通じて市場優位を確保し、次世代産業をリードする力を持たなければなりません。`
    },
    {
      id: 5,
      category: "R&D",
      title: "R&D投資、企業生存の必須条件",
      image: rdImage,
      content: `技術の進歩は止まることがなく、企業が市場で生き残り成長するためには、絶え間ない研究開発（R&D）への投資が不可欠です。短期的な利益だけを追求する企業は、結局競争から取り残されてしまいます。逆に継続的にR&Dへ投資する企業は、新しい技術をリードし、市場の変化に能動的に対応し、長期的な競争力を確保することができます。R&Dは単に新技術を開発することにとどまらず、顧客のニーズを先取りし、それに適したソリューションを提示するプロセスでもあります。また、R&D投資は企業のイノベーションを強化し、社員が絶えず学び挑戦できる環境を生み出します。特にIT産業のように変化のスピードが速い分野では、R&Dの重要性は一層大きく、これはすなわち企業の存続を左右する核心要因となります。今日のR&Dは明日の市場シェアにつながり、長期的な企業価値を創出する最も確実な投資なのです。`
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: commonStyles.colors.background,
        color: commonStyles.colors.primary,
        position: 'relative',
        fontFamily: "'Noto Sans JP', sans-serif"
      }}
    >
      <Container maxWidth="lg">
        {/* 뉴스 목록 */}
        <Box
          sx={{
            padding: '100px 0 60px 0',
            marginTop: '50px'
          }}
        >
          <Box
            sx={{
              maxWidth: '900px',
              margin: '0 auto',
              backgroundColor: commonStyles.colors.background,
              minHeight: 'calc(100vh - 200px)',
              paddingBottom: '40px'
            }}
          >
            {newsData.map((news, index) => (
              <Card
                key={news.id}
                ref={(el) => (newsRefs.current[index] = el)}
                sx={commonStyles.card}
              >
                <CardContent
                  sx={{
                    padding: '32px'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px'
                    }}
                  >
                    <Chip
                      label={news.category}
                      size="small"
                      sx={commonStyles.categoryChip}
                    />
                  </Box>

                  {/* 제목 */}
                  <Typography
                    variant="h3"
                    sx={commonStyles.title}
                  >
                    {news.title}
                  </Typography>

                  {/* 이미지 */}
                  <Box
                    sx={{
                      margin: '24px 0',
                      textAlign: 'center'
                    }}
                  >
                    <img
                      src={news.image}
                      alt={news.title}
                      style={commonStyles.image}
                    />
                  </Box>

                  {/* 내용 */}
                  <Typography
                    variant="body1"
                    sx={commonStyles.content}
                  >
                    {news.content}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default News;
