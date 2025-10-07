<template>
  <div class="layout-sidebar">
    <div class="sidebar-user-section">
      <div class="user-profile">
        <pv-avatar
          :image="currentUser?.avatar || undefined"
          size="large"
          shape="circle"
          :aria-label="$t('aria.userProfile')"
        />
        <div class="user-details">
          <h3 class="user-name">{{ currentUser?.name || $t('common.loading') }}</h3>
          <p class="user-phone" v-if="currentUser?.phone">
            {{ $t('common.phone') }}: {{ currentUser.phone }}
          </p>
        </div>
      </div>

      <div v-if="error" class="error-message">
        <i class="pi pi-exclamation-triangle"></i>
        <span>{{ $t('common.errorLoadingData') }}</span>
      </div>

      <div v-else-if="loading" class="loading-message">
        <i class="pi pi-spin pi-spinner"></i>
        <span>{{ $t('common.loading') }}</span>
      </div>

      <div v-else-if="currentUser?.role === 'driver'" class="user-stats">
        <div class="stat-item">
          <i class="pi pi-star-fill" style="color: var(--color-rating)"></i>
          <span>{{ $t('driver.rating') }}: {{ currentUser.rating }}</span>
        </div>
        <div class="stat-item">
          <i class="pi pi-car" style="color: var(--color-vehicles)"></i>
          <span>{{ $t('driver.vehicles') }}: {{ userVehicles.length }}</span>
        </div>
        <div class="stat-item">
          <i class="pi pi-clock" style="color: var(--color-member-since)"></i>
          <span>{{ $t('driver.memberSince') }}: {{ currentUser.memberSince }}</span>
        </div>
      </div>

      <div v-else-if="currentUser?.role === 'workshop'" class="user-stats">
        <div class="stat-item">
          <i class="pi pi-star-fill" style="color: var(--color-rating)"></i>
          <span>{{ $t('workshop.rating') }}: {{ currentUser.rating }}</span>
        </div>
        <div class="stat-item">
          <i class="pi pi-calendar" style="color: var(--color-vehicles)"></i>
          <span>{{ $t('workshop.appointments') }}: {{ userAppointments.length }}</span>
        </div>
        <div class="stat-item">
          <i class="pi pi-dollar" style="color: var(--color-member-since)"></i>
          <span>{{ $t('workshop.revenue') }}: $2.5K</span>
        </div>
      </div>
    </div>

    <div class="sidebar-menu-wrapper">
      <smartcare-menu></smartcare-menu>
    </div>

    <div class="sidebar-footer">
      <div
        v-if="currentUser?.role === 'driver'"
        class="emergency-button"
        :aria-label="$t('aria.emergency')"
      >
        <i class="pi pi-phone"></i>
        <span>{{ $t('nav.emergency') }}</span>
      </div>

      <div
        v-else-if="currentUser?.role === 'workshop'"
        class="status-indicator"
        :class="workshopStatus"
      >
        <i class="pi pi-circle-fill"></i>
        <span>{{ $t('common.status') }}: {{ $t('common.open') }}</span>
      </div>

      <div class="sign-out-section">
        <pv-button
          :label="$t('auth.logout')"
          icon="pi pi-sign-out"
          class="sign-out-btn"
          :aria-label="$t('aria.signOut')"
          @click="handleSignOut"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { layoutService } from '@/shared-kernel/infrastructure/layout/layout.service.js'
import { UserApiService } from '@/contexts/auth/infrastructure/user-api.service.js'
import { UserAssembler } from '@/contexts/auth/domain/user.assembler.js'
import { VehicleApiService } from '@/contexts/driver/infrastructure/vehicle-api.service.js'
import { VehicleAssembler } from '@/contexts/driver/domain/vehicle.assembler.js'
import { AppointmentApiService } from '@/contexts/workshop/infrastructure/appointment-api.service.js'
import { AppointmentAssembler } from '@/contexts/workshop/domain/appointment.assembler.js'
import SmartcareMenu from './smartcare-menu.component.vue'

const route = useRoute()
const router = useRouter()
const workshopStatus = ref('open')

const { state } = layoutService
const currentUser = computed(() => state.currentUser)
const userVehicles = computed(() => state.userVehicles)
const userAppointments = computed(() => state.userAppointments)
const loading = computed(() => state.sidebarLoading)
const error = computed(() => state.sidebarError)

const userService = new UserApiService()
const vehicleService = new VehicleApiService()
const appointmentService = new AppointmentApiService()

const currentRole = computed(() => {
  if (route.path.startsWith('/driver')) {
    return 'driver'
  } else if (route.path.startsWith('/workshop')) {
    return 'workshop'
  }
  return 'driver'
})

const loadData = async () => {
  if (state.sidebarDataLoaded && state.currentRole === currentRole.value) {
    return
  }

  layoutService.setSidebarLoading(true)
  layoutService.setSidebarError(null)

  try {
    const role = currentRole.value

    const usersResponse = await userService.getAll()
    const users = UserAssembler.toEntitiesFromResponse(usersResponse)
    const user = users.find((u) => u.role === role)

    if (!user) {
      throw new Error('User not found')
    }

    layoutService.setCurrentUser(user)

    if (role === 'driver') {
      const vehiclesResponse = await vehicleService.getAll()
      const allVehicles = VehicleAssembler.toEntitiesFromResponse(vehiclesResponse)
      layoutService.setUserVehicles(allVehicles.filter((v) => v.userId === user.id))
      layoutService.setUserAppointments([])
    } else if (role === 'workshop') {
      const appointmentsResponse = await appointmentService.getAll()
      const allAppointments = AppointmentAssembler.toEntitiesFromResponse(appointmentsResponse)
      layoutService.setUserAppointments(allAppointments.filter((a) => a.workshopId === user.id))
      layoutService.setUserVehicles([])
    }

    layoutService.setCurrentRole(role)
    layoutService.setSidebarDataLoaded(true)
  } catch (err) {
    layoutService.setSidebarError(err.message || 'Error loading data')
    console.error('Error loading data:', err)
    layoutService.setCurrentUser(null)
    layoutService.setUserVehicles([])
    layoutService.setUserAppointments([])
  } finally {
    layoutService.setSidebarLoading(false)
  }
}

const handleSignOut = () => {
  router.push('/login')
}

onMounted(async () => {
  await loadData()
})
</script>
