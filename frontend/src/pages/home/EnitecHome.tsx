import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import GoogleMap from '../../components/map/GoogleMap';
import styles from './EnitecHome.module.css';

// images
import aiImage from '../../assets/images/AI.jpg';
import itDImage from '../../assets/images/IT Developers.jpg';
import securityImage from '../../assets/images/Security.jpg';
import semiImage from '../../assets/images/Semiconductor.jpg';
import rndImage from '../../assets/images/R&D.jpg';

// icon
import copyrightIcon from '../../assets/icon/copyright.png';
import codeIcon from '../../assets/icon/code.png';
import dataIcon from '../../assets/icon/database.png';
import agileIcon from '../../assets/icon/agile.png';
import securityIcon from '../../assets/icon/security.png';


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
  const navigate = useNavigate();
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
      subtitle: "世界を変える人材に力を与えます",
      backgroundClass: styles.heroSlide1
    },
    {
      id: 2,
      title: "Bridging the world through advanced AI technology",
      subtitle: "最先端のAI技術で世界とつながります",
      backgroundClass: styles.heroSlide2
    },
    {
      id: 3,
      title: "Your vision drives the future we create together",
      subtitle: "あなたのビジョンは、私たちが共に作る未来を導きます",
      backgroundClass: styles.heroSlide3
    }
  ];

  // 최신 뉴스 데이터
  const latestNews = [
    {
      id: 1,
      category: "AI",
      title: "AI時代、開発者の役割再定義。",
      thumbnail: aiImage
    },
    {
      id: 2,
      category: "IT",
      title: "IT人材の不足、未来を競争しよう！",
      thumbnail: itDImage,
    },
    {
      id: 3,
      category: "Security",
      title: "セキュリティ、開発者が守るべき価値！",
      thumbnail: securityImage
    },
    {
      id: 4,
      category: "semiconductor",
      title: "半導体革新、グローバルITの勢力図を揺さぶる！",
      thumbnail: semiImage
    },
    {
      id: 5,
      category: "R&D",
      title: "R&D投資、企業生存の必須条件",
      thumbnail: rndImage
    }
  ];

  // 솔루션 데이터
  const solutions = [
    {
      id: 1,
      title: "Full Stack",
      description: "企画、開発、QAまで最高の専門人材",
      icon: codeIcon
    },
    {
      id: 2,
      title: "Data Solutions",
      description: "体系的なデータ分析による最適なソリューション",
      icon: dataIcon
    },
    {
      id: 3,
      title: "Agile Process",
      description: "迅速かつ柔軟な開発プロセスで迅速に対応",
      icon: agileIcon
    },
    {
      id: 4,
      title: "Secure Systems",
      description: "徹底したセキュリティで安全なITインフラを提供",
      icon: securityIcon
    }
  ];

  return (
    <div className={styles.container}>
      {/* Language Switcher */}
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
                {/* 마우스 물결 효과 - 3번째 슬라이드에만 적용 */}
                {slide.id === 3 && (
                  <div className={styles.mouseWave} />
                )}
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
                    <img 
                      src={news.thumbnail} 
                      alt={news.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
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
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/news?newsId=${news.id}`)}
                      sx={{
                        marginTop: 'auto',
                        alignSelf: 'flex-start',
                        color: '#cf4506',
                        borderColor: '#cf4506',
                        fontSize: '0.75rem',
                        padding: '4px 12px',
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#cf4506',
                          backgroundColor: '#cf4506',
                          color: 'white'
                        }
                      }}
                    >
                      Details
                    </Button>
                  </div>
                </div>
              ))}
              {/* 무한 스크롤을 위한 복제 */}
              {latestNews.map((news) => (
                <div key={`clone-${news.id}`} className={styles.newsCard}>
                  <div className={styles.newsImage}>
                    <img 
                      src={news.thumbnail} 
                      alt={news.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
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
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/news?newsId=${news.id}`)}
                      sx={{
                        marginTop: 'auto',
                        alignSelf: 'flex-start',
                        color: '#cf4506',
                        borderColor: '#cf4506',
                        fontSize: '0.75rem',
                        padding: '4px 12px',
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#cf4506',
                          backgroundColor: '#cf4506',
                          color: 'white'
                        }
                      }}
                    >
                      Details
                    </Button>
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
            最高のチームが開発とビジネスをリードしていきます
          </Typography>
          
          <div className={styles.solutionsGrid}>
            {solutions.map((solution) => (
              <div
                key={solution.id}
                className={styles.solutionCard}
              >
                {solution.id === 1 ? (
                  <img src={codeIcon} alt={solution.title} className={styles.solutionIcon} />
                ) : solution.id === 2 ? (
                  <img src={dataIcon} alt={solution.title} className={styles.solutionIcon} />
                ) : solution.id === 3 ? (
                  <img src={agileIcon} alt={solution.title} className={styles.solutionIcon} />
                ) : solution.id === 4 ? (
                  <img src={securityIcon} alt={solution.title} className={styles.solutionIcon} />
                ) : (
                  <Typography variant="h1" className={styles.solutionIcon}>
                    {solution.icon}
                  </Typography>
                )}
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
              <Typography variant="h6" className={styles.counterLabel}>SI企業数</Typography>
            </div>
            
            <div className={styles.counterItem}>
              <Typography
                variant="h1"
                className={styles.counterNumber}
              >
                {(counterValues.developers / 1000000).toFixed(1)}M
              </Typography>
              <Typography variant="h6" className={styles.counterLabel}>開発者数</Typography>
            </div>
            
            <div className={styles.counterItem}>
              <Typography
                variant="h1"
                className={styles.counterNumber}
              >
                {counterValues.satisfaction.toFixed(1)}%
              </Typography>
              <Typography variant="h6" className={styles.counterLabel}>開発者満足度</Typography>
            </div>
          </div>
          
          <GoogleMap 
            title="Access"
            height="500px"
            address="エニテック株式会社"
            latitude = {35.674279067542734}
            longitude = {139.66539339810726}
            zoom={15}
            language="ja"
          />
        </Container>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Container maxWidth="xl">
          <div className={styles.footerGrid}>
            <div className={styles.footerSection}>
              <Typography variant="h6" className={styles.footerTitle}>
                会社情報
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                代表の一言
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                企業理念
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                会社概要
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                沿革
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                組織構成
              </Typography>
            </div>
            
            <div className={styles.footerSection}>
              <Typography variant="h6" className={styles.footerTitle}>
                事業分野
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                SI事業
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                ソリューション
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                コンサルティング
              </Typography>
            </div>
            
            <div className={styles.footerSection}>
              <Typography variant="h6" className={styles.footerTitle}>
                採用情報
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                人材像
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                福利厚生
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                募集案内
              </Typography>
              <Typography variant="body2" className={styles.footerLink}>
                志願方法
              </Typography>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <div className={styles.footerBottomContent}>
              <Typography variant="body2" className={styles.footerCopyright}>
                © Enitec. All rights reserved.
              </Typography>
              
              <div className={styles.footerContact}>
                <Typography variant="body2" className={styles.footerEmail}>
                  info@enitec.com
                </Typography>
                <img 
                  src={copyrightIcon}
                  alt="저작권"
                  className={styles.footerSocial}
                  onClick={() => navigate('/copyright')}
                  style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default EnitecHome;
