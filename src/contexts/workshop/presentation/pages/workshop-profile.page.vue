<template>
  <default-layout>
    <div class="workshop-profile">
      <h1>Workshop Profile</h1>
      <p>Manage your workshop information and settings!</p>
      <!-- TODO: Implement workshop profile content -->
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/shared-kernel/presentation/layouts/default/default-layout.component.vue'
</script>

<style scoped>
.workshop-profile {
  padding: 2rem;
  text-align: center;
}

.workshop-profile h1 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.workshop-profile p {
  color: #6b7280;
}
</style>
