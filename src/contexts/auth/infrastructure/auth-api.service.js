import { http } from '../../../shared-kernel/infrastructure/http/http.js'
import { TokenManager } from '../../../shared-kernel/infrastructure/auth/token-manager.js'

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
    // Token is automatically added by http interceptor
    const response = await http.get('/me')
    return response
  }

  async logout() {
    // Clear all authentication data using TokenManager
    TokenManager.clearAuth()
    return { success: true }
  }
}
