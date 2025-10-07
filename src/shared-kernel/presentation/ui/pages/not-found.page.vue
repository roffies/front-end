<template>
  <div class="not-found" role="main" :aria-label="$t('aria.notFoundPage')">
    <div class="not-found-content">
      <div class="error-code" aria-hidden="true">{{ $t('errors.errorCode') }}</div>

      <div class="error-icon" aria-hidden="true">
        <i class="pi pi-exclamation-triangle"></i>
      </div>

      <h1 class="error-title">{{ $t('errors.pageNotFoundTitle') }}</h1>

      <p class="error-message">{{ $t('errors.pageNotFoundMessage') }}</p>

      <div class="error-actions">
        <pv-button
          :label="$t('errors.goToDashboard')"
          icon="pi pi-home"
          class="primary-btn"
          :aria-label="$t('aria.goToDashboard')"
          @click="goHome"
        />
        <pv-button
          :label="$t('errors.goBack')"
          icon="pi pi-arrow-left"
          class="secondary-btn"
          outlined
          :aria-label="$t('aria.goBack')"
          @click="goBack"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/driver/dashboard')
}

const goBack = () => {
  router.go(-1)
}
</script>
