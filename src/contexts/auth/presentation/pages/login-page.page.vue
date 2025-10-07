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
          />
        </div>

        <div class="input-group">
          <label for="password">{{ $t('auth.password') }}</label>
          <pv-password
            id="password"
            v-model="password"
            :placeholder="$t('auth.enterPassword')"
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

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <pv-button
          :label="$t('auth.signIn')"
          class="w-full primary-btn"
          :loading="loading"
          :disabled="loading"
          @click="handleLogin"
        />
      </div>
    </template>

    <template #footer>
      <p>
        {{ $t('auth.dontHaveAccount') }}
        <a href="#" class="text-link" @click="goToRegister">{{ $t('auth.signUp') }}</a>
      </p>
    </template>
  </auth-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/shared-kernel/presentation/layouts/auth/auth-layout.component.vue'
import { AuthApiService, AuthAssembler } from '@/contexts/auth/infrastructure/index.js'
import { TokenManager } from '@/shared-kernel/infrastructure/auth/token-manager.js'

const router = useRouter()
const email = ref('admin1@admin.com')
const password = ref('admin2')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

const authService = new AuthApiService()

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await authService.login({
      email: email.value,
      password: password.value,
    })

    const loginResult = AuthAssembler.toLoginResponse(response)

    if (loginResult.success) {
      // Use TokenManager instead of direct localStorage access
      TokenManager.setToken(loginResult.accessToken)
      TokenManager.setUser(loginResult.user)

      if (loginResult.user.role === 'driver') {
        router.push('/driver/dashboard')
      } else if (loginResult.user.role === 'workshop') {
        router.push('/workshop/dashboard')
      }
    } else {
      error.value = loginResult.message
    }
  } catch (err) {
    console.error('Login error:', err)
    error.value = 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped></style>
