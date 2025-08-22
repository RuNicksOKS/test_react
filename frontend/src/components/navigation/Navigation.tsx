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

const HamburgerMenu = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isScrolled'
})<{ isScrolled: boolean }>(({ theme, isScrolled }) => ({
  cursor: 'pointer',
  color: isScrolled ? '#00136C' : 'white',
  [theme.breakpoints.up('md')]: {
    display: 'none'
  },
  [theme.breakpoints.down('md')]: {
    display: 'block'
  }
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    backgroundColor: 'white',
    boxShadow: 'none'
  }
}));

const MobileMenuContent = styled(Box)(({ theme }) => ({
  padding: '24px'
}));

const MobileMenuHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '32px'
}));

const CloseButton = styled(Typography)(({ theme }) => ({
  color: '#FF3B30',
  fontSize: '2rem',
  cursor: 'pointer',
  fontWeight: 'bold'
}));

const MenuList = styled(List)(({ theme }) => ({
  marginTop: '32px'
}));

const MobileMenuItem = styled(Box)(({ theme }) => ({
  marginBottom: '8px'
}));

const StyledMenuItem = styled(ListItem)(({ theme }) => ({
  padding: '16px 0',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f8f9fa'
  }
}));

const MenuItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    color: '#FF3B30',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: "'Noto Sans JP', sans-serif"
  }
}));

const ChevronIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded'
})<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
  width: '16px',
  height: '16px',
  position: 'relative',
  marginLeft: '8px',
  transition: 'transform 0.6s ease',
  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '80%',
    left: 0,
    width: '60%',
    height: '3px',
    backgroundColor: '#FF3B30',
    transform: 'translateY(-60%) rotate(45deg)',
    transformOrigin: 'right center'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '80%',
    right: 0,
    width: '60%',
    height: '3px',
    backgroundColor: '#FF3B30',
    transform: 'translateY(-60%) rotate(-45deg)',
    transformOrigin: 'left center'
  }
}));

const MobileSubItems = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  margin: '8px 0 16px 16px',
  overflow: 'hidden',
  animation: 'slideDownMobile 0.3s ease forwards',
  '@keyframes slideDownMobile': {
    '0%': {
      opacity: 0,
      maxHeight: 0,
      transform: 'translateY(-10px)'
    },
    '100%': {
      opacity: 1,
      maxHeight: '200px',
      transform: 'translateY(0)'
    }
  }
}));

const MobileSubItem = styled(Typography)(({ theme }) => ({
  padding: '12px 24px',
  color: '#666',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  borderBottom: '1px solid #e0e0e0',
  fontFamily: "'Noto Sans JP', sans-serif",
  '&:last-child': {
    borderBottom: 'none'
  },
  '&:hover': {
    backgroundColor: '#e8e8e8',
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
    } else if (subItem === "コンサルティング") {
      navigate('/business');
      setTimeout(() => scrollToSection('consulting'), 100);
    } else if (subItem === "人材像") {
      navigate('/recruitment');
      setTimeout(() => scrollToSection('ideal-candidate'), 100);
    } else if (subItem === "福利厚生") {
      navigate('/recruitment');
      setTimeout(() => scrollToSection('benefits'), 100);
    } else if (subItem === "募集案内") {
      navigate('/recruitment');
      setTimeout(() => scrollToSection('recruitment-info'), 100);
    } else if (subItem === "志願方法") {
      navigate('/recruitment');
      setTimeout(() => scrollToSection('application-method'), 100);
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: "会社情報",
      subItems: ["代表の一言", "企業理念", "会社概要", "沿革"]
    },
    {
      label: "事業分野",
      subItems: ["SI事業", "ソリューション", "コンサルティング"]
    },
    {
      label: "採用情報",
      subItems: ["人材像", "福利厚生", "募集案内", "志願方法"]
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
                onClick={() => setIsMenuOpen(true)}
              >
                ☰
              </HamburgerMenu>
            </RightIcons>
          </HeaderContent>
        </Container>
      </Header>

      {/* 모바일 메뉴 Drawer - 오른쪽에서 왼쪽으로 */}
      <StyledDrawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <MobileMenuContent>
          {/* 닫기 버튼 */}
          <MobileMenuHeader>
            <CloseButton
              onClick={() => setIsMenuOpen(false)}
            >
              ✕
            </CloseButton>
          </MobileMenuHeader>

          {/* 메뉴 아이템들 */}
          <MenuList>
            {menuItems.map((item) => (
              <MobileMenuItem key={item.label}>
                <StyledMenuItem 
                  onClick={() => {
                    handleMainItemClick(item.label);
                    setIsMenuOpen(false);
                  }}
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
      </StyledDrawer>
    </>
  );
};

export default Navigation;