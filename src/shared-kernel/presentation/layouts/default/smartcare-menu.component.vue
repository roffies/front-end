<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in menuItems" :key="item">
      <smartcare-menu-item v-if="!item.separator" :item="item" :index="i"></smartcare-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { layoutService } from '@/shared-kernel/infrastructure/layout/layout.service.js'
import { getMenuByRole } from '@/shared-kernel/infrastructure/menu/menu.config.js'
import SmartcareMenuItem from './smartcare-menu-item.component.vue'

const route = useRoute()
const { state } = layoutService
const menuItems = computed(() => state.menuItems)

const routeRole = computed(() => {
  if (route.path.startsWith('/driver')) {
    return 'driver'
  } else if (route.path.startsWith('/workshop')) {
    return 'workshop'
  }
  return 'driver'
})

const loadMenuItems = () => {
  if (state.menuLoaded && state.currentRole === routeRole.value) {
    return
  }

  const role = routeRole.value
  const items = getMenuByRole(role)

  layoutService.setMenuItems(items)
  layoutService.setCurrentRole(role)
  layoutService.setMenuLoaded(true)
}

onMounted(() => {
  loadMenuItems()
})
</script>
