<template>
  <pv-split-button
    :label="getLanguageLabel(selectedLanguage)"
    :model="menuItems"
    :aria-label="$t('aria.languageSelector')"
    outlined
    severity="secondary"
  >
    <template #default>
      <span :class="getLanguageFlag(selectedLanguage)" class="language-flag"></span>
      <span>{{ getLanguageLabel(selectedLanguage) }}</span>
    </template>

    <template #item="{ item }">
      <div class="language-menu-item" @click="selectLanguage(item.code)">
        <span :class="getLanguageFlag(item.code)" class="language-flag"></span>
        <span>{{ item.label }}</span>
      </div>
    </template>
  </pv-split-button>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const selectedLanguage = ref(locale.value)

const languageOptions = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
]

const menuItems = languageOptions.map((option) => ({
  label: option.label,
  code: option.code,
  flag: option.flag,
  command: () => selectLanguage(option.code),
}))

const selectLanguage = (code) => {
  selectedLanguage.value = code
  locale.value = code
  localStorage.setItem('smartcare_language', code)
}

const getLanguageFlag = (code) => {
  const flagMap = {
    es: 'flag flag-es',
    en: 'flag flag-gb',
  }
  return flagMap[code] || 'flag'
}

const getLanguageLabel = (code) => {
  const language = languageOptions.find((lang) => lang.code === code)
  return language ? language.label : code.toUpperCase()
}
</script>

<style scoped>
.language-flag {
  width: 20px !important;
  height: 14px !important;
}

.language-menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.75rem 1rem;
  transition: background-color 0.2s ease;
}
</style>
