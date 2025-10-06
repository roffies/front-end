<template>
  <div class="layout-wrapper" :class="containerClass">
    <smartcare-topbar></smartcare-topbar>
    <smartcare-sidebar></smartcare-sidebar>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
      <smartcare-footer></smartcare-footer>
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { layoutService } from '@/shared-kernel/infrastructure/layout/layout.service.js'
import SmartcareFooter from './smartcare-footer.component.vue'
import SmartcareSidebar from './smartcare-sidebar.component.vue'
import SmartcareTopbar from './smartcare-topbar.component.vue'

const { config: layoutConfig, state: layoutState, isSidebarActive } = layoutService

const outsideClickListener = ref(null)

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener()
  } else {
    unbindOutsideClickListener()
  }
})

const containerClass = computed(() => {
  return {
    'layout-overlay': layoutConfig.menuMode === 'overlay',
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-static-inactive':
      layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.staticMenuMobileActive,
  }
})

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive = false
        layoutState.staticMenuMobileActive = false
        layoutState.menuHoverActive = false
      }
    }
    document.addEventListener('click', outsideClickListener.value)
  }
}

function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener)
    outsideClickListener.value = null
  }
}

function isOutsideClicked(event) {
  const sidebarEl = document.querySelector('.layout-sidebar')
  const topbarEl = document.querySelector('.layout-menu-button')

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  )
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  min-height: 100vh;
}

.layout-main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  padding: 6rem 2rem 0 2rem;
  transition: margin-left var(--layout-section-transition-duration);
}

.layout-main {
  flex: 1 1 auto;
  padding-bottom: 2rem;
}

.layout-mask {
  display: none;
}

.layout-overlay .layout-main-container {
  margin-left: 0;
  padding-left: 2rem;
}

.layout-overlay .layout-sidebar {
  transform: translateX(-100%);
  left: 0;
  top: 0;
  height: 100vh;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-right: 1px solid var(--surface-border);
  transition:
    transform 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99),
    left 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99);
  box-shadow:
    0px 3px 5px rgba(0, 0, 0, 0.02),
    0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);
}

.layout-overlay.layout-overlay-active .layout-sidebar {
  transform: translateX(0);
}

.layout-static .layout-main-container {
  margin-left: 22rem;
}

.layout-static.layout-static-inactive .layout-sidebar {
  transform: translateX(-100%);
  left: 0;
}

.layout-static.layout-static-inactive .layout-main-container {
  margin-left: 0;
  padding-left: 2rem;
}

@media (max-width: 991px) {
  .blocked-scroll {
    overflow: hidden;
  }

  .layout-wrapper .layout-main-container {
    margin-left: 0;
    padding-left: 2rem;
  }

  .layout-wrapper .layout-sidebar {
    transform: translateX(-100%);
    left: 0;
    top: 0;
    height: 100vh;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transition:
      transform 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99),
      left 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99);
  }

  .layout-wrapper .layout-mask {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    width: 100%;
    height: 100%;
    background-color: var(--maskbg);
  }

  .layout-wrapper.layout-mobile-active .layout-sidebar {
    transform: translateX(0);
  }

  .layout-wrapper.layout-mobile-active .layout-mask {
    display: block;
  }
}

@media (min-width: 992px) {
  .layout-mask {
    display: none;
  }
}

@media screen and (min-width: 1960px) {
  .layout-main {
    width: 1504px;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}
</style>
