import axios from 'axios'

export const BASE_URL = 'http://localhost:3002'

export const http = axios.create({
  baseURL: BASE_URL,
})
