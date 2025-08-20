import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import styles from './Copyright.module.css';

const Copyright: React.FC = () => {
  return (
    <div className={styles.container}>
      <Container maxWidth="xl">
        <Typography variant="h1" className={styles.title}>
          저작권 및 라이선스
        </Typography>
        
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h2" sx={{ fontSize: '1.5rem', mb: 2 }}>
            웹사이트 저작권
          </Typography>
          <Typography variant="body1" className={styles.content}>
            © 2024 Enitec. 모든 권리 보유.
          </Typography>
          <Typography variant="body1" className={styles.content}>
            이 웹사이트의 모든 콘텐츠, 디자인, 코드는 Enitec의 지적재산권입니다.
          </Typography>
        </Box>

        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h2" sx={{ fontSize: '1.5rem', mb: 2 }}>
            사용된 라이브러리 및 리소스
          </Typography>
          
          <Typography variant="h3" sx={{ fontSize: '1.2rem', mb: 1, mt: 2 }}>
            React
          </Typography>
          <Typography variant="body1" className={styles.content}>
            MIT License - <Link href="https://opensource.org/licenses/MIT" target="_blank">라이선스 보기</Link>
          </Typography>

          <Typography variant="h3" sx={{ fontSize: '1.2rem', mb: 1, mt: 2 }}>
            Material-UI (MUI)
          </Typography>
          <Typography variant="body1" className={styles.content}>
            MIT License - <Link href="https://github.com/mui/material-ui/blob/master/LICENSE" target="_blank">라이선스 보기</Link>
          </Typography>

          <Typography variant="h3" sx={{ fontSize: '1.2rem', mb: 1, mt: 2 }}>
            FontAwesome
          </Typography>
          <Typography variant="body1" className={styles.content}>
            Free License - <Link href="https://fontawesome.com/license" target="_blank">라이선스 보기</Link>
          </Typography>

          <Typography variant="h3" sx={{ fontSize: '1.2rem', mb: 1, mt: 2 }}>
            Google Fonts
          </Typography>
          <Typography variant="body1" className={styles.content}>
            Apache License 2.0 - <Link href="https://fonts.google.com/icons" target="_blank">라이선스 보기</Link>
          </Typography>

          <Typography variant="h3" sx={{ fontSize: '1.2rem', mb: 1, mt: 2 }}>
            GSAP
          </Typography>
          <Typography variant="body1" className={styles.content}>
            Standard License - <Link href="https://greensock.com/standard-license/" target="_blank">라이선스 보기</Link>
          </Typography>
        </Box>

        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h2" sx={{ fontSize: '1.5rem', mb: 2 }}>
            문의사항
          </Typography>
          <Typography variant="body1" className={styles.content}>
            저작권 관련 문의사항이 있으시면 contact@enitec.com으로 연락해 주세요.
          </Typography>
        </Box>

        https://unsplash.com/license
        https://fontawesome.com/license
      </Container>
    </div>
  );
};

export default Copyright;
