<template>
  <default-layout>
    <div class="driver-profile">
      <h1>Driver Profile</h1>
      <p>Manage your personal information and preferences!</p>
      <!-- TODO: Implement driver profile content -->
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/shared-kernel/presentation/layouts/default/default-layout.component.vue'
</script>

<style scoped>
.driver-profile {
  padding: 2rem;
  text-align: center;
}

.driver-profile h1 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.driver-profile p {
  color: #6b7280;
}
</style>
