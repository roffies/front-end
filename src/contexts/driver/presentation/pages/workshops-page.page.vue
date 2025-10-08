<template>
  <default-layout>
    <section class="p-6 space-y-6" :aria-label="t('aria.findWorkshop')">
      <h1 class="text-2xl font-semibold">{{ t('driver.workshops') }}</h1>
      <p class="text-gray-600">{{ t('auth.workshopFinder') }}</p>

      <!-- Estado de carga -->
      <div v-if="loading" class="text-gray-500">{{ t('common.loading') }}</div>

      <!-- Error -->
      <div v-else-if="error" class="text-red-600">
        {{ t('common.error') }}: {{ t('common.errorLoadingData') }}
      </div>

      <!-- Lista -->
      <div v-else class="space-y-5">
        <WorkshopCard
          v-for="w in workshops"
          :key="w.id"
          :workshop="w"
          @open="goToDetail(w.id)"
          @reserve="goToReserve(w.id)"
        />
        <div v-if="!workshops.length" class="text-gray-500">
          {{ t('driverProfile.noData') }}
        </div>
      </div>
    </section>
  </default-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import DefaultLayout from '@/shared-kernel/presentation/layouts/default/default-layout.component.vue'
import { WorkshopApiService } from '@/contexts/driver/infrastructure/workshop-api.service.js'
import WorkshopCard from '@/contexts/driver/presentation/workshop-card.vue'

const { t } = useI18n()

const workshops = ref([])
const loading = ref(false)
const error = ref(null)

const api = new WorkshopApiService()

async function load() {
  loading.value = true
  error.value = null
  try {
    const { data } = await api.getAll()
    workshops.value = Array.isArray(data) ? data : []
  } catch (e) {
    error.value = e?.message || 'load_error'
  } finally {
    loading.value = false
  }
}

function goToDetail(id) {
  // TODO: navega al detalle cuando exista la ruta
  console.log('Ver detalle taller', id)
}

function goToReserve(id) {
  // TODO: navega a reserva cuando exista la ruta
  console.log('Reservar taller', id)
}

onMounted(load)
</script>

<style scoped>
.text-2xl { font-size: 1.5rem; line-height: 2rem; font-weight: 600; }
.text-gray-500 { color: #6b7280; }
.text-gray-600 { color: #4b5563; }
.p-6 { padding: 1.5rem; }
.space-y-5 > * + * { margin-top: 1.25rem; }
.space-y-6 > * + * { margin-top: 1.5rem; }
</style>
