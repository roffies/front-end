import axios from 'axios'

export const BASE_URL = 'https://smartcare-api.up.railway.app'

export const http = axios.create({
  baseURL: BASE_URL,
})
