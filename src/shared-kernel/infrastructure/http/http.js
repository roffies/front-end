import axios from 'axios'

export const BASE_URL = 'https://api.smartcare.com'

export const http = axios.create({
  baseURL: BASE_URL,
})
