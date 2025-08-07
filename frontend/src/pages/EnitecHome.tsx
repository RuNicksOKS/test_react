import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const EnitecHome: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [counterValues, setCounterValues] = useState({
    channels: 0,
    businesses: 0,
    countries: 0
  });

  const swiperRef = useRef<any>(null);
  const prevSlideRef = useRef(0);

  // 헤더 스크롤 효과
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        channels: 20000 / steps,
        businesses: 1.3 / steps,
        countries: 200 / steps
      };

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setCounterValues({
          channels: Math.round(stepValue.channels * currentStep),
          businesses: Math.round((stepValue.businesses * currentStep) * 10) / 10,
          countries: Math.round(stepValue.countries * currentStep)
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
    if (isAutoplay) {
      swiperRef.current?.swiper?.autoplay?.stop();
    } else {
      swiperRef.current?.swiper?.autoplay?.start();
    }
    setIsAutoplay(!isAutoplay);
  };

  // 슬라이드 변경 핸들러
  const handleSlideChange = (swiper: any) => {
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
  };

  // Hero 슬라이드 데이터
  const heroSlides = [
    {
      id: 1,
      title: "Transforming Travel with AI Innovation",
      subtitle: "AI 기술로 여행을 혁신합니다",
      image: "/images/hero-1.jpg"
    },
    {
      id: 2,
      title: "Make Everyone's Travel Dreams a Reality",
      subtitle: "모든 사람의 여행 꿈을 현실로 만듭니다",
      image: "/images/hero-2.jpg"
    },
    {
      id: 3,
      title: "Hyper-connect the global travel ecosystem",
      subtitle: "글로벌 여행 생태계를 초연결합니다",
      image: "/images/hero-3.jpg"
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
      title: "여행 기술의 미래: AI와 개인화",
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
      title: "디지털 여행의 새로운 패러다임",
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
      title: "지속가능한 여행의 미래",
      thumbnail: "/images/news-6.jpg",
      type: "Blog"
    }
  ];

  // 솔루션 데이터
  const solutions = [
    {
      id: 1,
      title: "Subscription Solutions",
      description: "구독 기반 여행 서비스로 지속적인 고객 관계를 구축합니다",
      icon: "📱"
    },
    {
      id: 2,
      title: "Transaction Solutions",
      description: "안전하고 빠른 결제 시스템으로 원활한 거래를 보장합니다",
      icon: "💳"
    },
    {
      id: 3,
      title: "Consumer Platform",
      description: "개인화된 여행 경험을 제공하는 통합 플랫폼입니다",
      icon: "🎯"
    },
    {
      id: 4,
      title: "Data Solutions",
      description: "빅데이터 분석으로 스마트한 여행 인사이트를 제공합니다",
      icon: "📊"
    }
  ];

  return (
    <Box sx={{ fontFamily: 'Pretendard, sans-serif' }}>
      {/* 헤더 */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: isScrolled ? 'white' : 'transparent',
          transition: 'all 0.3s ease',
          boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 2
            }}
          >
            {/* 로고 */}
            <Typography
              variant="h4"
              sx={{
                color: isScrolled ? '#00136C' : 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Enitec
            </Typography>

            {/* 네비게이션 - 데스크톱에서만 표시 */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
              <Typography sx={{ color: isScrolled ? '#00136C' : 'white', cursor: 'pointer' }}>
                Who We Are
              </Typography>
              <Typography sx={{ color: isScrolled ? '#00136C' : 'white', cursor: 'pointer' }}>
                What We Do
              </Typography>
              <Typography sx={{ color: isScrolled ? '#00136C' : 'white', cursor: 'pointer' }}>
                Media
              </Typography>
              <Typography sx={{ color: isScrolled ? '#00136C' : 'white', cursor: 'pointer' }}>
                Investors
              </Typography>
              <Typography sx={{ color: isScrolled ? '#00136C' : 'white', cursor: 'pointer' }}>
                Careers
              </Typography>
            </Box>

            {/* 우측 아이콘들 */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {/* <Typography sx={{ color: isScrolled ? '#00136C' : 'white', cursor: 'pointer' }}>
                KO
              </Typography>
              <Typography sx={{ color: isScrolled ? '#00136C' : 'white', cursor: 'pointer' }}>
                🔍
              </Typography> */}
              {/* 햄버거 메뉴 - 모바일에서만 표시 */}
              <Typography 
                sx={{ 
                  color: isScrolled ? '#00136C' : 'white', 
                  cursor: 'pointer',
                  display: { xs: 'block', md: 'none' }
                }}
                onClick={() => setIsMenuOpen(true)}
              >
                ☰
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 모바일 메뉴 Drawer - 오른쪽에서 왼쪽으로 */}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            backgroundColor: 'white',
            boxShadow: 'none'
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* 닫기 버튼 */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography
              sx={{
                color: '#FF3B30',
                fontSize: '2rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              ✕
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography sx={{ color: '#00136C', fontWeight: 'bold' }}>Ko</Typography>
              <Typography sx={{ color: '#666' }}>|</Typography>
              <Typography sx={{ color: '#666' }}>En</Typography>
            </Box>
          </Box>

          {/* 메뉴 아이템들 */}
          <List sx={{ mt: 4 }}>
            <ListItem sx={{ py: 2 }}>
              <ListItemText 
                primary="Who We Are" 
                sx={{ 
                  '& .MuiListItemText-primary': {
                    color: '#FF3B30',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }
                }}
              />
              <Typography sx={{ color: '#FF3B30' }}>▼</Typography>
            </ListItem>
            <ListItem sx={{ py: 2 }}>
              <ListItemText 
                primary="What We Do" 
                sx={{ 
                  '& .MuiListItemText-primary': {
                    color: '#FF3B30',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }
                }}
              />
              <Typography sx={{ color: '#FF3B30' }}>▼</Typography>
            </ListItem>
            <ListItem sx={{ py: 2 }}>
              <ListItemText 
                primary="Media" 
                sx={{ 
                  '& .MuiListItemText-primary': {
                    color: '#FF3B30',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }
                }}
              />
              <Typography sx={{ color: '#FF3B30' }}>▼</Typography>
            </ListItem>
            <ListItem sx={{ py: 2 }}>
              <ListItemText 
                primary="Investors" 
                sx={{ 
                  '& .MuiListItemText-primary': {
                    color: '#FF3B30',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }
                }}
              />
              <Typography sx={{ color: '#FF3B30' }}>↗</Typography>
            </ListItem>
            <ListItem sx={{ py: 2 }}>
              <ListItemText 
                primary="Careers" 
                sx={{ 
                  '& .MuiListItemText-primary': {
                    color: '#FF3B30',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }
                }}
              />
              <Typography sx={{ color: '#FF3B30' }}>↗</Typography>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Hero 섹션 */}
      <Box sx={{ height: '100vh', position: 'relative' }}>
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
              <Box
                sx={{
                  height: '100vh',
                  background: `linear-gradient(rgba(0,19,108,0.3), rgba(0,19,108,0.3)), url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <Container maxWidth="xl">
                  <Box sx={{ maxWidth: '600px' }}>
                    <Typography
                      variant="h1"
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: { xs: '2rem', md: '3.5rem' },
                        mb: 2
                      }}
                    >
                      {slide.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'white',
                        opacity: 0.9,
                        fontSize: { xs: '1rem', md: '1.5rem' }
                      }}
                    >
                      {slide.subtitle}
                    </Typography>
                  </Box>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 고정된 슬라이드 컨트롤 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            zIndex: 1001
          }}
        >
          {/* 슬라이드 인디케이터 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {heroSlides.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: index === currentSlide ? '40px' : '8px',
                  height: '8px',
                  backgroundColor: 'white',
                  borderRadius: index === currentSlide ? '4px' : '50%',
                  opacity: index === currentSlide ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => swiperRef.current?.swiper?.slideTo(index)}
              />
            ))}
          </Box>
          
          {/* 슬라이드 컨트롤 버튼 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              sx={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                opacity: 0.8,
                transition: 'all 0.3s ease',
                transform: slideDirection === 'left' ? 'translateX(-3px)' : 'translateX(0)',
                '&:hover': { 
                  opacity: 1,
                  transform: slideDirection === 'left' ? 'translateX(-5px)' : 'translateX(-2px)'
                }
              }}
              onClick={() => swiperRef.current?.swiper?.slidePrev()}
            >
              ‹
            </Typography>
            
            {/* 재생/일시정지 버튼 */}
            <Typography
              sx={{
                color: 'white',
                fontSize: '1.2rem',
                cursor: 'pointer',
                opacity: 0.8,
                transition: 'opacity 0.3s ease',
                '&:hover': { opacity: 1 }
              }}
              onClick={toggleAutoplay}
            >
              {isAutoplay ? '❚❚' : '►'}
            </Typography>
            
            <Typography
              sx={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                opacity: 0.8,
                transition: 'all 0.3s ease',
                transform: slideDirection === 'right' ? 'translateX(3px)' : 'translateX(0)',
                '&:hover': { 
                  opacity: 1,
                  transform: slideDirection === 'right' ? 'translateX(5px)' : 'translateX(2px)'
                }
              }}
              onClick={() => swiperRef.current?.swiper?.slideNext()}
            >
              ›
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Latest News 섹션 */}
      <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{
              color: '#00136C',
              fontWeight: 'bold',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Latest News
          </Typography>
          
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 }
            }}
            navigation
            style={{ padding: '20px 0' }}
          >
            {latestNews.map((news) => (
              <SwiperSlide key={news.id}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 200,
                      backgroundColor: '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {news.thumbnail}
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#FF3B30',
                        fontWeight: 'bold',
                        mb: 1,
                        display: 'block'
                      }}
                    >
                      {news.category}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#00136C',
                        fontWeight: 'bold',
                        mb: 2,
                        lineHeight: 1.3
                      }}
                    >
                      {news.title}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: '#FF3B30',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {news.type}
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>

      {/* Hyper-Connected Solutions 섹션 */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{
              color: '#00136C',
              fontWeight: 'bold',
              mb: 6,
              textAlign: 'center'
            }}
          >
            Hyper-Connected Solutions
          </Typography>
          
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)'
              },
              gap: 4
            }}
          >
            {solutions.map((solution) => (
              <Box
                key={solution.id}
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: '3rem',
                    mb: 2
                  }}
                >
                  {solution.icon}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#00136C',
                    fontWeight: 'bold',
                    mb: 2
                  }}
                >
                  {solution.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  {solution.description}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#00136C',
                    borderColor: '#00136C',
                    '&:hover': {
                      backgroundColor: '#00136C',
                      color: 'white'
                    }
                  }}
                >
                  Read More
                </Button>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Global Presence 섹션 */}
      <Box
        ref={ref}
        sx={{
          py: 8,
          backgroundColor: '#00136C',
          color: 'white'
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              mb: 6,
              textAlign: 'center'
            }}
          >
            Global Presence
          </Typography>
          
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, 1fr)'
              },
              gap: 4,
              mb: 6
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2rem', md: '3rem' },
                  mb: 1
                }}
              >
                {counterValues.channels.toLocaleString()}
              </Typography>
              <Typography variant="h6">판매채널</Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2rem', md: '3rem' },
                  mb: 1
                }}
              >
                {counterValues.businesses}M
              </Typography>
              <Typography variant="h6">사업자</Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2rem', md: '3rem' },
                  mb: 1
                }}
              >
                {counterValues.countries}
              </Typography>
              <Typography variant="h6">국가</Typography>
            </Box>
          </Box>
          
          <Box
            sx={{
              height: 300,
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6">World Map</Typography>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#00136C', color: 'white', py: 6 }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(4, 1fr)'
              },
              gap: 4,
              mb: 6
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Who We Are
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                About Us
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Leadership
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Culture
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                What We Do
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Solutions
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Technology
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Innovation
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Media
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Press Releases
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Blog
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                News
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Investors
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Financial Reports
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Stock Information
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                IR Contact
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', pt: 4 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                © Enitec Co. Ltd.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  info@enitec.com
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  📷
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default EnitecHome;
