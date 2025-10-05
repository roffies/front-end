<template>
  <auth-layout>
    <template #form>
      <div class="role-selection">
        <h3 class="role-title">Choose Your Role</h3>
        <p class="role-subtitle">Select how you want to use SmartCare</p>

        <div class="role-options">
          <div
            class="role-card"
            :class="{ selected: selectedRole === 'driver' }"
            @click="selectRole('driver')"
          >
            <div class="role-icon">
              <i class="pi pi-car" style="font-size: 2rem; color: #3b82f6"></i>
            </div>
            <h4 class="role-name">Driver</h4>
            <p class="role-description">
              Manage your vehicles, find workshops, and get maintenance services
            </p>
            <div class="role-features">
              <div class="feature">• Vehicle management</div>
              <div class="feature">• Workshop finder</div>
              <div class="feature">• Maintenance tracking</div>
              <div class="feature">• Emergency assistance</div>
            </div>
          </div>

          <div
            class="role-card"
            :class="{ selected: selectedRole === 'workshop' }"
            @click="selectRole('workshop')"
          >
            <div class="role-icon">
              <i class="pi pi-wrench" style="font-size: 2rem; color: #f59e0b"></i>
            </div>
            <h4 class="role-name">Workshop</h4>
            <p class="role-description">
              Manage your workshop, receive quotes, and serve customers
            </p>
            <div class="role-features">
              <div class="feature">• Quote management</div>
              <div class="feature">• Appointment scheduling</div>
              <div class="feature">• Customer reviews</div>
              <div class="feature">• Business analytics</div>
            </div>
          </div>
        </div>

        <pv-button
          label="Continue"
          class="w-full continue-btn"
          :disabled="!selectedRole"
          @click="handleContinue"
        />
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

const selectedRole = ref('')

const selectRole = (role) => {
  selectedRole.value = role
}

const handleContinue = () => {
  console.log('Selected role:', selectedRole.value)
  // TODO: Implement role selection logic and redirect
}
</script>

<style scoped>
.role-selection {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.role-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
  margin: 0;
}

.role-subtitle {
  font-size: 1rem;
  color: #6b7280;
  text-align: center;
  margin: 0;
}

.role-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.role-card {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.role-card:hover {
  border-color: #8b5cf6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
}

.role-card.selected {
  border-color: #8b5cf6;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
}

.role-icon {
  text-align: center;
  margin-bottom: 1rem;
}

.role-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
  margin: 0 0 0.5rem 0;
}

.role-description {
  font-size: 0.875rem;
  color: #6b7280;
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
  color: #374151;
  line-height: 1.4;
}

.continue-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border: none;
  height: 48px;
  font-weight: 600;
  font-size: 1rem;
}

.continue-btn:disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}

.sign-in-link {
  color: #8b5cf6;
  text-decoration: none;
  font-weight: 500;
}

.sign-in-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .role-card {
    padding: 1rem;
  }

  .role-title {
    font-size: 1.25rem;
  }

  .role-name {
    font-size: 1.125rem;
  }
}
</style>
