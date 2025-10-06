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
        <span>SmartCare</span>
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

<style lang="scss" scoped>
.layout-topbar {
  position: fixed;
  height: 4rem;
  z-index: 997;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0 2rem;
  background-color: var(--surface-card);
  transition: left var(--layout-section-transition-duration);
  display: flex;
  align-items: center;
}

.layout-topbar-logo-container {
  width: 20rem;
  display: flex;
  align-items: center;
}

.layout-topbar-logo {
  display: inline-flex;
  align-items: center;
  font-size: 1.5rem;
  border-radius: var(--content-border-radius);
  color: var(--text-color);
  font-weight: 500;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-image {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
}

.layout-topbar-action {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--text-color);
  transition: background-color var(--element-transition-duration);
  cursor: pointer;
  border: none;
  background: transparent;
}

.layout-topbar-action:hover {
  background-color: var(--surface-hover);
}

.layout-topbar-action:focus-visible {
  outline-width: var(--focus-ring-width);
  outline-style: var(--focus-ring-style);
  outline-color: var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
  box-shadow: var(--focus-ring-shadow);
  transition:
    box-shadow var(--transition-duration),
    outline-color var(--transition-duration);
}

.layout-topbar-action i {
  font-size: 1.25rem;
}

.layout-topbar-action span {
  font-size: 1rem;
  display: none;
}

.layout-menu-button {
  margin-right: 0.5rem;
}

.layout-topbar-menu-button {
  display: none;
}

.layout-topbar-actions {
  margin-left: auto;
  display: flex;
  gap: 1rem;
}

@media (max-width: 991px) {
  .layout-topbar {
    padding: 0 2rem;
  }

  .layout-topbar-logo-container {
    width: auto;
  }

  .layout-menu-button {
    margin-left: 0;
    margin-right: 0.5rem;
  }
}
</style>

