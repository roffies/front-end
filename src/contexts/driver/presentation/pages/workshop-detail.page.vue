<template>
  <default-layout>
    <section class="page" :aria-label="t('workshopProfile.title')">
      <button class="btn-back" @click="goBack">
        ← {{ t('common.back') }}
      </button>

      <div v-if="loading" class="state muted">
        {{ t('common.loading') }}
      </div>

      <div v-else-if="error" class="state error">
        {{ t('common.errorLoadingData') }}
      </div>

      <div v-else-if="!workshop" class="state muted">
        {{ t('workshopProfile.noData') }}
      </div>

      <div v-else class="detail-card">
        <header class="header">
          <div class="title-wrap">
            <h1 class="title">{{ workshop.name }}</h1>
            <span class="status" :class="isOpen ? 'open' : 'closed'">
              <span class="dot"></span>
              {{ isOpen ? t('common.open') : t('common.closed') }}
            </span>
          </div>
          <p class="subtitle">📍 {{ workshop.address }}</p>
        </header>

        <div class="content">
          <section class="info">
            <div class="row">
              <span class="label">{{ t('common.phone') }}</span>
              <span class="value">📞 {{ workshop.phone }}</span>
            </div>

            <div class="row">
              <span class="label">Email</span>
              <span class="value">✉️ {{ workshop.email }}</span>
            </div>

            <div class="row">
              <span class="label">{{ t('workshop.rating') }}</span>
              <span class="value">
                <span class="stars">★★★★★</span>
                <span class="rating">({{ workshop.rating }})</span>
              </span>
            </div>

            <div class="row">
              <span class="label">{{ t('workshop.schedule') }}</span>
              <span class="value">🕒 {{ workshop.hours }}</span>
            </div>
          </section>

          <section class="services">
            <h2 class="section-title">{{ t('workshop.services') }}</h2>
            <div class="chips">
              <span v-for="s in workshop.services" :key="s" class="chip">{{ s }}</span>
            </div>
          </section>
        </div>

        <footer class="actions">
          <button class="btn-secondary" @click="goBack">{{ t('common.back') }}</button>
          <button class="btn-primary" @click="reserveWorkshop">{{ t('driver.quotes') }}</button>
        </footer>
      </div>
    </section>
  </default-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import DefaultLayout from '@/shared-kernel/presentation/layouts/default/default-layout.component.vue'
import { WorkshopApiService } from '@/contexts/driver/infrastructure/workshop-api.service.js'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const workshop = ref(null)
const loading = ref(false)
const error = ref(null)
const api = new WorkshopApiService()

const isOpen = computed(() => workshop.value?.status === 'active')

async function loadWorkshop() {
  loading.value = true
  try {
    const { data } = await api.getById(route.params.id)
    workshop.value = data
  } catch (e) {
    error.value = e?.message || 'Error loading workshop'
  } finally {
    loading.value = false
  }
}

function goBack() {
  router.back()
}

function reserveWorkshop() {
  console.log('Reserva taller:', workshop.value?.id)
}

onMounted(loadWorkshop)
</script>

<style scoped>
:root {}
.page {
  padding: 2rem 1rem;
}
.state {
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
}
.state.muted { color: #475569; background: #f1f5f9; }
.state.error { color: #991b1b; background: #fee2e2; }

.detail-card {
  background: #ffffff;
  border-radius: 1.25rem;
  box-shadow: 0 12px 36px rgba(16, 24, 40, 0.12);
  border: 1px solid #eef2f7;
  overflow: hidden;
}

.header { padding: 1.5rem 1.5rem 0.75rem 1.5rem; }
.title-wrap {
  display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;
}
.title {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700; color: #0f172a; margin: 0;
}
.subtitle {
  margin-top: .25rem; color: #475569; font-size: 0.975rem;
}

.status {
  display: inline-flex; align-items: center; gap: .5rem;
  font-size: .85rem; padding: .35rem .6rem; border-radius: 999px;
  border: 1px solid transparent; user-select: none;
}
.status .dot { width: .5rem; height: .5rem; border-radius: 999px; background: currentColor; display: inline-block; }
.status.open { background: #ecfccb; color: #166534; border-color: #bbf7d0; }
.status.closed { background: #fee2e2; color: #991b1b; border-color: #fecaca; }

.content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.25rem;
  padding: 0.75rem 1.5rem 1.25rem 1.5rem;
}
@media (max-width: 920px) {
  .content { grid-template-columns: 1fr; }
}

.info {
  display: grid;
  gap: .65rem;
  background: #fafafa;
  border: 1px solid #f1f5f9;
  border-radius: .9rem;
  padding: 1rem;
}
.row { display: grid; grid-template-columns: 180px 1fr; gap: .75rem; align-items: center; }
@media (max-width: 520px) {
  .row { grid-template-columns: 1fr; }
}
.label { color: #64748b; font-weight: 600; }
.value { color: #1f2937; }

.services { padding: 1rem; }
.section-title { margin: 0 0 .5rem 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; }
.chips { display: flex; flex-wrap: wrap; gap: .5rem; }
.chip {
  padding: .35rem .65rem;
  font-size: .85rem;
  border-radius: .6rem;
  background: #eef2ff;
  color: #3730a3;
  border: 1px solid #e0e7ff;
}

.actions {
  display: flex; gap: .75rem; padding: 0 1.5rem 1.5rem 1.5rem; justify-content: flex-end;
}
.btn-primary {
  background: #047857; color: white; padding: .65rem 1rem; border: none;
  border-radius: .75rem; cursor: pointer;
}
.btn-primary:hover { filter: brightness(0.95); }
.btn-secondary {
  background: #f8fafc; color: #0f172a; border: 1px solid #e2e8f0;
  padding: .65rem 1rem; border-radius: .75rem; cursor: pointer;
}
.btn-secondary:hover { background: #f1f5f9; }

.btn-back {
  margin-bottom: 1rem;
  background: #f8fafc; color: #0f172a; border: 1px solid #e2e8f0;
  padding: .45rem .8rem; border-radius: .6rem; cursor: pointer;
}
.btn-back:hover { background: #f1f5f9; }
</style>
