import React, { useEffect, useRef } from 'react';
import { Container, Typography, Box, Card, CardContent, Chip, Divider } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import styles from './News.module.css';

// 이미지 import
import aiImage from '../../assets/images/AI.jpg';
import itImage from '../../assets/images/IT Developers.jpg';
import securityImage from '../../assets/images/Security.jpg';
import semiconductorImage from '../../assets/images/Semiconductor.jpg';
import rdImage from '../../assets/images/R&D.jpg';

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
          newsRefs.current[newsIndex]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 100);
      }
    }
  }, [targetNewsId]);

  const newsData = [
    {
      id: 1,
      category: "AI",
      title: "AI 시대, 개발자의 역할 재정의.",
      image: aiImage,
      content: `AI는 이제 단순한 기술적 도구가 아니라 산업 전반의 패러다임을 바꾸는 핵심 동력이 되고 있습니다. 자동화와 효율화를 넘어, 창의적 문제 해결과 새로운 비즈니스 모델 창출을 가능하게 하며, 모든 기업이 반드시 도입해야 하는 전략적 자산으로 자리 잡았습니다. 그러나 동시에 AI의 발전은 개발자에게 새로운 역할과 책임을 요구합니다. 단순히 코드를 작성하는 것에서 벗어나, 데이터를 이해하고 분석하며, AI가 올바른 방향으로 작동할 수 있도록 윤리적 기준을 마련하는 것이 중요합니다. 또한 AI는 인간의 일을 대체하는 것이 아니라 인간과 협력하여 더 큰 가치를 만들어내는 수단이 되어야 합니다. 개발자는 AI를 통해 업무 효율을 높이는 동시에, 사람이 중심이 되는 기술 생태계를 구축하는 데 기여해야 합니다. 즉, AI 시대의 개발자는 단순한 기술자가 아니라 문제 해결가, 전략가, 그리고 윤리적 조정자라는 다층적인 역할을 담당하게 됩니다.`
    },
    {
      id: 2,
      category: "IT",
      title: "IT 인재 부족, 미래를 경쟁하자!",
      image: itImage,
      content: `오늘날 전 세계 IT 산업은 빠른 속도로 성장하고 있지만, 그와 동시에 심각한 인재 부족 문제에 직면하고 있습니다. 클라우드, 빅데이터, AI, 사이버 보안 등 각 분야에서 요구되는 전문 인력은 폭발적으로 증가하고 있으나, 공급은 수요를 따라가지 못하고 있습니다. 이로 인해 기업들은 우수한 인재 확보를 위해 치열한 경쟁을 벌이고 있으며, 인재 부족은 곧 기업의 성장 정체와 직결되는 중요한 과제가 되고 있습니다. 특히 기술 변화의 속도가 빠른 만큼, 단순한 인력 확보만으로는 충분하지 않습니다. 지속적인 교육과 리스킬링(Reskilling), 그리고 직원들이 장기적으로 성장할 수 있는 환경을 제공하는 것이 중요합니다. 기업은 더 이상 단순히 인재를 고용하는 수준에 머무를 수 없으며, 함께 성장하고 발전할 수 있는 IT 파트너십을 구축해야 합니다. 미래 경쟁력은 결국 사람에서 나오며, 이를 준비하는 기업만이 시장에서 살아남고 앞서 나갈 수 있습니다.`
    },
    {
      id: 3,
      category: "Security",
      title: "보안, 개발자가 지켜야 할 가치!",
      image: securityImage,
      content: `보안은 디지털 시대에 기업과 사용자가 지켜야 할 가장 중요한 가치 중 하나입니다. 한 번의 보안 사고는 기업의 신뢰도를 무너뜨리고, 회복하기 어려운 타격을 입힐 수 있습니다. 따라서 보안은 단순히 IT 부서나 보안 전담 조직만의 과제가 아니라, 모든 개발자가 반드시 고려해야 하는 기본 원칙입니다. 개발 단계에서부터 보안을 내재화하는 '시큐어 코딩(Secure Coding)'은 이제 선택이 아닌 필수이며, 보안은 제품이나 서비스의 품질을 평가하는 중요한 지표가 되고 있습니다. 개인정보 보호, 네트워크 보안, 클라우드 환경 보안 등 다양한 영역에서 새로운 위협이 끊임없이 등장하고 있는 만큼, 개발자는 지속적으로 최신 보안 트렌드를 학습하고 코드에 반영해야 합니다. 이는 단순히 기술적 대응을 넘어 고객과의 신뢰를 구축하는 핵심 과정이며, 기업 브랜드의 가치를 지키는 가장 확실한 방법입니다. 결국 보안을 지키는 것은 곧 고객의 신뢰를 지키는 것과 같습니다.`
    },
    {
      id: 4,
      category: "Semiconductor",
      title: "반도체 혁신, 글로벌 IT 판도 흔든다!",
      image: semiconductorImage,
      content: `반도체는 현대 IT 산업의 심장과도 같은 존재입니다. 스마트폰, 서버, 인공지능, 자율주행 자동차까지, 거의 모든 첨단 기술의 기반에는 반도체가 존재합니다. 최근 글로벌 공급망 불안과 기술 패권 경쟁은 반도체의 중요성을 더욱 부각시키고 있으며, 각국은 자국 내 반도체 산업을 강화하기 위해 막대한 투자를 아끼지 않고 있습니다. 반도체 기술의 발전은 단순히 하드웨어 성능을 높이는 데서 끝나지 않습니다. 더 작고, 더 빠르며, 더 효율적인 반도체는 인공지능 학습 속도를 높이고, 클라우드 컴퓨팅 성능을 향상시키며, 미래 기술 발전을 가속화하는 핵심 원동력이 됩니다. 따라서 반도체는 이제 단순한 부품이 아니라, 글로벌 IT 판도를 뒤흔드는 전략적 무기라 할 수 있습니다. 기업과 국가는 반도체 혁신을 통해 시장의 우위를 선점하고, 차세대 산업을 이끌어갈 힘을 확보해야 합니다.`
    },
    {
      id: 5,
      category: "R&D",
      title: "R&D 투자, 기업 생존의 필수 조건",
      image: rdImage,
      content: `기술의 발전은 멈추지 않고 있으며, 기업이 시장에서 생존하고 성장하기 위해서는 끊임없는 연구개발(R&D) 투자가 필수적입니다. 단기적인 이익만을 추구하는 기업은 결국 경쟁에서 뒤처지게 마련입니다. 반대로 꾸준히 R&D에 투자하는 기업은 새로운 기술을 선도하고, 시장 변화에 능동적으로 대응하며, 장기적인 경쟁력을 확보할 수 있습니다. R&D는 단순히 신기술을 개발하는 것을 넘어, 고객의 요구를 예측하고 그에 맞는 솔루션을 제시하는 과정이기도 합니다. 또한 R&D 투자는 기업의 혁신 DNA를 강화하고, 구성원들이 끊임없이 배우고 도전할 수 있는 환경을 만들어줍니다. 특히 IT 산업과 같이 변화 속도가 빠른 분야에서는 R&D의 중요성이 더욱 크며, 이는 곧 기업의 생존 여부를 결정짓는 핵심 요인이 됩니다. 오늘의 R&D는 내일의 시장 점유율로 이어지며, 이는 장기적인 기업 가치를 창출하는 가장 확실한 투자입니다.`
    }
  ];

  return (
    <div className={styles.container}>
      <Container maxWidth="lg">
        {/* 헤더 섹션 */}
        <Box className={styles.header}>
          <Typography variant="h1" className={styles.mainTitle}>
            Latest News
          </Typography>
          <Typography variant="h2" className={styles.subTitle}>
            최신 기술 트렌드와 인사이트
          </Typography>
        </Box>

        {/* 뉴스 목록 */}
        <Box className={styles.newsList}>
          {newsData.map((news, index) => (
            <Card 
              key={news.id} 
              className={styles.newsDetailCard}
              ref={(el) => (newsRefs.current[index] = el)}
            >
              <CardContent className={styles.newsDetailContent}>
                {/* 카테고리와 날짜 */}
                <Box className={styles.newsMeta}>
                  <Chip 
                    label={news.category} 
                    className={styles.categoryChip}
                    size="small"
                  />
                </Box>

                {/* 제목 */}
                <Typography variant="h3" className={styles.newsDetailTitle}>
                  {news.title}
                </Typography>

                {/* 이미지 */}
                <Box className={styles.newsImageContainer}>
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className={styles.newsImage}
                  />
                </Box>

                {/* 내용 */}
                <Typography variant="body1" className={styles.newsText}>
                  {news.content}
                </Typography>

                {/* 구분선 (마지막 항목 제외) */}
                {index < newsData.length - 1 && (
                  <Divider className={styles.divider} />
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default News;
