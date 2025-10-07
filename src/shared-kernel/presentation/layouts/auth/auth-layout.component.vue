<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-form-panel">
        <div class="form-container">
          <div class="auth-header">
            <div class="app-logo" :aria-label="$t('aria.userProfile')">
              <img
                src="/src/assets/logos/smartcare-logo.png"
                :alt="$t('aria.smartcareLogo')"
                class="logo-image"
              />
            </div>
            <h1 class="app-title">{{ $t('common.appName') }}</h1>
            <div class="language-switcher-container">
              <LanguageSwitcher />
            </div>
          </div>

          <div class="welcome-section">
            <h2 class="welcome-title">{{ $t('auth.loginTitle') }}</h2>
            <p class="welcome-subtitle">{{ $t('auth.loginSubtitle') }}</p>
          </div>

          <div class="form-content">
            <slot name="form"></slot>
          </div>

          <div class="auth-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>

      <div class="illustration-panel">
        <div class="illustration-container">
          <img
            src="/src/assets/images/login-register-image.webp"
            :alt="$t('aria.authIllustration')"
            class="auth-illustration"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LanguageSwitcher from '@/shared-kernel/presentation/ui/components/language-switcher.component.vue'
</script>
<style scoped>
.auth-layout {
  min-height: 100vh;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.auth-container {
  display: flex;
  max-width: 1200px;
  width: 100%;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  min-height: 600px;
}

.auth-form-panel {
  flex: 1;
  background: white;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  width: 100%;
  max-width: 450px;
}

.auth-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.language-switcher-container {
  margin-left: auto;
}

.app-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: transparent;
  border-radius: 8px;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.app-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary);
  margin: 0;
}

.welcome-section {
  margin-bottom: 2rem;
}

.welcome-title {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.welcome-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.form-content {
  margin-bottom: 2rem;
}

.auth-footer {
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.illustration-panel {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.illustration-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.auth-illustration {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 1rem;
}

@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
    min-height: auto;
  }

  .auth-form-panel {
    padding: 2rem;
  }

  .illustration-panel {
    min-height: 300px;
  }

  .welcome-title {
    font-size: 1.5rem;
  }

  .smartphone {
    width: 80px;
    height: 140px;
    right: 10%;
  }

  .character {
    transform: scale(0.8);
  }
}

@media (max-width: 480px) {
  .auth-layout {
    padding: 1rem;
  }

  .auth-form-panel {
    padding: 1.5rem;
  }

  .welcome-title {
    font-size: 1.25rem;
  }

  .illustration-panel {
    min-height: 200px;
  }
}
</style>
