<template>
  <auth-layout>
    <template #form>
      <div class="role-selection">
        <h3 class="role-title">{{ $t('auth.roleTitle') }}</h3>
        <p class="role-subtitle">{{ $t('auth.roleSubtitle') }}</p>

        <div class="role-options">
          <div
            class="role-card"
            :class="{ selected: selectedRole === 'driver' }"
            @click="selectRole('driver')"
          >
            <div class="role-icon">
              <i class="pi pi-car" style="font-size: 2rem; color: var(--color-primary)"></i>
            </div>
            <h4 class="role-name">{{ $t('auth.driver') }}</h4>
            <p class="role-description">
              {{ $t('auth.driverDescription') }}
            </p>
            <div class="role-features">
              <div class="feature">• {{ $t('auth.vehicleManagement') }}</div>
              <div class="feature">• {{ $t('auth.workshopFinder') }}</div>
              <div class="feature">• {{ $t('auth.maintenanceTracking') }}</div>
              <div class="feature">• {{ $t('auth.emergencyAssistance') }}</div>
            </div>
          </div>

          <div
            class="role-card"
            :class="{ selected: selectedRole === 'workshop' }"
            @click="selectRole('workshop')"
          >
            <div class="role-icon">
              <i class="pi pi-wrench" style="font-size: 2rem; color: var(--color-warning)"></i>
            </div>
            <h4 class="role-name">{{ $t('auth.workshop') }}</h4>
            <p class="role-description">
              {{ $t('auth.workshopDescription') }}
            </p>
            <div class="role-features">
              <div class="feature">• {{ $t('auth.quoteManagement') }}</div>
              <div class="feature">• {{ $t('auth.appointmentScheduling') }}</div>
              <div class="feature">• {{ $t('auth.customerReviews') }}</div>
              <div class="feature">• {{ $t('auth.businessAnalytics') }}</div>
            </div>
          </div>
        </div>

        <pv-button
          :label="$t('auth.continue')"
          class="w-full continue-btn"
          :disabled="!selectedRole"
          @click="handleContinue"
        />
      </div>
    </template>

    <template #footer>
      <p>
        {{ $t('auth.alreadyHaveAccount') }}
        <a href="#" class="sign-in-link">{{ $t('auth.signIn') }}</a>
      </p>
    </template>
  </auth-layout>
</template>

<script setup>
import { ref } from 'vue'
import AuthLayout from '@/shared-kernel/presentation/layouts/auth/auth-layout.component.vue'

const selectedRole = ref('')

const selectRole = (role) => {
  selectedRole.value = role
}

const handleContinue = () => {
  // TODO: Implement role selection logic and redirect
}
</script>
