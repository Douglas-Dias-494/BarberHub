import api from './api'

export const authService = {
  async login(credentials) {
    const { data } = await api.post('/auth/login', credentials)
    return data
  },

  async register(credentials) {
    const { data } = await api.post('/auth/register', credentials)
    return data
  },

  async getMe() {
    const { data } = await api.get('/auth/me')
    return data
  }
}