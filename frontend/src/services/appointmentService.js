import api from './api'

export const appointmentService = {
  async create(appointmentData) {
    const { data } = await api.post('/appointments', appointmentData)
    return data
  },

  async getMyAppointments() {
    const { data } = await api.get('/appointments/mine')
    return data
  },

  async getShopAppointments(shopId, params = {}) {
    const { data } = await api.get(`/appointments/shop/${shopId}`, { params })
    return data
  },

  async getById(id) {
    const { data } = await api.get(`/appointments/${id}`)
    return data
  },

  async updateStatus(id, status) {
    const { data } = await api.patch(`/appointments/${id}/status`, { status })
    return data
  },

  async cancel(id) {
    const { data } = await api.patch(`/appointments/${id}/cancel`)
    return data
  }
}