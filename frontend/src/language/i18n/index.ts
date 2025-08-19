import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


// 언어 리소스
import en from './locales/en.json';
import ko from './locales/ko.json';
import ja from './locales/ja.json';

const resources = {
  en: {
    translation: en
  },
  ko: {
    translation: ko
  },
  ja: {
    translation: ja
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko', // 강제로 한국어 설정
    fallbackLng: 'ko',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React는 이미 XSS를 방지하므로 false
    },
    
    detection: {
      order: ['htmlTag'],
      caches: [],
    },
  });

export default i18n;
