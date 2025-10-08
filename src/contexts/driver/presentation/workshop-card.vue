<template>
  <article class="card">
    <div class="card-left">
      <h3 class="title">{{ workshop.name }}</h3>

      <p class="muted">{{ t('workshopProfile.address') || 'Dirección' }}: {{ workshop.address }}</p>
      <p class="muted">{{ t('common.phone') }}: {{ workshop.phone }}</p>
      <p class="muted">Email: {{ workshop.email }}</p>
      <p class="muted">
        {{ t('workshop.rating') }}: ★★★★★ ({{ workshop.rating }})
      </p>
      <p class="muted">
        {{ t('workshop.services') }}: {{ (workshop.services || []).join(', ') }}
      </p>
      <p class="muted">
        {{ t('workshop.schedule') }}: {{ workshop.hours }}
      </p>

      <div class="actions">
        <button class="btn-outline" @click="$emit('open')">{{ t('nav.profile') }}</button>
        <button class="btn-primary" @click="$emit('reserve')">{{ t('driver.quotes') }}</button>
      </div>
    </div>

    <div class="card-right">
      <span class="badge" :class="isOpen ? 'badge-open' : 'badge-default'">
        {{ isOpen ? t('common.open') : t('common.closed') }}
      </span>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  workshop: { type: Object, required: true },
})

const isOpen = computed(() => props.workshop?.status === 'active')
</script>

<style scoped>
.card {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(16, 24, 40, 0.06);
  justify-content: space-between;
}
.card-left { flex: 1; min-width: 0; }
.card-right { display: flex; align-items: start; min-width: 120px; justify-content: flex-end; }
.title { font-size: 1.125rem; font-weight: 600; margin-bottom: .25rem; }
.muted { color: #4b5563; font-size: .925rem; margin: .15rem 0; }
.actions { margin-top: .75rem; display: flex; gap: .5rem; }
.btn-primary {
  background: #047857; color: white; border: none;
  padding: .5rem .9rem; border-radius: .75rem; cursor: pointer;
}
.btn-outline {
  border: 1px solid #d1d5db; background: transparent; color: #111827;
  padding: .5rem .9rem; border-radius: .75rem; cursor: pointer;
}
.btn-primary:hover { filter: brightness(0.95); }
.btn-outline:hover { background: #f9fafb; }
.badge { padding: .25rem .6rem; border-radius: .5rem; font-size: .875rem; }
.badge-open { background: rgba(250, 204, 21, .8); }
.badge-default { background: #e5e7eb; }
</style>
