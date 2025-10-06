import { http } from '../../../shared-kernel/infrastructure/http/http.js'

export class AppointmentApiService {
  async getAll() {
    const response = await http.get('/appointments')
    return response
  }

  async getByWorkshopId(workshopId) {
    const response = await http.get(`/appointments?workshopId=${workshopId}`)
    return response
  }

  async getByUserId(userId) {
    const response = await http.get(`/appointments?userId=${userId}`)
    return response
  }

  async getById(id) {
    const response = await http.get(`/appointments/${id}`)
    return response
  }

  async create(appointment) {
    const response = await http.post('/appointments', appointment)
    return response
  }

  async update(id, appointment) {
    const response = await http.patch(`/appointments/${id}`, appointment)
    return response
  }

  async delete(id) {
    const response = await http.delete(`/appointments/${id}`)
    return response
  }
}
