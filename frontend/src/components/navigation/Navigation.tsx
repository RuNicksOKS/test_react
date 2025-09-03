import React, { useState } from "react";
import { Container, Typography, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Styled Components
const Header = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isScrolled'
})<{ isScrolled: boolean }>(({ theme, isScrolled }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  transition: 'all 0.3s ease',
  fontFamily: "'Noto Sans JP', sans-serif",
  backgroundColor: isScrolled ? 'white' : 'transparent',
  boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
}));

const HeaderContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 0'
}));

const Logo = styled('img')(({ theme }) => ({
  height: '40px',
  width: 'auto',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
}));

const NavigationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '100px',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const NavigationItemContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer'
}));

const NavigationItem = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isScrolled'
})<{ isScrolled: boolean }>(({ theme, isScrolled }) => ({
  cursor: 'pointer',
  transition: 'color 0.3s ease',
  padding: '8px 0',
  position: 'relative',
  fontFamily: "'Noto Sans JP', sans-serif",
  fontSize: '1.1rem',
  fontWeight: '550',
  color: isScrolled ? '#00136C' : 'white'
}));

const DropdownMenu = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: '-16px',
  backgroundColor: 'white',
  borderRadius: '0 0 8px 8px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  padding: '8px 0 16px 0',
  minWidth: '200px',
  opacity: 0,
  transform: 'translateY(-10px)',
  animation: 'slideDown 0.3s ease forwards',
  zIndex: 1001,
  borderTop: '2px solid #00136C',
  '@keyframes slideDown': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-10px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
}));

const DropdownItem = styled(Typography)(({ theme }) => ({
  padding: '12px 24px',
  color: '#666',
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'block',
  position: 'relative',
  fontFamily: "'Noto Sans JP', sans-serif",
  '&:hover': {
    backgroundColor: '#f8f9fa',
    color: '#00136C',
    paddingLeft: '28px',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '3px',
      backgroundColor: '#00136C'
    }
  }
}));

const RightIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  alignItems: 'center'
}));

const HamburgerMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isScrolled' && prop !== 'isOpen'
})<{ isScrolled: boolean; isOpen: boolean }>(({ theme, isScrolled, isOpen }) => ({
  cursor: 'pointer',
  color: isOpen ? '#00136C' : (isScrolled ? '#00136C' : 'white'),
  width: '30px',
  height: '30px',
  position: 'fixed',
  top: '20px',
  right: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999999,
  [theme.breakpoints.up('md')]: {
    display: 'none'
  },
  [theme.breakpoints.down('md')]: {
    display: 'flex'
  },
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '20px',
    height: '2px',
    backgroundColor: isOpen ? '#00136C' : 'currentColor',
    transition: 'all 0.3s ease',
    transformOrigin: 'center'
  },
  '&::before': {
    transform: isOpen ? 'rotate(45deg)' : 'translateY(-6px)'
  },
  '&::after': {
    transform: isOpen ? 'rotate(-45deg)' : 'translateY(6px)'
  },
  '& > span': {
    width: '20px',
    height: '2px',
    backgroundColor: isOpen ? '#00136C' : 'currentColor',
    transition: 'all 0.3s ease',
    opacity: isOpen ? 0 : 1,
    transform: isOpen ? 'scale(0)' : 'scale(1)'
  }
}));

const MobileMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOpen'
})<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  width: '68.67%',
  height: '100%',
  backgroundColor: '#f8f9fa',
  transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
  transition: 'transform 0.3s ease-in-out',
  zIndex: 100,
  boxShadow: isOpen ? '0 0 20px rgba(0,0,0,0.3)' : 'none',
  overflowY: 'auto',
  overflowX: 'hidden'
}));

const MobileMenuContent = styled(Box)(({ theme }) => ({
  padding: '24px',
  minHeight: '100%',
  backgroundColor: '#f8f9fa'
}));

const MenuList = styled(List)(({ theme }) => ({
  marginTop: '70px'
}));

const MobileMenuItem = styled(Box)(({ theme }) => ({
  marginBottom: '16px'
}));

const StyledMenuItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '0',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  border: '1px solid #e9ecef',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f8f9fa',
    boxShadow: '0 6px 25px rgba(0,0,0,0.12)'
  }
}));

const MenuItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    color: '#00136C',
    fontSize: '1.2rem',
    fontWeight: 600,
    fontFamily: "'Noto Sans JP', sans-serif",
    margin: 0
  }
}));

const ChevronIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded'
})<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
  width: '24px',
  height: '24px',
  position: 'relative',
  marginLeft: '12px',
  transition: 'transform 0.3s ease',
  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#00136C',
  '&::before': {
    content: '""',
    width: '12px',
    height: '12px',
    borderRight: '2px solid #00136C',
    borderBottom: '2px solid #00136C',
    transform: 'rotate(45deg)',
    transition: 'transform 0.3s ease'
  }
}));

const MobileSubItems = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '16px',
  margin: '8px 0 0 0',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  border: '1px solid #e9ecef',
  animation: 'slideDownMobile 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
  '@keyframes slideDownMobile': {
    '0%': {
      opacity: 0,
      maxHeight: 0,
      transform: 'translateY(-10px)'
    },
    '100%': {
      opacity: 1,
      maxHeight: '300px',
      transform: 'translateY(0)'
    }
  }
}));

