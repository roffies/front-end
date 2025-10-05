<template>
  <default-layout>
    <div class="history-page">
      <h1>History</h1>
      <p>View your service history and transactions!</p>
      <!-- TODO: Implement history page content -->
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/shared-kernel/presentation/layouts/default/default-layout.component.vue'
</script>

<style scoped>
.history-page {
  padding: 2rem;
  text-align: center;
}

.history-page h1 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.history-page p {
  color: #6b7280;
}
</style>
