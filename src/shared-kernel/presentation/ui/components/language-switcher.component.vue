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
          <i :class="getLanguageIcon(slotProps.value)"></i>
          <span>{{ getLanguageLabel(slotProps.value) }}</span>
        </div>
        <span v-else>{{ $t('common.language') }}</span>
      </template>

      <template #option="slotProps">
        <div class="language-option">
          <i :class="getLanguageIcon(slotProps.option.code)"></i>
          <span>{{ slotProps.option.label }}</span>
        </div>
      </template>
    </pv-dropdown>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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

const getLanguageIcon = (code) => {
  const language = languageOptions.find((lang) => lang.code === code)
  return language ? `pi pi-flag` : 'pi pi-globe'
}

const getLanguageLabel = (code) => {
  const language = languageOptions.find((lang) => lang.code === code)
  return language ? language.label : code.toUpperCase()
}

onMounted(() => {
  const savedLanguage = localStorage.getItem('smartcare_language')
  if (savedLanguage && languageOptions.some((lang) => lang.code === savedLanguage)) {
    selectedLanguage.value = savedLanguage
    locale.value = savedLanguage
  }
})
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

:deep(.p-dropdown) {
  border: 1px solid var(--color-gray-300) !important;
  border-radius: 8px !important;
  background: white !important;
  min-height: 40px !important;
}

:deep(.p-dropdown:not(.p-disabled):hover) {
  border-color: var(--color-primary) !important;
}

:deep(.p-dropdown:not(.p-disabled).p-focus) {
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 3px rgba(66, 103, 102, 0.1) !important;
}

:deep(.p-dropdown-panel) {
  border: 1px solid var(--color-gray-200) !important;
  border-radius: 8px !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
}

:deep(.p-dropdown-item) {
  padding: 0.75rem 1rem !important;
  border-radius: 4px !important;
  margin: 0.25rem !important;
}

:deep(.p-dropdown-item:hover) {
  background-color: var(--color-gray-100) !important;
}

:deep(.p-dropdown-item.p-highlight) {
  background-color: var(--color-primary) !important;
  color: white !important;
}
</style>
