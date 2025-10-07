<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
        <i class="pi pi-bars"></i>
      </button>
      <router-link to="/" class="layout-topbar-logo">
        <img
          src="/src/assets/logos/smartcare-logo.png"
          :alt="$t('aria.smartcareLogo')"
          class="logo-image"
        />
        <span>{{ $t('common.appName') }}</span>
      </router-link>
    </div>

    <div class="layout-topbar-actions">
      <LanguageSwitcher />
    </div>
  </div>
</template>

<script setup>
import { layoutService } from '@/shared-kernel/infrastructure/layout/layout.service.js'
import LanguageSwitcher from '@/shared-kernel/presentation/ui/components/language-switcher.component.vue'

const { toggleMenu } = layoutService
</script>
