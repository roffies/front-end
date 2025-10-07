import axios from 'axios'

export const BASE_URL = 'https://smartcare-api.up.railway.app'

export const http = axios.create({
  baseURL: BASE_URL,
})

// Add token to requests automatically
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
