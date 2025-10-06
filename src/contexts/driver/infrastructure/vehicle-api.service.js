import { http } from '../../../shared-kernel/infrastructure/http/http.js'

export class VehicleApiService {
  async getAll() {
    const response = await http.get('/vehicles')
    return response
  }

  async getByUserId(userId) {
    const response = await http.get(`/vehicles?userId=${userId}`)
    return response
  }

  async getById(id) {
    const response = await http.get(`/vehicles/${id}`)
    return response
  }

  async create(vehicle) {
    const response = await http.post('/vehicles', vehicle)
    return response
  }

  async update(id, vehicle) {
    const response = await http.patch(`/vehicles/${id}`, vehicle)
    return response
  }

  async delete(id) {
    const response = await http.delete(`/vehicles/${id}`)
    return response
  }
}
