import axios from 'axios'
import { TokenManager } from '../auth/token-manager.js'

export const BASE_URL = 'https://smartcare-api-production.up.railway.app'

export const http = axios.create({
  baseURL: BASE_URL,
})

// Request interceptor: Add token to all requests automatically
http.interceptors.request.use(
  (config) => {
    const token = TokenManager.getToken()

    // Public endpoints that don't require authentication
    const publicEndpoints = ['/login', '/register']
    const isPublicEndpoint = publicEndpoints.some((endpoint) => config.url?.includes(endpoint))

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else if (!isPublicEndpoint) {
      // Only warn if it's NOT a public endpoint
      console.log('⚠️ No token found for request:', config.url)
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor: Handle 401 Unauthorized
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('🔒 Unauthorized request, clearing auth data')
      TokenManager.clearAuth()
      // Redirect to login if we're not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)
