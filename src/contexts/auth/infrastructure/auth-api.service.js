import { http } from '../../../shared-kernel/infrastructure/http/http.js'

export class AuthApiService {
  async login(credentials) {
    const response = await http.post('/login', credentials)
    return response
  }

  async register(userData) {
    const response = await http.post('/register', userData)
    return response
  }

  async getCurrentUser() {
    const token = localStorage.getItem('accessToken')
    const response = await http.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  }

  async logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    return { success: true }
  }
}
