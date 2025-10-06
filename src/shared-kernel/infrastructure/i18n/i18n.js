import { createI18n } from 'vue-i18n'
import en from './locales/en.js'
import es from './locales/es.js'

const messages = {
  en,
  es,
}

export const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: 'es',
  fallbackLocale: 'en',
  globalInjection: true, // Enable global $t
  messages,
})
