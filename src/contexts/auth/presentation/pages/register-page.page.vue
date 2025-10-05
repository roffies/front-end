<template>
  <auth-layout>
    <template #form>
      <div class="register-form">
        <div class="input-group">
          <label for="fullName">Full Name</label>
          <pv-input-text
            id="fullName"
            v-model="fullName"
            placeholder="Enter your full name"
            class="w-full"
          />
        </div>

        <div class="input-group">
          <label for="email">Email</label>
          <pv-input-text
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full"
          />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <pv-password
            id="password"
            v-model="password"
            placeholder="Create a password"
            class="w-full"
            :feedback="true"
            toggle-mask
          />
        </div>

        <div class="input-group">
          <label for="confirmPassword">Confirm Password</label>
          <pv-password
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Confirm your password"
            class="w-full"
            :feedback="false"
            toggle-mask
          />
        </div>

        <div class="form-options">
          <div class="terms-agreement">
            <pv-checkbox v-model="agreeTerms" :binary="true" input-id="terms" />
            <label for="terms"
              >I agree to the <a href="#" class="terms-link">Terms and Conditions</a></label
            >
          </div>
        </div>

        <pv-button label="Sign Up" class="w-full sign-up-btn" @click="handleRegister" />
      </div>
    </template>

    <template #footer>
      <p>Already have an account? <a href="#" class="sign-in-link">Sign In</a></p>
    </template>
  </auth-layout>
</template>

<script setup>
import { ref } from 'vue'
import AuthLayout from '@/shared-kernel/presentation/layouts/auth/auth-layout.component.vue'

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)

const handleRegister = () => {
  console.log('Register attempt:', {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    agreeTerms: agreeTerms.value,
  })
  // TODO: Implement register logic
}
</script>

<style scoped>
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
  color: #374151;
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
  color: #6b7280;
  cursor: pointer;
  line-height: 1.4;
}

.terms-link {
  color: #8b5cf6;
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  text-decoration: underline;
}

.sign-up-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border: none;
  height: 48px;
  font-weight: 600;
  font-size: 1rem;
}

.sign-in-link {
  color: #8b5cf6;
  text-decoration: none;
  font-weight: 500;
}

.sign-in-link:hover {
  text-decoration: underline;
}

:deep(.p-inputtext) {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.875rem;
}

:deep(.p-inputtext:focus) {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

:deep(.p-password) {
  width: 100%;
}

:deep(.p-password .p-inputtext) {
  width: 100%;
}

:deep(.p-checkbox .p-checkbox-box) {
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  background: #8b5cf6;
  border-color: #8b5cf6;
}
</style>
