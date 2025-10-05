<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="error-icon">
        <i class="pi pi-exclamation-triangle" style="font-size: 4rem; color: #f59e0b"></i>
      </div>
      <h1 class="error-title">404 - Page Not Found</h1>
      <p class="error-message">The page you're looking for doesn't exist or has been moved.</p>
      <pv-button label="Go Home" icon="pi pi-home" class="go-home-btn" @click="goHome" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  padding: 2rem;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.error-icon {
  margin-bottom: 2rem;
}

.error-title {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.error-message {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.go-home-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border: none;
  padding: 0.75rem 2rem;
  font-weight: 600;
}

.go-home-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}
</style>
