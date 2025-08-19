import React from 'react';
import { Typography } from '@mui/material';
import styles from './GoogleMap.module.css';

interface GoogleMapProps {
  title?: string;
  height?: string;
  className?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  language?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ 
  title = "Global Presence",
  height = "1000px",
  className = "",
  address = "Tokyo, Japan",
  latitude = 35.674279067542734,
  longitude = 139.66539339810726,
  zoom = 12,
  language = "ja"
}) => {
  // 주소를 URL 인코딩
  const encodedAddress = encodeURIComponent(address);
  
  // 구글맵 URL 생성 (언어 설정 포함)
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}&center=${latitude},${longitude}&zoom=${zoom}&language=${language}`;
  
  // API 키 없이 사용하는 경우 (무료, 제한적) - 언어 설정 포함
  const fallbackUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.297675366!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca158e1df9ffd%3A0x7c66a5a2e5c3b8a1!2s${encodedAddress}!5e0!3m2!1s${language}!2s${language}!4v1234567890&hl=${language}&language=${language}&region=${language}`;
  
  return (
    <div className={`${styles.googleMapContainer} ${className}`}>
      <Typography variant="h6" className={styles.mapTitle}>
        {title}
      </Typography>
      <div className={styles.mapWrapper}>
        <iframe
          src={fallbackUrl}
          width="100%"
          height={height}
          style={{ border: 0, height: height }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${title} - ${address}`}
          className={styles.googleMapIframe}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
    </div>
  );
};

export default GoogleMap;
