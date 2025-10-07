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
  // TODO: Implement login logic
  router.push('/driver/dashboard')
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped></style>
