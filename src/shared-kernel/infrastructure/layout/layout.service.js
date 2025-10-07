import { reactive, computed } from 'vue'

const layoutConfig = reactive({
  preset: 'Aura',
  primary: 'emerald',
  surface: null,
  menuMode: 'static',
})

const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: null,
  currentUser: null,
  userVehicles: [],
  userAppointments: [],
  sidebarLoading: false,
  sidebarError: null,
  sidebarDataLoaded: false,
  currentRole: null,
  menuItems: [],
  menuLoaded: false,
})

class LayoutService {
  constructor() {}

  setActiveMenuItem(item) {
    layoutState.activeMenuItem = item.value || item
  }

  toggleMenu() {
    if (layoutConfig.menuMode === 'overlay') {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive
    }
  }

  setCurrentUser(user) {
    layoutState.currentUser = user
  }

  setUserVehicles(vehicles) {
    layoutState.userVehicles = vehicles
  }

  setUserAppointments(appointments) {
    layoutState.userAppointments = appointments
  }

  setSidebarLoading(loading) {
    layoutState.sidebarLoading = loading
  }

  setSidebarError(error) {
    layoutState.sidebarError = error
  }

  setSidebarDataLoaded(loaded) {
    layoutState.sidebarDataLoaded = loaded
  }

  setCurrentRole(role) {
    layoutState.currentRole = role
  }

  setMenuItems(items) {
    layoutState.menuItems = items
  }

  setMenuLoaded(loaded) {
    layoutState.menuLoaded = loaded
  }

  get isSidebarActive() {
    return computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive)
  }

  get primary() {
    return computed(() => layoutConfig.primary)
  }

  get surface() {
    return computed(() => layoutConfig.surface)
  }

  get config() {
    return layoutConfig
  }

  get state() {
    return layoutState
  }
}

export const layoutService = new LayoutService()

export const isSidebarActive = computed(
  () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive,
)

export { LayoutService }
