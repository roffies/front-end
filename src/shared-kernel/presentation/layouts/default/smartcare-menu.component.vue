<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in menuItems" :key="item">
      <smartcare-menu-item v-if="!item.separator" :item="item" :index="i"></smartcare-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { UserApiService } from '@/contexts/auth/infrastructure/user-api.service.js'
import { UserAssembler } from '@/contexts/auth/domain/user.assembler.js'
import { getMenuByRole } from '@/shared-kernel/infrastructure/menu/menu.config.js'
import SmartcareMenuItem from './smartcare-menu-item.component.vue'

const route = useRoute()
const menuItems = ref([])
const loading = ref(false)
const currentUserRole = ref(null)

const userService = new UserApiService()

const getUserRoleFromRoute = () => {
  if (route.path.startsWith('/driver')) {
    return 'driver'
  } else if (route.path.startsWith('/workshop')) {
    return 'workshop'
  }
  return 'driver'
}

const loadUserRole = async () => {
  loading.value = true

  try {
    const roleFromRoute = getUserRoleFromRoute()

    const usersResponse = await userService.getAll()
    const users = UserAssembler.toEntitiesFromResponse(usersResponse)

    const currentUser = users.find((user) => user.role === roleFromRoute)

    if (currentUser) {
      currentUserRole.value = currentUser.role
    } else {
      currentUserRole.value = roleFromRoute
    }

    updateMenuItems()
  } catch (error) {
    console.error('Error loading user role:', error)
    currentUserRole.value = getUserRoleFromRoute()
    updateMenuItems()
  } finally {
    loading.value = false
  }
}

const updateMenuItems = () => {
  if (currentUserRole.value) {
    menuItems.value = getMenuByRole(currentUserRole.value)
  }
}

onMounted(async () => {
  await loadUserRole()
})

watch(
  () => route.path,
  async () => {
    await loadUserRole()
  },
)
</script>

<style scoped>
.layout-menu {
  margin: 0;
  padding: 0;
  list-style-type: none;
  flex: 1;
}

.layout-menu .layout-root-menuitem {
  margin-bottom: 1.5rem;
}

.layout-menu .layout-root-menuitem > .layout-menuitem-root-text {
  font-size: 0.857rem;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--color-text);
  margin: 0.75rem 0;
  letter-spacing: 0.5px;
}

.layout-menu .layout-root-menuitem > a {
  display: none;
}

.layout-menu ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.layout-menu ul a {
  display: flex;
  align-items: center;
  position: relative;
  outline: 0 none;
  color: var(--color-text);
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  transition:
    background-color var(--transition-fast),
    box-shadow var(--transition-fast);
  text-decoration: none;
}

.layout-menu ul a .layout-menuitem-icon {
  margin-right: 0.75rem;
  color: var(--color-primary);
  font-size: 1rem;
}

.layout-menu ul a .layout-submenu-toggler {
  font-size: 0.75rem;
  margin-left: auto;
  transition: transform var(--transition-fast);
  color: var(--color-text-light);
}

.layout-menu ul a.active-route {
  font-weight: 600;
  color: var(--color-primary);
  background-color: var(--color-primary-light);
}

.layout-menu ul a:hover {
  background-color: var(--color-gray-50);
}

.layout-menu ul a:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.layout-menu ul ul {
  overflow: hidden;
  border-radius: var(--radius-md);
  margin-top: 0.5rem;
}

.layout-menu ul ul li a {
  margin-left: 1rem;
  font-size: 0.875rem;
}

.menu-separator {
  height: 1px;
  background-color: var(--color-gray-200);
  margin: 1rem 0;
}
</style>
