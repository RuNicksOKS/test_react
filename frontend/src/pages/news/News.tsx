import React, { useEffect, useRef } from 'react';
import { Container, Typography, Box, Card, CardContent, Chip, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import styles from './News.module.css';

// 이미지 import
import aiImage from '../../assets/images/AI.jpg';
import itImage from '../../assets/images/IT Developers.jpg';
import securityImage from '../../assets/images/Security.jpg';
import semiconductorImage from '../../assets/images/Semiconductor.jpg';
import rdImage from '../../assets/images/R&D.jpg';

// Styled Components
const NewsTitle = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
  color: #00136C;
  margin-bottom: 24px;
  line-height: 1.3;
`;

const NewsContent = styled(Typography)`
  font-size: 1rem;
  line-height: 1.8;
  color: #333;
  margin-top: 20px;
`;

const CategoryChip = styled(Chip)`
  background-color: #cf4506;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
`;

const NewsDivider = styled(Divider)`
  margin: 40px 0;
  border-color: rgba(0, 19, 108, 0.1);
`;

const NewsListContainer = styled(Box)`
  padding: 100px 0 60px 0;
  margin-top: 50px;
`;

const NewsList = styled(Box)`
  max-width: 900px;
  margin: 0 auto;
  background-color: #f2ebe1;
  min-height: calc(100vh - 200px);
  padding-bottom: 40px;
`;

const NewsDetailCard = styled(Card)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 32px;
  border: none;
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const NewsDetailContent = styled(CardContent)`
  padding: 32px;
`;

const NewsMeta = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const NewsImageContainer = styled(Box)`
  margin: 24px 0;
  text-align: center;
`;

const News: React.FC = () => {
  const [searchParams] = useSearchParams();
  const newsRefs = useRef<(HTMLDivElement | null)[]>([]);

  // URL 파라미터에서 뉴스 ID 가져오기
  const targetNewsId = searchParams.get('newsId');

  // 페이지 로드 시 특정 뉴스로 스크롤
  useEffect(() => {
    if (targetNewsId) {
      const newsIndex = parseInt(targetNewsId) - 1;
      if (newsRefs.current[newsIndex]) {
        setTimeout(() => {
          const element = newsRefs.current[newsIndex];
          if (element) {
            const elementTop = element.offsetTop;
            window.scrollTo({
              top: elementTop - 40, // 100px 위로
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    }
  }, [targetNewsId]);

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
    <div className={styles.container}>
      <Container maxWidth="lg">
        {/* 뉴스 목록 */}
        <NewsListContainer>
          <NewsList>
          {newsData.map((news, index) => (
            <NewsDetailCard 
              key={news.id} 
              ref={(el) => (newsRefs.current[index] = el)}
            >
              <NewsDetailContent>
                <NewsMeta>
                  <CategoryChip 
                    label={news.category} 
                    size="small"
                  />
                </NewsMeta>

                {/* 제목 */}
                <NewsTitle variant="h3">
                  {news.title}
                </NewsTitle>

                {/* 이미지 */}
                <NewsImageContainer>
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className={styles.newsImage}
                  />
                </NewsImageContainer>

                {/* 내용 */}
                <NewsContent variant="body1">
                  {news.content}
                </NewsContent>

                {/* 구분선 (마지막 항목 제외) */}
                {index < newsData.length - 1 && (
                  <NewsDivider />
                )}
              </NewsDetailContent>
            </NewsDetailCard>
          ))}
          </NewsList>
        </NewsListContainer>
      </Container>
    </div>
  );
};

export default News;
