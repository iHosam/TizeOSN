import en from './en.js';
import ar from './ar.js';
import { configRead } from '../config.js';

const translations = { en, ar };

export function getCurrentLanguage() {
  const pref = configRead('language');
  if (pref === 'ar' || pref === 'en') return pref;

  // Auto-detect based on html lang, document direction, or navigator language
  const docLang = document.documentElement.lang || '';
  const docDir = document.documentElement.dir || '';
  const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();

  if (docLang.startsWith('ar') || docDir === 'rtl' || navLang.startsWith('ar')) {
    return 'ar';
  }
  return 'en';
}

export function t(key, fallback = '') {
  const lang = getCurrentLanguage();
  const dict = translations[lang] || translations.en;
  if (dict[key] !== undefined) {
    return dict[key];
  }
  if (translations.en[key] !== undefined) {
    return translations.en[key];
  }
  return fallback || key;
}

export function isRTL() {
  return getCurrentLanguage() === 'ar';
}
