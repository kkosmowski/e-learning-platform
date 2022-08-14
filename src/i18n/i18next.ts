import i18next, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from './en-US.json';
import plPL from './pl-PL.json';

const resources = {
  en: enUS,
  pl: plPL,
};

const options: InitOptions = {
  lng: 'en',
  resources,
  interpolation: {
    escapeValue: false,
  },
};

void i18next.use(initReactI18next).init(options);

export default i18next;
