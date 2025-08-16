import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import styles from './EnitecHome.module.css';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// GSAP 플러그인 등록
try {
  gsap.registerPlugin(ScrollTrigger);
} catch (error) {
  console.warn('GSAP ScrollTrigger 플러그인 등록 실패:', error);
}

const EnitecHome: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [counterValues, setCounterValues] = useState({
    companies: 0,
    developers: 0,
    satisfaction: 0
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const swiperRef = useRef<any>(null);
  const prevSlideRef = useRef(0);

  // 카운터 애니메이션
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  // 마우스 움직임 감지
  const handleMouseMove = (e: React.MouseEvent) => {
    try {
      if (currentSlide === 0 && e.currentTarget) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    } catch (error) {
      console.warn('마우스 움직임 처리 중 오류:', error);
    }
  };

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = {
        companies: 15000 / steps,
        developers: 27000000 / steps,
        satisfaction: 80 / steps
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
  const handleSlideChange = (swiper: any) => {
    try {
      if (swiper && typeof swiper.realIndex !== 'undefined') {
        const newSlide = swiper.realIndex;
        const prevSlide = prevSlideRef.current;
        
        // 슬라이드 방향 결정
        if (newSlide > prevSlide || (prevSlide === heroSlides.length - 1 && newSlide === 0)) {
          setSlideDirection('right');
        } else if (newSlide < prevSlide || (prevSlide === 0 && newSlide === heroSlides.length - 1)) {
          setSlideDirection('left');
        }
        
        setCurrentSlide(newSlide);
        prevSlideRef.current = newSlide;
        
        // 0.5초 후 방향 초기화
        setTimeout(() => setSlideDirection(null), 500);
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
      subtitle: "세상을 바꾸는 인재에게 힘을 실어줍니다",
      backgroundClass: styles.heroSlide1
    },
    {
      id: 2,
      title: "Bridging the world through advanced AI technology",
      subtitle: "최첨단 AI 기술로 세상과 연결됩니다다",
      backgroundClass: styles.heroSlide2
    },
    {
      id: 3,
      title: "Your vision drives the future we create together",
      subtitle: "당신의 비전이 우리가 함께 만들어갈 미래를 이끕니다다",
      backgroundClass: styles.heroSlide3
    }
  ];

  // 최신 뉴스 데이터
  const latestNews = [
    {
      id: 1,
      category: "Press Release",
      title: "Enitec, AI 기술 플랫폼 혁신 기술 발표",
      thumbnail: "/images/news-1.jpg",
      type: "Press Release"
    },
    {
      id: 2,
      category: "Blog",
      title: "기술의 미래: AI와 개인화",
      thumbnail: "/images/news-2.jpg",
      type: "Blog"
    },
    {
      id: 3,
      category: "Press Release",
      title: "Enitec, 글로벌 확장 전략 발표",
      thumbnail: "/images/news-3.jpg",
      type: "Press Release"
    },
    {
      id: 4,
      category: "Blog",
      title: "디지털 기술의 새로운 패러다임",
      thumbnail: "/images/news-4.jpg",
      type: "Blog"
    },
    {
      id: 5,
      category: "Press Release",
      title: "Enitec, ESG 경영 성과 보고서 발표",
      thumbnail: "/images/news-5.jpg",
      type: "Press Release"
    },
    {
      id: 6,
      category: "Blog",
      title: "지속가능한 기술의 미래",
      thumbnail: "/images/news-6.jpg",
      type: "Blog"
    }
  ];

  // 솔루션 데이터
  const solutions = [
    {
      id: 1,
      title: "AI Solutions",
      description: "인공지능 기반 솔루션으로 지속적인 혁신을 구축합니다",
      icon: "🤖"
    },
    {
      id: 2,
      title: "Cloud Solutions",
      description: "안전하고 빠른 클라우드 시스템으로 원활한 서비스를 보장합니다",
      icon: "☁️"
    },
    {
      id: 3,
      title: "Digital Platform",
      description: "개인화된 디지털 경험을 제공하는 통합 플랫폼입니다",
      icon: "💻"
    },
    {
      id: 4,
      title: "Data Solutions",
      description: "빅데이터 분석으로 스마트한 기술 인사이트를 제공합니다",
      icon: "📊"
    }
  ];

  return (
    <div className={styles.container}>
      {/* Hero 섹션 */}
      <div className={styles.heroSection}>
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
              <div
                className={slide.backgroundClass}
              >
                <Container maxWidth="xl">
                  <div className={styles.heroContent}>
                    <Typography
                      variant="h1"
                      className={styles.heroTitle}
                    >
                      {slide.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      className={styles.heroSubtitle}
                    >
                      {slide.subtitle}
                    </Typography>
                  </div>
                </Container>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 고정된 슬라이드 컨트롤 */}
        <div className={styles.slideControls}>
          {/* 슬라이드 인디케이터 */}
          <div className={styles.slideIndicators}>
            {heroSlides.map((_, index) => (
              <div
                key={index}
                className={`${styles.slideIndicator} ${index === currentSlide ? styles.slideIndicatorActive : styles.slideIndicatorInactive}`}
                onClick={() => swiperRef.current?.swiper?.slideTo(index)}
              />
            ))}
          </div>
          
          {/* 슬라이드 컨트롤 버튼 */}
          <div className={styles.slideControlButtons}>
            <Typography
              className={`${styles.slideButton} ${slideDirection === 'left' ? styles.slideButtonLeft : ''}`}
              onClick={() => swiperRef.current?.swiper?.slidePrev()}
            >
              ‹
            </Typography>
            
            {/* 재생/일시정지 버튼 */}
            <Typography
              className={styles.playPauseButton}
              onClick={toggleAutoplay}
            >
              {isAutoplay ? '❚❚' : '►'}
            </Typography>
            
            <Typography
              className={`${styles.slideButton} ${slideDirection === 'right' ? styles.slideButtonRight : ''}`}
              onClick={() => swiperRef.current?.swiper?.slideNext()}
            >
              ›
            </Typography>
          </div>
        </div>
      </div>

      {/* Latest News 섹션 */}
      <div className={styles.latestNewsSection}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            className={styles.sectionTitle}
          >
            Latest News
          </Typography>
          
          <div 
            className={styles.newsScrollContainer}
            onMouseEnter={() => document.documentElement.style.setProperty('--scroll-paused', 'paused')}
            onMouseLeave={() => document.documentElement.style.setProperty('--scroll-paused', 'running')}
          >
            <div className={styles.newsScrollContent}>
              {latestNews.map((news) => (
                <div key={news.id} className={styles.newsCard}>
                  <div className={styles.newsImage}>
                    {news.thumbnail}
                  </div>
                  <div className={styles.newsContent}>
                    <Typography
                      variant="caption"
                      className={styles.newsCategory}
                    >
                      {news.category}
                    </Typography>
                    <Typography
                      variant="h6"
                      className={styles.newsTitle}
                    >
                      {news.title}
                    </Typography>
                    <div className={styles.newsType}>
                      {news.type}
                    </div>
                  </div>
                </div>
              ))}
              {/* 무한 스크롤을 위한 복제 */}
              {latestNews.map((news) => (
                <div key={`clone-${news.id}`} className={styles.newsCard}>
                  <div className={styles.newsImage}>
                    {news.thumbnail}
                  </div>
                  <div className={styles.newsContent}>
                    <Typography
                      variant="caption"
                      className={styles.newsCategory}
                    >
                      {news.category}
                    </Typography>
                    <Typography
                      variant="h6"
                      className={styles.newsTitle}
                    >
                      {news.title}
                    </Typography>
                    <div className={styles.newsType}>
                      {news.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Hyper-Connected Solutions 섹션 */}
      <div className={styles.solutionsSection}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            className={styles.sectionTitle}
          >
            Hyper-Connected Solutions
          </Typography>
          
          <div className={styles.solutionsGrid}>
            {solutions.map((solution) => (
              <div
                key={solution.id}
                className={styles.solutionCard}
              >
                <Typography
                  variant="h1"
                  className={styles.solutionIcon}
                >
                  {solution.icon}
                </Typography>
                <Typography
                  variant="h5"
                  className={styles.solutionTitle}
                >
                  {solution.title}
                </Typography>
                <Typography
                  variant="body1"
                  className={styles.solutionDescription}
                >
                  {solution.description}
                </Typography>
                <Button
                  variant="outlined"
                  className={styles.readMoreButton}
                >
                  Read More
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Global Presence 섹션 */}
      <div
        ref={ref}
        className={styles.globalPresenceSection}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            className={styles.sectionTitle}
          >
            SI Global Presence
          </Typography>
          
          <div className={styles.counterGrid}>
            <div className={styles.counterItem}>
              <Typography
                variant="h1"
                className={styles.counterNumber}
              >
                {counterValues.companies.toLocaleString()}+
              </Typography>
              <Typography variant="h6" className={styles.counterLabel}>글로벌 SI 회사</Typography>
            </div>
            
            <div className={styles.counterItem}>
              <Typography
                variant="h1"
                className={styles.counterNumber}
              >
                {(counterValues.developers / 1000000).toFixed(1)}M
              </Typography>
              <Typography variant="h6" className={styles.counterLabel}>SI 개발자</Typography>
            </div>
            
            <div className={styles.counterItem}>
              <Typography
                variant="h1"
                className={styles.counterNumber}
              >
                {counterValues.satisfaction}%
              </Typography>
              <Typography variant="h6" className={styles.counterLabel}>개발자 만족도</Typography>
            </div>
          </div>
          
          <div className={styles.worldMap}>
            <Typography variant="h6">World Map</Typography>
          </div>
        </Container>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Container maxWidth="xl">
          <div className={styles.footerGrid}>
            <div className={styles.footerSection}>
              <Typography variant="h6" className={styles.footerTitle}>
                Who We Are
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                About Us
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                Leadership
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                Culture
              </Typography>
            </div>
            
            <div className={styles.footerSection}>
              <Typography variant="h6" className={styles.footerTitle}>
                What We Do
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                Solutions
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                Technology
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                Innovation
              </Typography>
            </div>
            
            <div className={styles.footerSection}>
              <Typography variant="h6" className={styles.footerTitle}>
                Media
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                Press Releases
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                Blog
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                News
              </Typography>
            </div>
            
            <div className={styles.footerSection}>
              <Typography variant="h6" className={styles.footerTitle}>
                Investors
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                Financial Reports
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                Stock Information
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                IR Contact
              </Typography>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <div className={styles.footerBottomContent}>
              <Typography variant="body2" className={styles.footerCopyright}>
                © Enitec Co. Ltd.
              </Typography>
              
              <div className={styles.footerContact}>
                <Typography variant="body2" className={styles.footerEmail}>
                  info@enitec.com
                </Typography>
                <Typography variant="body2" className={styles.footerSocial}>
                  📷
                </Typography>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default EnitecHome;
