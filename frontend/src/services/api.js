import axios from 'axios'
import { storage } from '../utils/storage'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = storage.getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      storage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(err.response?.data || err)
  }
)

export default api