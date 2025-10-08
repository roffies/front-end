import { http } from '../../../shared-kernel/infrastructure/http/http.js'

export class WorkshopApiService {
  async getAll() {
    const response = await http.get('/workshops')
    return response
  }

  async getById(id) {
    const response = await http.get(`/workshops/${id}`)
    return response
  }

  async create(workshop) {
    const response = await http.post('/workshops', workshop)
    return response
  }

  async update(id, workshop) {
    const response = await http.patch(`/workshops/${id}`, workshop)
    return response
  }

  async delete(id) {
    const response = await http.delete(`/workshops/${id}`)
    return response
  }
}
