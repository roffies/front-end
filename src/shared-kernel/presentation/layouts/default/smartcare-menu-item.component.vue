<script>
export default {
  name: 'SmartcareMenuItem',
}
</script>

<script setup>
import {
  layoutService,
  isSidebarActive,
} from '@/shared-kernel/infrastructure/layout/layout.service.js'
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { state: layoutState, setActiveMenuItem, toggleMenu } = layoutService

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: 0,
  },
  root: {
    type: Boolean,
    default: true,
  },
  parentItemKey: {
    type: String,
    default: null,
  },
})

const isActiveMenu = ref(false)
const itemKey = ref(null)

onBeforeMount(() => {
  itemKey.value = props.parentItemKey
    ? props.parentItemKey + '-' + props.index
    : String(props.index)

  const activeItem = layoutState.activeMenuItem

  isActiveMenu.value =
    activeItem === itemKey.value || activeItem ? activeItem.startsWith(itemKey.value + '-') : false
})

watch(
  () => layoutState.activeMenuItem,
  (newVal) => {
    isActiveMenu.value = newVal === itemKey.value || newVal.startsWith(itemKey.value + '-')
  },
)

function itemClick(event, item) {
  if (item.disabled) {
    event.preventDefault()
    return
  }

  if ((item.to || item.url) && isSidebarActive.value) {
    toggleMenu()
  }

  if (item.command) {
    item.command({ originalEvent: event, item: item })
  }

  const foundItemKey = item.items
    ? isActiveMenu.value
      ? props.parentItemKey
      : itemKey
    : itemKey.value

  setActiveMenuItem(foundItemKey)
}

function checkActiveRoute(item) {
  return route.path === item.to
}
</script>

<template>
  <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
    <div v-if="root && item.visible !== false" class="layout-menuitem-root-text">
      {{ $t(item.label) }}
    </div>
    <a
      v-if="item.url && !item.to && item.visible !== false"
      :href="item.url"
      @click="itemClick($event, item, index)"
      :class="item.class"
      :target="item.target"
      tabindex="0"
    >
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{ $t(item.label) }}</span>
      <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
    </a>
    <router-link
      v-if="item.to && !item.items && item.visible !== false"
      @click="itemClick($event, item, index)"
      :class="[item.class, { 'active-route': checkActiveRoute(item) }]"
      tabindex="0"
      :to="item.to"
    >
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{ $t(item.label) }}</span>
    </router-link>
    <Transition v-if="item.items && item.visible !== false" name="layout-submenu">
      <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
        <smartcare-menu-item
          v-for="(child, i) in item.items"
          :key="child"
          :index="i"
          :item="child"
          :parentItemKey="itemKey"
          :root="false"
        ></smartcare-menu-item>
      </ul>
    </Transition>
  </li>
</template>

<style scoped>
.layout-root-menuitem {
  margin-bottom: 1.5rem;
}

.layout-menuitem-root-text {
  font-size: 0.857rem;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--color-text);
  margin: 0.75rem 0;
  letter-spacing: 0.5px;
}

.layout-menuitem-icon {
  margin-right: 0.75rem;
  color: var(--color-primary);
  font-size: 1rem;
}

.layout-menuitem-text {
  flex: 1;
}

.layout-submenu-toggler {
  font-size: 0.75rem;
  margin-left: auto;
  transition: transform var(--transition-fast);
  color: var(--color-text-light);
}

.active-menuitem > a .layout-submenu-toggler {
  transform: rotate(-180deg);
}

.layout-submenu {
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow: hidden;
  border-radius: var(--radius-md);
  margin-top: 0.5rem;
}

.layout-submenu li a {
  margin-left: 1rem;
  font-size: 0.875rem;
}

.layout-submenu-enter-from,
.layout-submenu-leave-to {
  max-height: 0;
}

.layout-submenu-enter-to,
.layout-submenu-leave-from {
  max-height: 1000px;
}

.layout-submenu-leave-active {
  overflow: hidden;
  transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
}

.layout-submenu-enter-active {
  overflow: hidden;
  transition: max-height 1s ease-in-out;
}
</style>
