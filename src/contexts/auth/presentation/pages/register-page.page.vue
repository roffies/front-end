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
                        <a href="#" class="terms-link">{{
                          $t('auth.termsAndConditions')
                        }}</a></label
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
                  class="continue-btn"
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

              <div class="step-actions">
                <pv-button
                  :label="$t('auth.signUp')"
                  class="sign-up-btn"
                  :disabled="!selectedRole"
                  @click="handleRegister"
                />
                <pv-button
                  :label="$t('common.back')"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  class="back-btn"
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
        <a href="#" class="sign-in-link" @click="goToLogin">{{ $t('auth.signIn') }}</a>
      </p>
    </template>
  </auth-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/shared-kernel/presentation/layouts/auth/auth-layout.component.vue'

const router = useRouter()
const currentStep = ref(1)
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const selectedRole = ref('')

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

const handleRegister = () => {
  console.log('Register attempt:', {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    agreeTerms: agreeTerms.value,
    selectedRole: selectedRole.value,
  })
  // TODO: Implement register logic
}
</script>

<style scoped>
.register-wizard {
  width: 100%;
}

.step-content {
  padding: 1rem 0;
}

.step-header {
  text-align: center;
  margin-bottom: 2rem;
}

.step-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
}

.step-subtitle {
  font-size: 1rem;
  color: var(--color-text-light);
  margin: 0;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.form-options {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.terms-agreement {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.terms-agreement label {
  font-size: 0.875rem;
  color: var(--color-text-light);
  cursor: pointer;
  line-height: 1.4;
}

.terms-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  text-decoration: underline;
}

.step-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-gray-200);
}

.continue-btn {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  border: none;
  height: 48px;
  font-weight: 600;
  font-size: 1rem;
  margin-left: auto;
}

.sign-up-btn {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  border: none;
  height: 48px;
  font-weight: 600;
  font-size: 1rem;
}

.back-btn {
  background: var(--color-gray-100);
  border: 1px solid var(--color-gray-300);
  color: var(--color-text);
  height: 48px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: var(--color-gray-200);
  border-color: var(--color-gray-400);
}

.role-selection {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.role-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.role-card {
  border: 2px solid var(--color-gray-200);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.role-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 103, 102, 0.15);
}

.role-card.selected {
  border-color: var(--color-primary);
  background: linear-gradient(135deg, rgba(66, 103, 102, 0.05) 0%, rgba(59, 108, 90, 0.05) 100%);
  box-shadow: 0 4px 12px rgba(66, 103, 102, 0.2);
}

.role-icon {
  text-align: center;
  margin-bottom: 1rem;
}

.role-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-text);
  text-align: center;
  margin: 0 0 0.5rem 0;
}

.role-description {
  font-size: 0.875rem;
  color: var(--color-text-light);
  text-align: center;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.role-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature {
  font-size: 0.875rem;
  color: var(--color-text);
  line-height: 1.4;
}

.sign-in-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.sign-in-link:hover {
  text-decoration: underline;
}

:deep(.p-inputtext) {
  border: 1px solid var(--color-gray-300) !important;
  border-radius: 8px !important;
  padding: 0.75rem !important;
  font-size: 0.875rem !important;
}

:deep(.p-inputtext:focus) {
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 3px rgba(66, 103, 102, 0.1) !important;
}

:deep(.p-password) {
  width: 100% !important;
}

:deep(.p-password .p-inputtext) {
  width: 100% !important;
}

:deep(.p-checkbox .p-checkbox-box) {
  border: 1px solid var(--color-gray-300) !important;
  border-radius: 4px !important;
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  background: var(--color-primary) !important;
  border-color: var(--color-primary) !important;
}

:deep(.p-stepper) {
  background: transparent !important;
}

:deep(.p-stepper .p-stepper-header) {
  background: transparent !important;
  border: none !important;
  padding: 0 0 1rem 0 !important;
}

:deep(.p-stepper .p-stepper-step) {
  background: transparent !important;
  border: none !important;
}

:deep(.p-stepper .p-stepper-step.p-highlight) {
  background: transparent !important;
}

:deep(.p-stepper .p-stepper-step-number) {
  background: var(--color-primary) !important;
  color: white !important;
  border-radius: 50% !important;
  width: 2rem !important;
  height: 2rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-weight: 600 !important;
}

:deep(.p-stepper .p-stepper-step.p-highlight .p-stepper-step-number) {
  background: var(--color-primary) !important;
}

:deep(.p-stepper .p-stepper-step.p-disabled) {
  cursor: not-allowed !important;
  opacity: 0.5 !important;
  pointer-events: none !important;
}

:deep(.p-stepper .p-stepper-step.p-disabled .p-stepper-step-number) {
  background: var(--color-gray-200) !important;
  color: var(--color-gray-400) !important;
}

:deep(.p-stepper .p-stepper-step.p-disabled .p-stepper-step-title) {
  color: var(--color-gray-400) !important;
}

:deep(.p-stepper .p-stepper-step:not(.p-disabled)) {
  cursor: pointer !important;
  pointer-events: auto !important;
}

:deep(.p-stepper .p-stepper-step:not(.p-disabled):hover) {
  opacity: 0.8 !important;
}

:deep(.p-stepper .p-stepper-step-title) {
  color: var(--color-text) !important;
  font-weight: 500 !important;
  margin-left: 0.5rem !important;
}

:deep(.p-stepper .p-stepper-step.p-highlight .p-stepper-step-title) {
  color: var(--color-primary) !important;
  font-weight: 600 !important;
}

@media (max-width: 480px) {
  .role-card {
    padding: 1rem;
  }

  .step-title {
    font-size: 1.25rem;
  }

  .role-name {
    font-size: 1.125rem;
  }
}
</style>
