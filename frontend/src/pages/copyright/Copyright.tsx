import React, { useState } from 'react';
import { Container, Typography, Box, Divider, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Styled Components
const CopyrightContainer = styled(Container)(({ theme }) => ({
  padding: '120px 0 80px 0',
  minHeight: '100vh',
  backgroundColor: '#f8f9fa'
}));

const CopyrightHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '60px',
  '& h1': {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#00136C',
    marginBottom: '20px',
    fontFamily: "'Noto Sans JP', sans-serif"
  },
  '& p': {
    fontSize: '1.1rem',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6
  }
}));

const CopyrightSection = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: '40px',
  marginBottom: '30px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  '& h2': {
    fontSize: '1.8rem',
    fontWeight: 600,
    color: '#00136C',
    marginBottom: '20px',
    fontFamily: "'Noto Sans JP', sans-serif"
  },
  '& h3': {
    fontSize: '1.3rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: '15px',
    marginTop: '25px',
    fontFamily: "'Noto Sans JP', sans-serif"
  },
  '& p': {
    fontSize: '1rem',
    color: '#555',
    lineHeight: 1.7,
    marginBottom: '15px',
    fontFamily: "'Noto Sans JP', sans-serif"
  },
  '& ul': {
    marginBottom: '20px',
    paddingLeft: '20px'
  },
  '& li': {
    fontSize: '1rem',
    color: '#555',
    lineHeight: 1.6,
    marginBottom: '8px',
    fontFamily: "'Noto Sans JP', sans-serif"
  }
}));


const LicenseBadge = styled(Box)<{ license: string }>(({ license }) => ({
  display: 'inline-block',
  padding: '10px 12px',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: 600,
  marginLeft: '12px',
  backgroundColor: 
    license === 'MIT' ? '#28a745' :
    license === 'Apache-2.0' ? '#007bff' :
    license === 'GPL-3.0' ? '#dc3545' :
    license === 'BSD-3-Clause' ? '#6f42c1' :
    '#6c757d',
  color: 'white'
}));

const LibraryCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '10px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  border: '1px solid #e9ecef',
  '& .card-header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0',
    paddingBottom: '16px',
    cursor: 'pointer',
    transition: 'margin-bottom 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  '& .card-header.expanded': {
    marginBottom: '0'
  },
  '& .card-header:not(.expanded)': {
    marginBottom: '-20px'
  },
  '& .card-title': {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#00136C',
    fontFamily: "'Noto Sans JP', sans-serif",
    margin: 0
  },
  '& .card-content': {
    overflow: 'hidden',
    transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '& .content-divider': {
      height: '2px',
      backgroundColor: '#f8f9fa',
      marginBottom: '16px'
    },
    '& h4': {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#333',
      marginBottom: '12px',
      marginTop: '16px',
      fontFamily: "'Noto Sans JP', sans-serif"
    },
    '& p': {
      fontSize: '0.95rem',
      color: '#555',
      lineHeight: 1.6,
      marginBottom: '12px',
      fontFamily: "'Noto Sans JP', sans-serif"
    },
    '& a': {
      color: '#007bff',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  '& .expand-icon': {
    transition: 'transform 0.3s ease',
    color: '#00136C'
  },
  '& .expand-icon.expanded': {
    transform: 'rotate(180deg)'
  }
}));

// LibraryCard 컴포넌트
interface LibraryCardProps {
  title: string;
  license: string;
  children: React.ReactNode;
}

