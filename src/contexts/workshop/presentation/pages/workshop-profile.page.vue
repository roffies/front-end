<template>
  <default-layout>
    <div class="layout-content">
      <div class="profile-container">
        <h2 class="section-title">{{ $t('workshopProfile.title') }}</h2>

        <div v-if="!user" class="status empty">
          {{ $t('workshopProfile.noData') }}
        </div>

        <div v-else class="profile-card">
          <!-- Left: avatar + summary -->
          <div class="left-section">
            <img
              class="avatar"
              :src="user.avatar || placeholder"
              alt="Workshop avatar"
            />
            <h3 class="user-name">{{ user.name }}</h3>
            <p class="user-role">{{ $t('workshopProfile.role') }}</p>
            <p class="user-phone">{{ user.phone }}</p>
          </div>

          <!-- Right: readonly fields -->
          <div class="right-section">
            <h2 class="welcome-text">
              {{ $t('workshopProfile.welcome', { name: firstName }) }}
            </h2>

            <div class="info-grid">
              <div class="info-row">
                <label>{{ $t('workshopProfile.registerDate') }}</label>
                <input type="text" :value="user.registerDate || '—'" readonly />
              </div>

              <div class="info-row">
                <label>{{ $t('workshopProfile.email') }}</label>
                <input type="text" :value="user.email" readonly />
              </div>

              <div class="info-row">
                <label>{{ $t('workshopProfile.address') }}</label>
                <input type="text" :value="user.address || '—'" readonly />
              </div>

              <div class="info-row">
                <label>{{ $t('workshopProfile.servicesOffered') }}</label>
                <input type="text" :value="user.services || '—'" readonly />
              </div>

              <div class="info-row">
                <label>{{ $t('workshopProfile.rating') }}</label>
                <input type="text" :value="user.rating || '—'" readonly />
              </div>
            </div>

            <div class="buttons">
              <pv-button
                :label="$t('workshopProfile.edit')"
                icon="pi pi-pencil"
                class="p-button-success"
                @click="onEdit"
              />
              <pv-button
                :label="$t('workshopProfile.changePassword')"
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

const user = ref(null)
const placeholder = new URL('@/assets/img/workshop-placeholder.jpg', import.meta.url).href

onMounted(() => {
  const data = TokenManager.getUser()
  if (data) user.value = data
})

const firstName = computed(() =>
  user.value?.name ? user.value.name.trim().split(' ')[0] : ''
)

function onEdit() {
  console.info('Edit workshop profile clicked')
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
/* Usa los mismos estilos del driver-profile.page.vue */
.layout-content {
  flex: 1;
  padding: 2rem;
  background-color: transparent;
}

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
</style>
