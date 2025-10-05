import axios from 'axios'

export const BASE_URL = 'https://68d448d6214be68f8c68eb21.mockapi.io/api/v1'

export const http = axios.create({
  baseURL: BASE_URL,
})