const LibraryCardComponent: React.FC<LibraryCardProps> = ({ title, license, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <LibraryCard>
      <div className={`card-header ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpanded}>
        <Typography className="card-title">{title}</Typography>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LicenseBadge license={license}>{license}</LicenseBadge>
          <ExpandMoreIcon 
            className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
            sx={{ fontSize: '24px' }}
          />
        </div>
      </div>
              <div 
          className="card-content" 
          style={{ 
            maxHeight: isExpanded ? '1000px' : '0'
          }}
        >
          <div className="content-divider"></div>
          {children}
        </div>
    </LibraryCard>
  );
};

const Copyright: React.FC = () => {
  return (
    <CopyrightContainer maxWidth="lg">
      <CopyrightHeader>
        <Typography variant="h1">Copyright & Licenses</Typography>
        <Typography>
          This page provides copyright information for all open source libraries and resources used in this project.
        </Typography>
      </CopyrightHeader>

      {/* 프로젝트 정보 */}
      <CopyrightSection>
        <Typography variant="h2">Project Information</Typography>
        <Typography>
          <strong>Project Name:</strong> Enitec Website
        </Typography>
        <Typography>
          <strong>Version:</strong> 0.1.0
        </Typography>
        <Typography>
          <strong>Developer:</strong> Enitec Development Team
        </Typography>
        <Typography>
          <strong>Last Updated:</strong> 2025
        </Typography>
      </CopyrightSection>

      {/* 주요 라이브러리 */}
      <CopyrightSection>
        <Typography variant="h2">Main Libraries</Typography>
        
        {/* <LibraryCardComponent title="React & React Ecosystem" license="MIT">
          <Typography variant="h4">React</Typography>
          <Typography>
            <strong>License:</strong> MIT License
          </Typography>
          <Typography>
            <strong>Copyright:</strong> Meta Platforms, Inc.
          </Typography>
          <Typography>
            <strong>Description:</strong> JavaScript library for building user interfaces
          </Typography>
          <Typography>
            <strong>License URL:</strong> <a href="https://github.com/facebook/react/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">https://github.com/facebook/react/blob/main/LICENSE</a>
          </Typography>
        </LibraryCardComponent> */}

        <LibraryCardComponent title="Material-UI (MUI)" license="MIT">
          <Typography variant="h4">Material-UI</Typography>
          <Typography>
            <strong>License:</strong> MIT License
          </Typography>
          <Typography>
            <strong>Copyright:</strong> Material-UI SAS
          </Typography>
          <Typography>
            <strong>Description:</strong> Material Design component library for React
          </Typography>
          <Typography>
            <strong>License URL:</strong> <a href="https://github.com/mui/material-ui/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">https://github.com/mui/material-ui/blob/master/LICENSE</a>
          </Typography>
        </LibraryCardComponent>



        <LibraryCardComponent title="Swiper" license="MIT">
          <Typography variant="h4">Swiper</Typography>
          <Typography>
            <strong>License:</strong> MIT License
          </Typography>
          <Typography>
            <strong>Copyright:</strong> Vladimir Kharlampidi
          </Typography>
          <Typography>
            <strong>Description:</strong> Modern mobile touch slider
          </Typography>
          <Typography>
            <strong>License URL:</strong> <a href="https://github.com/nolimits4web/swiper/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">https://github.com/nolimits4web/swiper/blob/main/LICENSE</a>
          </Typography>
        </LibraryCardComponent>
      </CopyrightSection>

      {/* 개발 도구 */}
      {/* <CopyrightSection>
        <Typography variant="h2">Development Tools</Typography>
        <Typography>
          <strong>TypeScript:</strong> Apache License 2.0 - Microsoft Corporation
        </Typography>
        <Typography>
          <strong>React Scripts:</strong> MIT License - Facebook, Inc.
        </Typography>

      </CopyrightSection> */}

      {/* 폰트 및 리소스 */}
      {/* <CopyrightSection>
        <Typography variant="h2">Fonts & Resources</Typography>
        <Typography>
          <strong>Noto Sans JP:</strong> Apache License 2.0 - Google LLC
        </Typography>
        <Typography>
          <strong>Icons:</strong> Material-UI Icons (MIT License)
        </Typography>
      </CopyrightSection> */}

      {/* 이미지 및 일러스트레이션 */}
      <CopyrightSection>
        <Typography variant="h2">Images & Illustrations</Typography>
        
        <LibraryCardComponent title="Unsplash" license="MIT">
          <Typography variant="h4">Unsplash</Typography>
          <Typography>
            <strong>License:</strong> MIT License
          </Typography>
          <Typography>
            <strong>Copyright:</strong> Unsplash Inc.
          </Typography>
          <Typography>
            <strong>Description:</strong> High-quality free stock photo and image platform
          </Typography>
          <Typography>
            <strong>Usage:</strong> Latest news images
          </Typography>
          <Typography>
            <strong>License URL:</strong> <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">https://unsplash.com/license</a>
          </Typography>
          <Typography>
            <strong>License Features:</strong> Commercial use allowed, modification and distribution allowed, copyright notice required
          </Typography>
        </LibraryCardComponent>

        <LibraryCardComponent title="unDraw" license="MIT">
          <Typography variant="h4">unDraw</Typography>
          <Typography>
            <strong>License:</strong> MIT License
          </Typography>
          <Typography>
            <strong>Copyright:</strong> Katerina Limpitsouni
          </Typography>
          <Typography>
            <strong>Description:</strong> Open source illustrations and SVG graphics
          </Typography>
          <Typography>
            <strong>Usage:</strong> Various illustrations
          </Typography>
          <Typography>
            <strong>License URL:</strong> <a href="https://undraw.co/license" target="_blank" rel="noopener noreferrer">https://undraw.co/license</a>
          </Typography>
          <Typography>
            <strong>License Features:</strong> Commercial use allowed, modification and distribution allowed, copyright notice required, liability disclaimed
          </Typography>
        </LibraryCardComponent>
      </CopyrightSection>

      {/* 라이선스 요약 */}
      <CopyrightSection>
        <Typography variant="h2">License Summary</Typography>
        <Typography>
          This project consists mainly of open source libraries using MIT License, Apache License 2.0, and SIL Open Font License (OFL).
        </Typography>
        <Typography variant="h3">MIT License Key Features:</Typography>
        <ul>
          <li>Commercial use allowed</li>
          <li>Modification and distribution allowed</li>
          <li>Copyright notice required</li>
          <li>Liability disclaimed</li>
        </ul>
        <Typography variant="h3">Apache License 2.0 Key Features:</Typography>
        <ul>
          <li>Commercial use allowed</li>
          <li>Modification and distribution allowed</li>
          <li>Copyright notice required</li>
          <li>Patent rights specified</li>
          <li>Changes must be documented</li>
        </ul>
        <Typography variant="h3">SIL Open Font License (OFL) Key Features:</Typography>
        <ul>
          <li>Commercial use allowed</li>
          <li>Modification and distribution allowed</li>
          <li>Copyright notice required</li>
          <li>Font names must be changed if modified</li>
          <li>No warranty provided</li>
          <li>Designed specifically for fonts and related software</li>
        </ul>
      </CopyrightSection>

      {/* 면책 조항 */}
      <CopyrightSection>
        <Typography variant="h2">Disclaimer</Typography>
        <Typography>
          While we strive for accuracy in the information contained on this page, we do not guarantee completeness. 
          Please refer to the official repository of each project for the latest license information.
        </Typography>
        <Typography>
          In case of license violations or copyright issues, we will take immediate action to remove the relevant library 
          or replace it with an appropriate license.
        </Typography>
      </CopyrightSection>

      {/* 문의사항 */}
      <CopyrightSection>
        <Typography variant="h2">Contact Information</Typography>
        <Typography>
          For inquiries regarding copyright or licenses, please contact us at:
        </Typography>
        <Typography>
          <strong>Email:</strong> info@enitec.com
        </Typography>
        <Typography>
          <strong>Phone:</strong> 03-6276-6506
        </Typography>
      </CopyrightSection>

      <Divider sx={{ margin: '40px 0' }} />
      
      <Box sx={{ textAlign: 'center', color: '#666' }}>
        <Typography variant="body2">
          © 2025 Enitec. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ marginTop: '10px' }}>
          This page was last updated in 2025.
        </Typography>
      </Box>
    </CopyrightContainer>
  );
};

export default Copyright;
