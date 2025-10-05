<template>
  <default-layout>
    <div class="workshop-dashboard">
      <h1>Workshop Dashboard</h1>
      <p>Manage your workshop and serve customers!</p>
      <!-- TODO: Implement workshop dashboard content -->
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/shared-kernel/presentation/layouts/default/default-layout.component.vue'
</script>

<style scoped>
.workshop-dashboard {
  padding: 2rem;
  text-align: center;
}

.workshop-dashboard h1 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.workshop-dashboard p {
  color: #6b7280;
}
</style>
