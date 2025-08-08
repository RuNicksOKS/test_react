import React, { useState } from "react";
import { Container, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import styles from "./Navigation.module.css";

interface NavigationProps {
  isScrolled: boolean;
}

interface MenuItem {
  label: string;
  subItems: string[];
}

const Navigation: React.FC<NavigationProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      label: "Who We Are",
      subItems: ["About Us", "Leadership", "Brand Center"]
    },
    {
      label: "What We Do",
      subItems: ["Solutions", "Technology", "Innovation"]
    },
    {
      label: "Media",
      subItems: ["Press Releases", "Blog", "News"]
    },
    {
      label: "Investors",
      subItems: ["Financial Reports", "Stock Information", "IR Contact"]
    },
    {
      label: "Careers",
      subItems: ["Job Openings", "Culture", "Benefits"]
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
      <div className={`${styles.header} ${isScrolled ? styles.headerScrolled : styles.headerTransparent}`}>
        <Container maxWidth="xl">
          <div className={styles.headerContent}>
            {/* 로고 */}
            <Typography
              variant="h4"
              className={`${styles.logo} ${isScrolled ? styles.logoScrolled : styles.logoTransparent}`}
            >
              Enitec
            </Typography>

            {/* 네비게이션 - 데스크톱에서만 표시 */}
            <div className={styles.navigation}>
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className={styles.navigationItemContainer}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Typography 
                    className={`${styles.navigationItem} ${isScrolled ? styles.navigationItemScrolled : styles.navigationItemTransparent}`}
                  >
                    {item.label}
                  </Typography>
                  
                  {/* 드롭다운 메뉴 */}
                  {hoveredItem === item.label && (
                    <div className={styles.dropdownMenu}>
                      {item.subItems.map((subItem) => (
                        <Typography
                          key={subItem}
                          className={styles.dropdownItem}
                        >
                          {subItem}
                        </Typography>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 우측 아이콘들 */}
            <div className={styles.rightIcons}>
              {/* 햄버거 메뉴 - 모바일에서만 표시 */}
              <Typography 
                className={`${styles.hamburgerMenu} ${isScrolled ? styles.hamburgerMenuScrolled : styles.hamburgerMenuTransparent}`}
                onClick={() => setIsMenuOpen(true)}
              >
                ☰
              </Typography>
            </div>
          </div>
        </Container>
      </div>

      {/* 모바일 메뉴 Drawer - 오른쪽에서 왼쪽으로 */}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        classes={{
          paper: styles.mobileMenu
        }}
      >
        <div className={styles.mobileMenuContent}>
          {/* 닫기 버튼 */}
          <div className={styles.mobileMenuHeader}>
            <Typography
              className={styles.closeButton}
              onClick={() => setIsMenuOpen(false)}
            >
              ✕
            </Typography>
          </div>

          {/* 메뉴 아이템들 */}
          <List className={styles.menuList}>
            {menuItems.map((item) => (
              <div key={item.label} className={styles.mobileMenuItem}>
                <ListItem 
                  className={styles.menuItem}
                  onClick={() => toggleExpandedItem(item.label)}
                >
                  <ListItemText 
                    primary={item.label} 
                    classes={{ primary: styles.menuItemText }}
                  />
                  <div 
                    className={`${styles.chevronIcon} ${isItemExpanded(item.label) ? styles.chevronIconExpanded : ''}`}
                  />
                </ListItem>
                
                {/* 세부 항목들 */}
                {isItemExpanded(item.label) && (
                  <div className={styles.mobileSubItems}>
                    {item.subItems.map((subItem) => (
                      <Typography
                        key={subItem}
                        className={styles.mobileSubItem}
                      >
                        {subItem}
                      </Typography>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Navigation;