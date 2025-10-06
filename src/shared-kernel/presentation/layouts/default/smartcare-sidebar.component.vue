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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { UserApiService } from '@/contexts/auth/infrastructure/user-api.service.js'
import { UserAssembler } from '@/contexts/auth/domain/user.assembler.js'
import { VehicleApiService } from '@/contexts/driver/infrastructure/vehicle-api.service.js'
import { VehicleAssembler } from '@/contexts/driver/domain/vehicle.assembler.js'
import { AppointmentApiService } from '@/contexts/workshop/infrastructure/appointment-api.service.js'
import { AppointmentAssembler } from '@/contexts/workshop/domain/appointment.assembler.js'
import SmartcareMenu from './smartcare-menu.component.vue'

const route = useRoute()
const workshopStatus = ref('open')

const currentUser = ref(null)
const userVehicles = ref([])
const userAppointments = ref([])
const loading = ref(false)
const error = ref(null)

const userService = new UserApiService()
const vehicleService = new VehicleApiService()
const appointmentService = new AppointmentApiService()

const getUserRole = () => {
  if (route.path.startsWith('/driver')) {
    return 'driver'
  } else if (route.path.startsWith('/workshop')) {
    return 'workshop'
  }
  return 'driver'
}

const loadData = async () => {
  loading.value = true
  error.value = null

  try {
    const role = getUserRole()

    const usersResponse = await userService.getAll()
    const users = UserAssembler.toEntitiesFromResponse(usersResponse)
    currentUser.value = users.find((user) => user.role === role)

    if (!currentUser.value) {
      throw new Error('User not found')
    }

    if (role === 'driver') {
      const vehiclesResponse = await vehicleService.getAll()
      const allVehicles = VehicleAssembler.toEntitiesFromResponse(vehiclesResponse)
      userVehicles.value = allVehicles.filter((v) => v.userId === currentUser.value.id)
    } else if (role === 'workshop') {
      const appointmentsResponse = await appointmentService.getAll()
      const allAppointments = AppointmentAssembler.toEntitiesFromResponse(appointmentsResponse)
      userAppointments.value = allAppointments.filter((a) => a.workshopId === currentUser.value.id)
    }
  } catch (err) {
    error.value = err.message || 'Error loading data'
    console.error('Error loading data:', err)

    currentUser.value = null
    userVehicles.value = []
    userAppointments.value = []
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadData()
})
</script>

<style lang="scss" scoped>
.layout-sidebar {
  position: fixed;
  width: 20rem;
  height: calc(100vh - 8rem);
  z-index: 999;
  overflow-y: hidden;
  user-select: none;
  top: 6rem;
  left: 2rem;
  transition:
    transform var(--layout-section-transition-duration),
    left var(--layout-section-transition-duration);
  background-color: var(--surface-overlay);
  border-radius: var(--content-border-radius);
  padding: 0.5rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.sidebar-user-section {
  flex-shrink: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--surface-border);
}

.sidebar-menu-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 1rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--surface-border);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--text-color-secondary);
  }
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.user-details {
  text-align: center;
  margin-top: 0.75rem;
}

.user-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 0.25rem 0;
}

.user-phone {
  font-size: 0.75rem;
  color: var(--text-color-secondary);
  margin: 0;
}

.user-stats {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--surface-card);
  border-radius: var(--content-border-radius);
  border: 1px solid var(--surface-border);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.6875rem;
  color: var(--text-color-secondary);
  text-align: center;
}

.stat-item i {
  font-size: 1rem;
}

.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--color-error-light);
  color: var(--color-error);
  border-radius: var(--content-border-radius);
  border: 1px solid var(--color-error-light);
  font-size: 0.75rem;
  font-weight: 500;
}

.error-message i {
  font-size: 0.875rem;
}

.loading-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--content-border-radius);
  border: 1px solid var(--color-primary-light);
  font-size: 0.75rem;
  font-weight: 500;
}

.loading-message i {
  font-size: 0.875rem;
}

.sidebar-footer {
  flex-shrink: 0;
  padding-top: 1rem;
  border-top: 1px solid var(--surface-border);
}

.emergency-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--color-error);
  color: white;
  border-radius: var(--content-border-radius);
  cursor: pointer;
  transition: background-color var(--element-transition-duration);
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
}

.emergency-button:hover {
  background: var(--color-error);
  opacity: 0.9;
}

.emergency-button i {
  font-size: 1rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: var(--content-border-radius);
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid var(--surface-border);
}

.status-indicator.open {
  background: var(--color-success-light);
  color: var(--color-success);
  border-color: var(--color-success-light);
}

.status-indicator.closed {
  background: var(--color-error-light);
  color: var(--color-error);
  border-color: var(--color-error-light);
}

.status-indicator i {
  font-size: 0.5rem;
}

@media (max-width: 991px) {
  .layout-sidebar {
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

  .user-profile {
    flex-direction: row;
    align-items: center;
    text-align: left;
    gap: 0.75rem;
  }

  .user-details {
    text-align: left;
    margin-top: 0;
  }

  .user-stats {
    flex-direction: column;
    gap: 0.5rem;
  }

  .stat-item {
    justify-content: flex-start;
    flex-direction: row;
    gap: 0.5rem;
  }
}
</style>
