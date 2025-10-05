<template>
  <auth-layout>
    <template #form>
      <div class="login-form">
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
            :placeholder="$t('auth.enterPassword')"
            class="w-full"
            :feedback="false"
            toggle-mask
          />
        </div>

        <div class="form-options">
          <div class="remember-me">
            <pv-checkbox v-model="rememberMe" :binary="true" input-id="remember" />
            <label for="remember">{{ $t('auth.rememberMe') }}</label>
          </div>
          <a href="#" class="forgot-password">{{ $t('auth.forgotPassword') }}</a>
        </div>

        <pv-button :label="$t('auth.signIn')" class="w-full sign-in-btn" @click="handleLogin" />
      </div>
    </template>

    <template #footer>
      <p>
        {{ $t('auth.dontHaveAccount') }}
        <a href="#" class="sign-up-link" @click="goToRegister">{{ $t('auth.signUp') }}</a>
      </p>
    </template>
  </auth-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/shared-kernel/presentation/layouts/auth/auth-layout.component.vue'

const router = useRouter()
const email = ref('stanley@gmail.com')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = () => {
  console.log('Login attempt:', {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  })
  // TODO: Implement login logic
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.login-form {
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
  justify-content: space-between;
  align-items: center;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remember-me label {
  font-size: 0.875rem;
  color: var(--color-text-light);
  cursor: pointer;
}

.forgot-password {
  font-size: 0.875rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.forgot-password:hover {
  text-decoration: underline;
}

.sign-in-btn {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  border: none;
  height: 48px;
  font-weight: 600;
  font-size: 1rem;
}

.sign-up-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.sign-up-link:hover {
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
