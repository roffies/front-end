<template>
  <default-layout>
    <div class="workshops-page">
      <h1>Workshops</h1>
      <p>Find and connect with nearby workshops!</p>
      <!-- TODO: Implement workshops page content -->
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/shared-kernel/presentation/layouts/default/default-layout.component.vue'
</script>

<style scoped>
.workshops-page {
  padding: 2rem;
  text-align: center;
}

.workshops-page h1 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.workshops-page p {
  color: #6b7280;
}
</style>
