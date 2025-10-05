<template>
  <default-layout>
    <div class="quotes-page">
      <h1>Quotes</h1>
      <p>Manage incoming quote requests and respond to customers!</p>
      <!-- TODO: Implement quotes page content -->
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/shared-kernel/presentation/layouts/default/default-layout.component.vue'
</script>

<style scoped>
.quotes-page {
  padding: 2rem;
  text-align: center;
}

.quotes-page h1 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.quotes-page p {
  color: #6b7280;
}
</style>