const MobileSubItem = styled(Typography)(({ theme }) => ({
  padding: '16px 24px',
  color: '#555',
  fontSize: '0.95rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  borderBottom: '1px solid #f8f9fa',
  fontFamily: "'Noto Sans JP', sans-serif",
  lineHeight: 1.6,
  '&:last-child': {
    borderBottom: 'none'
  },
  '&:hover': {
    backgroundColor: '#f8f9fa',
    color: '#00136C',
    paddingLeft: '32px'
  }
}));

interface NavigationProps {
  isScrolled: boolean;
}

interface MenuItem {
  label: string;
  subItems: string[];
}

const Navigation: React.FC<NavigationProps> = ({ isScrolled }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // 스크롤 함수
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 120; // 네비게이션 바 높이 + 여유 공간
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // 메인 항목 클릭 핸들러
  const handleMainItemClick = (itemLabel: string) => {
    if (itemLabel === "会社情報") {
      navigate('/company');
    } else if (itemLabel === "事業分野") {
      navigate('/business');
    } else if (itemLabel === "採用情報") {
      navigate('/recruitment');
    }
  };

  // 서브 항목 클릭 핸들러
  const handleSubItemClick = (subItem: string) => {
    if (subItem === "代表の一言") {
      navigate('/company');
      setTimeout(() => scrollToSection('ceo-message'), 100);
    } else if (subItem === "企業理念") {
      navigate('/company');
      setTimeout(() => scrollToSection('corporate-philosophy'), 100);
    } else if (subItem === "会社概要") {
      navigate('/company');
      setTimeout(() => scrollToSection('company-summary'), 100);
    } else if (subItem === "沿革") {
      navigate('/company');
      setTimeout(() => scrollToSection('company-history'), 100);
    } else if (subItem === "SI事業") {
      navigate('/business');
      setTimeout(() => scrollToSection('si-business'), 100);
    } else if (subItem === "ソリューション") {
      navigate('/business');
      setTimeout(() => scrollToSection('solutions'), 100);
    } else if (subItem === "人材像") {
      navigate('/recruitment');
      setTimeout(() => scrollToSection('ideal-candidate'), 100);
    } else if (subItem === "福利厚生") {
      navigate('/recruitment');
      setTimeout(() => scrollToSection('benefits'), 100);
    } else if (subItem === "採用案内") {
      navigate('/recruitment');
      setTimeout(() => scrollToSection('recruitment-info'), 100);
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: "会社情報",
      subItems: ["代表の一言", "企業理念", "会社概要", "沿革"]
    },
    {
      label: "事業分野",
      subItems: ["SI事業", "ソリューション"]
    },
    {
      label: "採用情報",
      subItems: ["人材像", "福利厚生", "採用案内"]
    }
  ];

  const toggleExpandedItem = (itemLabel: string) => {
    setExpandedItems(prev => 
      prev.includes(itemLabel) 
        ? prev.filter(item => item !== itemLabel)
        : [...prev, itemLabel]
    );
  };

  const isItemExpanded = (itemLabel: string) => {
    return expandedItems.includes(itemLabel);
  };

  return (
    <>
      {/* 헤더 */}
      <Header isScrolled={isScrolled}>
        <Container maxWidth="xl">
          <HeaderContent>
            {/* 로고 */}
            <Logo
              src="/logo.png"
              alt="Enitec"
              onClick={() => navigate('/')}
            />

            {/* 네비게이션 - 데스크톱에서만 표시 */}
            <NavigationContainer>
              {menuItems.map((item) => (
                <NavigationItemContainer
                  key={item.label}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <NavigationItem 
                    isScrolled={isScrolled}
                    onClick={() => handleMainItemClick(item.label)}
                  >
                    {item.label}
                  </NavigationItem>
                  
                  {/* 드롭다운 메뉴 */}
                  {hoveredItem === item.label && (
                    <DropdownMenu>
                      {item.subItems.map((subItem) => (
                        <DropdownItem
                          key={subItem}
                          onClick={() => handleSubItemClick(subItem)}
                        >
                          {subItem}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </NavigationItemContainer>
              ))}
            </NavigationContainer>

            {/* 우측 아이콘들 */}
            <RightIcons>
              {/* 햄버거 메뉴 - 모바일에서만 표시 */}
              <HamburgerMenu 
                isScrolled={isScrolled}
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span></span>
              </HamburgerMenu>
            </RightIcons>
          </HeaderContent>
        </Container>
      </Header>

      {/* 모바일 메뉴 - 오른쪽에서 왼쪽으로 */}
      <MobileMenu isOpen={isMenuOpen}>
        <MobileMenuContent>
          {/* 메뉴 아이템들 */}
          <MenuList>
            {menuItems.map((item) => (
              <MobileMenuItem key={item.label}>
                                 <StyledMenuItem 
                   onClick={() => toggleExpandedItem(item.label)}
                 >
                  <MenuItemText primary={item.label} />
                  <ChevronIcon isExpanded={isItemExpanded(item.label)} />
                </StyledMenuItem>
                
                {/* 세부 항목들 */}
                {isItemExpanded(item.label) && (
                  <MobileSubItems>
                    {item.subItems.map((subItem) => (
                      <MobileSubItem
                        key={subItem}
                        onClick={() => {
                          handleSubItemClick(subItem);
                          setIsMenuOpen(false);
                        }}
                      >
                        {subItem}
                      </MobileSubItem>
                    ))}
                  </MobileSubItems>
                )}
              </MobileMenuItem>
            ))}
          </MenuList>
        </MobileMenuContent>
      </MobileMenu>
      
      {/* 배경 오버레이 */}
      {isMenuOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 99,
            cursor: 'pointer'
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;