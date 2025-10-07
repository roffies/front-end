import { createI18n } from 'vue-i18n'
import en from './locales/en.js'
import es from './locales/es.js'

const messages = {
  en,
  es,
}

const getInitialLocale = () => {
  const savedLanguage = localStorage.getItem('smartcare_language')
  return savedLanguage || 'es'
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  globalInjection: true,
  messages,
})
