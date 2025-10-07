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
