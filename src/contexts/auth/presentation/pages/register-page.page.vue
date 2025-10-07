<template>
  <auth-layout>
    <template #form>
      <div class="register-wizard">
        <pv-stepper v-model:value="currentStep" class="w-full">
          <pv-step-list>
            <pv-step :value="1" :disabled="false">{{ $t('auth.stepOneTitle') }}</pv-step>
            <pv-step :value="2" :disabled="!canProceedToStep2">{{
              $t('auth.stepTwoTitle')
            }}</pv-step>
          </pv-step-list>

          <pv-step-panels>
            <pv-step-panel v-slot="{ activateCallback }" :value="1">
              <div class="step-content">
                <div class="step-header">
                  <h3 class="step-title">{{ $t('auth.stepOneTitle') }}</h3>
                  <p class="step-subtitle">{{ $t('auth.stepOneSubtitle') }}</p>
                </div>

                <div class="register-form">
                  <div class="input-group">
                    <label for="fullName">{{ $t('auth.fullName') }}</label>
                    <pv-input-text
                      id="fullName"
                      v-model="fullName"
                      :placeholder="$t('auth.enterFullName')"
                      class="w-full"
                    />
                  </div>

                  <div class="input-group">
                    <label for="email">{{ $t('auth.email') }}</label>
                    <pv-input-text
                      id="email"
                      v-model="email"
                      type="email"
                      :placeholder="$t('auth.enterEmail')"
                      class="w-full"
                    />
                  </div>

                  <div class="input-group">
                    <label for="password">{{ $t('auth.password') }}</label>
                    <pv-password
                      id="password"
                      v-model="password"
                      :placeholder="$t('auth.createPassword')"
                      class="w-full"
                      :feedback="true"
                      toggle-mask
                    />
                  </div>

                  <div class="input-group">
                    <label for="confirmPassword">{{ $t('auth.confirmPassword') }}</label>
                    <pv-password
                      id="confirmPassword"
                      v-model="confirmPassword"
                      :placeholder="$t('auth.confirmYourPassword')"
                      class="w-full"
                      :feedback="false"
                      toggle-mask
                    />
                  </div>

                  <div class="form-options">
                    <div class="terms-agreement">
                      <pv-checkbox v-model="agreeTerms" :binary="true" input-id="terms" />
                      <label for="terms"
                        >{{ $t('auth.agreeTerms') }}
                        <a href="#" class="text-link">{{ $t('auth.termsAndConditions') }}</a></label
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="step-actions">
                <pv-button
                  :label="$t('auth.continue')"
                  icon="pi pi-arrow-right"
                  icon-pos="right"
                  class="continue-btn primary-btn"
                  :disabled="!canProceedToStep2"
                  @click="activateCallback(2)"
                />
              </div>
            </pv-step-panel>

            <pv-step-panel v-slot="{ activateCallback }" :value="2">
              <div class="step-content">
                <div class="step-header">
                  <h3 class="step-title">{{ $t('auth.stepTwoTitle') }}</h3>
                  <p class="step-subtitle">{{ $t('auth.stepTwoSubtitle') }}</p>
                </div>

                <div class="role-selection">
                  <div class="role-options">
                    <div
                      class="role-card"
                      :class="{ selected: selectedRole === 'driver' }"
                      @click="selectRole('driver')"
                    >
                      <div class="role-icon">
                        <i
                          class="pi pi-car"
                          style="font-size: 2rem; color: var(--color-primary)"
                        ></i>
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
                        <i
                          class="pi pi-wrench"
                          style="font-size: 2rem; color: var(--color-warning)"
                        ></i>
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
                </div>
              </div>

              <div v-if="error" class="error-message">
                {{ error }}
              </div>

              <div class="step-actions">
                <pv-button
                  :label="$t('auth.signUp')"
                  class="primary-btn"
                  :disabled="!selectedRole || loading"
                  :loading="loading"
                  @click="handleRegister"
                />
                <pv-button
                  :label="$t('common.back')"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  class="secondary-btn"
                  @click="activateCallback(1)"
                />
              </div>
            </pv-step-panel>
          </pv-step-panels>
        </pv-stepper>
      </div>
    </template>

    <template #footer>
      <p>
        {{ $t('auth.alreadyHaveAccount') }}
        <a href="#" class="text-link" @click="goToLogin">{{ $t('auth.signIn') }}</a>
      </p>
    </template>
  </auth-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/shared-kernel/presentation/layouts/auth/auth-layout.component.vue'
import { AuthApiService, AuthAssembler } from '@/contexts/auth/infrastructure/index.js'

const router = useRouter()
const currentStep = ref(1)
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const selectedRole = ref('')
const loading = ref(false)
const error = ref('')

const authService = new AuthApiService()

const canProceedToStep2 = computed(() => {
  return (
    fullName.value.trim() &&
    email.value.trim() &&
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value &&
    password.value.length >= 6 &&
    agreeTerms.value &&
    isValidEmail(email.value)
  )
})

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const selectRole = (role) => {
  selectedRole.value = role
}

const goToLogin = () => {
  router.push('/login')
}

const handleRegister = async () => {
  if (!fullName.value || !email.value || !password.value || !selectedRole.value) {
    error.value = 'Please fill in all fields'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await authService.register({
      name: fullName.value,
      email: email.value,
      password: password.value,
      role: selectedRole.value,
    })

    const registerResult = AuthAssembler.toRegisterResponse(response)

    if (registerResult.success) {
      // Save token and user to localStorage
      localStorage.setItem('accessToken', registerResult.accessToken)
      localStorage.setItem('user', JSON.stringify(registerResult.user))

      // Redirect based on role
      if (registerResult.user.role === 'driver') {
        router.push('/driver/dashboard')
      } else if (registerResult.user.role === 'workshop') {
        router.push('/workshop/dashboard')
      }
    } else {
      error.value = registerResult.message
    }
  } catch (err) {
    console.error('Register error:', err)
    error.value = 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
