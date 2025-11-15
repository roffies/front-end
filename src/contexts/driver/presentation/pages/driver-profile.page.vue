<template>
  <default-layout>
    <div class="layout-content">
      <div class="profile-container">
        <h2 class="section-title">{{ $t('driverProfile.title') }}</h2>

        <div v-if="!user" class="status empty">
          {{ $t('driverProfile.noData') }}
        </div>

        <div v-else class="profile-card">
          <div class="left-section">
            <img
              class="avatar"
              :src="user.avatar || placeholder"
              alt="Driver avatar"
            />
            <h3 class="user-name">{{ user.name }}</h3>
            <p class="user-role">
              {{ user.role || $t('driverProfile.conductor') }}
            </p>
            <p class="user-phone">{{ user.phone }}</p>
          </div>

          <div class="right-section">
            <h2 class="welcome-text">
              {{ $t('driverProfile.welcome', { name: firstName }) }}
            </h2>

            <div class="info-grid">
              <div class="info-row">
                <label>{{ $t('driverProfile.registerDate') }}</label>
                <input type="text" :value="registerDate" readonly />
              </div>

              <div class="info-row">
                <label>{{ $t('driverProfile.name') }}</label>
                <input type="text" :value="user.name" readonly />
              </div>

              <div class="info-row">
                <label>{{ $t('driverProfile.email') }}</label>
                <input type="text" :value="user.email" readonly />
              </div>

              <div class="info-row">
                <label>{{ $t('driverProfile.servicesHistory') }}</label>
                <input type="text" :value="servicesHistory" readonly />
              </div>

              <div class="info-row">
                <label>{{ $t('driverProfile.vehiclesRegistered') }}</label>
                <input type="text" :value="vehiclesRegistered" readonly />
              </div>

              <div class="info-row">
                <label>{{ $t('driverProfile.lastAccess') }}</label>
                <input type="text" :value="lastAccess" readonly />
              </div>
            </div>

            <div class="buttons">
              <pv-button
                :label="$t('driverProfile.edit')"
                icon="pi pi-pencil"
                class="p-button-success"
                @click="onEdit"
              />
              <pv-button
                :label="$t('driverProfile.changePassword')"
                icon="pi pi-key"
                class="p-button-secondary"
                @click="onChangePassword"
              />
              <pv-button
                :label="$t('common.logout') || 'Logout'"
                icon="pi pi-sign-out"
                class="p-button-danger"
                @click="logout"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import DefaultLayout from '@/shared-kernel/presentation/layouts/default/default-layout.component.vue'
import { TokenManager } from '@/shared-kernel/infrastructure/auth/token-manager.js'

// state
const user = ref(null)
const placeholder = new URL('@/assets/img/driver-placeholder.jpg', import.meta.url).href

// lifecycle
onMounted(() => {
  const data = TokenManager.getUser()
  if (data) user.value = data
})

// computed helpers
const firstName = computed(() =>
  user.value?.name ? user.value.name.trim().split(' ')[0] : ''
)

const registerDate = computed(() => user.value?.registerDate || '—')
const servicesHistory = computed(() => user.value?.events ?? '—')
const vehiclesRegistered = computed(() => user.value?.vehicles ?? '—')
const lastAccess = computed(() => user.value?.lastAccess || '—')

// actions
function onEdit() {
  console.info('Edit profile clicked')
}

function onChangePassword() {
  console.info('Change password clicked')
}

function logout() {
  TokenManager.clearAuth()
  window.location.href = '/login'
}
</script>

<style scoped>
.profile-container {
  padding: 2rem;
  background-color: #f5f7fa;
  min-height: 100%;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2f3b52;
}

.status.empty {
  text-align: center;
  color: #666;
  font-size: 1.05rem;
}

.profile-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
}

.left-section {
  flex: 1;
  text-align: center;
  min-width: 260px;
}

.avatar {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #0f766e;
}

.user-name {
  font-size: 1.2rem;
  margin-top: 1rem;
  color: #2f3b52;
}

.user-role {
  color: #0f766e;
  margin: 0.3rem 0;
  font-weight: 500;
}

.user-phone {
  color: #555;
  font-size: 0.95rem;
}

.right-section {
  flex: 2;
  min-width: 320px;
  padding-left: 2rem;
}

.welcome-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f766e;
  margin-bottom: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.info-row {
  display: flex;
  flex-direction: column;
}

.info-row label {
  color: #555;
  font-weight: 500;
  margin-bottom: 0.3rem;
}

.info-row input {
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #d3d7df;
  background: #f7f7f7;
  color: #333;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 900px) {
  .profile-card {
    flex-direction: column;
    align-items: center;
  }
  .right-section {
    padding-left: 0;
    margin-top: 2rem;
  }
}
.layout-content {
  flex: 1;
  padding: 2rem;
  background-color: transparent;
}

</style>
