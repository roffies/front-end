<script setup>
import { ref, onMounted, computed } from 'vue'
import DefaultLayout from '@/shared-kernel/presentation/layouts/default/default-layout.component.vue'
import { AppointmentApiService } from '@/contexts/workshop/infrastructure/appointment-api.service.js'
import { AppointmentAssembler } from '@/contexts/workshop/domain/appointment.assembler.js'


const appointmentService = new AppointmentApiService()
const appointments = ref([])
const sortedAppointments = computed(() =>
  [...appointments.value].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1
    if (a.status !== 'pending' && b.status === 'pending') return 1
    return 0
  })
)
const isLoading = ref(true)
const error = ref(null)
const showForm = ref(false)
const newAppointment = ref({
  userId: '',
  workshopId: '',
  vehicleId: '',
  service: '',
  date: '',
  time: '',
  status: 'Pending',
  estimatedDuration: 1,
  estimatedCost: 0,
  notes: ''
})
const isSubmitting = ref(false)
const submitError = ref(null)

onMounted(async () => {
  try {
    const response = await appointmentService.getAll()
    appointments.value = AppointmentAssembler.toEntitiesFromResponse(response)
  } catch (err) {
    console.error(err)
    error.value = 'Error.'
  } finally {
    isLoading.value = false
  }
})

async function addAppointment() {
  isSubmitting.value = true
  submitError.value = null
  try {
    const response = await appointmentService.create(newAppointment.value)
    const created = AppointmentAssembler.toEntityFromResource(response.data)
    appointments.value.push(created)

    // Reset form
    newAppointment.value = {
      userId: '',
      workshopId: '',
      vehicleId: '',
      service: '',
      date: '',
      time: '',
      status: 'Pending',
      estimatedDuration: 1,
      estimatedCost: 0,
      notes: ''
    }
  } catch (err) {
    console.error(err)
    submitError.value = 'Failed to create appointment.'
  } finally {
    isSubmitting.value = false
  }
}

async function completeAppointment(appointment) {
  try {
    const updated = { ...appointment, status: 'completed' }
    await appointmentService.update(appointment.id, updated)

    // Update the local state too:
    const index = appointments.value.findIndex(a => a.id === appointment.id)
    if (index !== -1) {
      appointments.value[index].status = 'completed'
    }
  } catch (err) {
    console.error(err)
    alert('Failed to complete appointment.')
  }
}

function toggleForm() {
  showForm.value = !showForm.value
}

</script>

<template>
  <default-layout>
    <div class="appointments-page">
      <h1 class="title">{{ $t('workshop.pendingAppointments') }}</h1>

      <div v-if="isLoading" class="status">{{ $t('workshop.loadingAppointments') }}</div>

      <div v-else-if="error" class="status error">{{ error }}</div>

      <div v-else-if="appointments.length === 0" class="status empty">
        {{ $t('workshop.noAppointmentsFound') }}
      </div>

      <div v-else class="appointments-grid">
        <div v-for="appointment in sortedAppointments" :key="appointment.id" class="appointment-card" :class="{ completed: appointment.status === 'completed' }">
          <h2 class="service">{{ appointment.service || 'Service' }}</h2>

          <p><strong>{{ $t('common.date') }}:</strong> {{ appointment.date || '—' }}</p>
          <p><strong>{{ $t('common.time') }}:</strong> {{ appointment.time || '—' }}</p>
          <p><strong>{{ $t('common.status') }}:</strong> {{ appointment.status || 'Pending' }}</p>
          <p><strong>{{ $t('workshop.estimatedDuration') }}:</strong> {{ appointment.estimatedDuration }} hrs</p>
          <p><strong>{{ $t('workshop.estimatedCost') }}:</strong> ${{ appointment.estimatedCost }}</p>

          <p v-if="appointment.notes"><strong>{{ $t('workshop.notes') }}:</strong> {{ appointment.notes }}</p>

          <div class="meta">
            <small>User ID: {{ appointment.userId }}</small>
            <small>Vehicle ID: {{ appointment.vehicleId }}</small>
          </div>

          <button class="complete-btn" :disabled="appointment.status === 'completed'" @click="completeAppointment(appointment)">
            {{ appointment.status === 'completed' ? 'Completed' : 'Mark as Completed' }}
          </button>
        </div>
      </div>

      <div class="add-appointment-section">
        <button class="toggle-form-btn" @click="toggleForm">
          {{ showForm ? $t('common.back') + ' ▲' : $t('workshop.addAppointment') +'▼' }}
        </button>

        <transition name="fade">
          <form v-if="showForm" @submit.prevent="addAppointment" class="add-appointment-form">
            <h2>{{ $t('workshop.newAppointment') }}</h2>

            <div class="form-group">
              <label>{{ $t('auth.driver') }}</label>
              <input v-model="newAppointment.userId" type="text" required />
            </div>

            <div class="form-group">
              <label>{{ $t('auth.workshop') }}</label>
              <input v-model="newAppointment.workshopId" type="text" required />
            </div>

            <div class="form-group">
              <label>{{ $t('aria.vehicle') }}</label>
              <input v-model="newAppointment.vehicleId" type="text" required />
            </div>

            <div class="form-group">
              <label>{{ $t('workshop.service') }}</label>
              <input v-model="newAppointment.service" type="text" required />
            </div>

            <div class="form-group">
              <label>{{ $t('common.date') }}</label>
              <input v-model="newAppointment.date" type="date" required />
            </div>

            <div class="form-group">
              <label>{{ $t('common.time') }}</label>
              <input v-model="newAppointment.time" type="time" required />
            </div>

            <div class="form-group">
              <label>{{ $t('workshop.estimatedDuration') }}</label>
              <input v-model.number="newAppointment.estimatedDuration" type="number" min="1" />
            </div>

            <div class="form-group">
              <label>{{ $t('workshop.estimatedCost') }}</label>
              <input v-model.number="newAppointment.estimatedCost" type="number" min="0" />
            </div>

            <div class="form-group">
              <label>{{ $t('workshop.notes') }}</label>
              <textarea v-model="newAppointment.notes"></textarea>
            </div>

            <button type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? $t('workshop.inProgress') : $t('workshop.addAppointment') }}
            </button>

            <p v-if="submitError" class="error">{{ submitError }}</p>
          </form>
        </transition>
      </div>


    </div>
  </default-layout>
</template>

<style scoped>
.appointments-page {
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

.appointments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.appointment-card {
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  transition: transform 0.2s ease;
}

.appointment-card.completed {
  opacity: 0.7;
  border: 2px solid #2ecc71;
}

.complete-btn[disabled] {
  background: #95a5a6;
  cursor: not-allowed;
}

.appointment-card:hover {
  transform: translateY(-4px);
}

.service {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.meta {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: #777;
  display: flex;
  justify-content: space-between;
}

.add-appointment-form {
  margin-top: 3rem;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.add-appointment-form h2 {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
}

button[type="submit"] {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
}

button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  margin-top: 0.5rem;
  color: #e74c3c;
}

.complete-btn {
  margin-top: 1rem;
  background: #2ecc71;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
}

.complete-btn:hover {
  background: #27ae60;
}

.add-appointment-section {
  margin-top: 3rem;
  text-align: center;
}

.toggle-form-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}

.toggle-form-btn:hover {
  background: #2980b9;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


</style>
