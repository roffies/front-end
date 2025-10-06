<template>
  <div class="layout-footer">
    SmartCare by
    <a
      href="https://primevue.org"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary font-bold hover:underline"
      >PrimeVue</a
    >
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.layout-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  gap: 0.5rem;
  border-top: 1px solid var(--surface-border);
  color: var(--text-color-secondary);
  font-size: 0.875rem;
}

.layout-footer a {
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
  transition: color var(--element-transition-duration);
}

.layout-footer a:hover {
  color: var(--primary-color);
  text-decoration: underline;
}
</style>
