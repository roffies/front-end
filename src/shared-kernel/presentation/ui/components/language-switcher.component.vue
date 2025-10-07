<template>
  <div class="language-switcher">
    <pv-dropdown
      v-model="selectedLanguage"
      :options="languageOptions"
      option-label="label"
      option-value="code"
      :placeholder="$t('common.language')"
      :aria-label="$t('aria.languageSelector')"
      class="language-dropdown"
      @update:modelValue="changeLanguage"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="language-option">
          <span :class="getLanguageFlag(slotProps.value)"></span>
          <span>{{ getLanguageLabel(slotProps.value) }}</span>
        </div>
        <span v-else>{{ $t('common.language') }}</span>
      </template>

      <template #option="slotProps">
        <div class="language-option">
          <span :class="getLanguageFlag(slotProps.option.code)"></span>
          <span>{{ slotProps.option.label }}</span>
        </div>
      </template>
    </pv-dropdown>
  </div>
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

const changeLanguage = (value) => {
  locale.value = value
  localStorage.setItem('smartcare_language', value)
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
.language-switcher {
  display: flex;
  align-items: center;
}

.language-dropdown {
  min-width: 120px;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.language-option i {
  font-size: 0.875rem;
}

.language-option .flag {
  width: 20px !important;
  height: 14px !important;
  background-size: 100% !important;
  flex-shrink: 0 !important;
}

.p-dropdown {
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  background: white;
  min-height: 40px;
}

.p-dropdown:not(.p-disabled):hover {
  border-color: var(--color-primary);
}

.p-dropdown:not(.p-disabled).p-focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(66, 103, 102, 0.1);
}

.p-dropdown-panel {
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.p-dropdown-item {
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin: 0.25rem;
}

.p-dropdown-item:hover {
  background-color: var(--color-gray-100);
}

.p-dropdown-item.p-highlight {
  background-color: var(--color-primary);
  color: white;
}
</style>
