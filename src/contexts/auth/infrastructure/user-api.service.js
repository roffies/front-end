import { http } from '../../../shared-kernel/infrastructure/http/http.js'

export class UserApiService {
  async getAll() {
    const response = await http.get('/users')
    return response
  }

  async getById(id) {
    const response = await http.get(`/users/${id}`)
    return response
  }

  async getByRole(role) {
    const response = await http.get(`/users?role=${role}`)
    return response
  }

  async create(user) {
    const response = await http.post('/users', user)
    return response
  }

  async update(id, user) {
    const response = await http.patch(`/users/${id}`, user)
    return response
  }

  async delete(id) {
    const response = await http.delete(`/users/${id}`)
    return response
  }
}
