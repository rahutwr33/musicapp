import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import storage from '../utils/storage';
import en from './locales/en.json';
import he from './locales/heb.json';

const langs = {
  en,
  he,
};

const resources = {
  en: {
    translation: en,
  },
  he: {
    translation: he,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});
export const loadLang = async (lang = 'he') => {
  let currentlang = await storage.get('defaultlang');
  return langs[currentlang];
};
export default i18n;
