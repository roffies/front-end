<template>
  <default-layout>
    <div class="workshops-page">
      <h1 class="title">{{ $t('auth.workshop') }}</h1>

      <div v-if="isLoading" class="status">{{ $t('common.loading') }}</div>
      <div v-else-if="error" class="status error">{{ $t('common.errorLoadingData') }}</div>
      <div v-else-if="workshops.length === 0" class="status empty">
        {{ $t('workshop.noWorkshopsFound') }}
      </div>

      <div v-else class="workshops-grid">
        <div v-for="workshop in workshops" :key="workshop.id" class="workshop-card">
          <h2>{{ workshop.name }}</h2>
          <p><strong>{{ $t('common.phone') }}:</strong> {{ workshop.phone }}</p>
          <p><strong>{{ $t('common.status') }}:</strong> {{ workshop.status }}</p>

          <pv-button
            :label="$t('workshop.newAppointment')"
            class="mt-2"
            @click="toggleForm(workshop.id)"
          />

          <div v-if="showFormFor === workshop.id" class="appointment-form">
            <h3>{{ $t('workshop.newAppointment') }}</h3>

            <div class="input-group">
              <label>{{ $t('workshop.service') }}</label>
              <pv-input-text v-model="newAppointment.service" />
            </div>

            <div class="input-group">
              <label>{{ $t('common.date') }}</label>
              <pv-input-text type="date" v-model="newAppointment.date" />
            </div>

            <div class="input-group">
              <label>{{ $t('common.time') }}</label>
              <pv-input-text type="time" v-model="newAppointment.time" />
            </div>

            <pv-button
              :label="$t('common.save')"
              class="primary-btn mt-2"
              @click="createAppointment(workshop.id)"
              :loading="creating"
            />
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DefaultLayout from '@/shared-kernel/presentation/layouts/default/default-layout.component.vue'
import { AppointmentApiService } from '@/contexts/workshop/infrastructure/appointment-api.service.js'
import { WorkshopApiService } from '@/contexts/workshop/infrastructure/workshop-api.service.js'

const workshops = ref([])
const isLoading = ref(true)
const error = ref(null)
const showFormFor = ref(null)
const newAppointment = ref({
  service: '',
  date: '',
  time: '',
})
const creating = ref(false)

const appointmentService = new AppointmentApiService()
const workshopService = new WorkshopApiService()

onMounted(async () => {
  try {
    const response = await workshopService.getAll()
    workshops.value = response.data
  } catch (err) {
    console.error(err)
    error.value = true
  } finally {
    isLoading.value = false
  }
})

function toggleForm(id) {
  showFormFor.value = showFormFor.value === id ? null : id
}

async function createAppointment(workshopId) {
  creating.value = true
  try {
    await appointmentService.create({
      workshopId,
      service: newAppointment.value.service,
      date: newAppointment.value.date,
      time: newAppointment.value.time,
      status: 'pending',
    })
    alert('✅')
    newAppointment.value = { service: '', date: '', time: '' }
    showFormFor.value = null
  } catch (e) {
    console.error(e)
    alert('ERROR')
  } finally {
    creating.value = false
  }
}
</script>

<style scoped>
.workshops-page {
  padding: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.status {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.status.error {
  color: #e74c3c;
}

.status.empty {
  color: #999;
}

.workshops-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.workshop-card {
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.appointment-form {
  margin-top: 1rem;
  padding: 1rem;
  border-top: 1px solid #ddd;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.3rem;
}
</style>
