import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from './GoogleMap.module.css';

interface GoogleMapProps {
  title?: string;
  height?: string;
  width?: string;
  className?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  language?: string;
  margin?: string;
  padding?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
}

// Styled Components
const MapTitle = styled(Typography)`
  margin-bottom: 20px !important;
  text-align: center !important;
  color: #00136C !important;
  font-weight: bold !important;
`;

const GoogleMap: React.FC<GoogleMapProps> = ({ 
  title = "Global Presence",
  height = "400px",
  width = "100%",
  className = "",
  address = "Tokyo, Japan",
  latitude = 35.674279067542734,
  longitude = 139.66539339810726,
  zoom = 12,
  language = "ja",
  margin,
  padding,
  maxWidth,
  minHeight,
  maxHeight
}) => {
  // 주소를 URL 인코딩
  const encodedAddress = encodeURIComponent(address);
  
  // Google Maps API 키를 환경변수에서 가져오기
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
  // Google Maps Embed API URL 생성
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}&center=${latitude},${longitude}&zoom=${zoom}&language=${language}`;
  
  // API 키가 없을 경우를 위한 fallback URL
  const fallbackUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.297675366!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca158e1df9ffd%3A0x7c66a5a2e5c3b8a1!2s${encodedAddress}!5e0!3m2!1s${language}!2s${language}!4v1234567890&hl=${language}&language=${language}&region=${language}&z=${zoom}&t=m&q=${encodedAddress}`;
  
  // API 키가 있으면 mapUrl, 없으면 fallbackUrl 사용
  const finalMapUrl = apiKey ? mapUrl : fallbackUrl;
  
  return (
    <div 
      className={`${styles.googleMapContainer} ${className}`}
      style={{ width, height, margin, padding, maxWidth, minHeight, maxHeight }}
    >
      <MapTitle variant="h6">
        {title}
      </MapTitle>
      <div 
        className={styles.mapWrapper} 
        style={{ height: `calc(${height} - 100px)`, width: '100%' }}
      >
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={finalMapUrl}
          title={`${title} - ${address}`}
          className={styles.googleMapIframe}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
        />
      </div>
    </div>
  );
};

export default GoogleMap;
