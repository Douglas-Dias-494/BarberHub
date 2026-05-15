import api from './api'

export const barberShopService = {
  async getAll(params = {}) {
    const { data } = await api.get('/barbershops', { params })
    return data
  },

  async getById(id) {
    const { data } = await api.get(`/barbershops/${id}`)
    return data
  },

  async getNearby(lat, lng, radius = 10) {
    const { data } = await api.get('/barbershops/nearby', {
      params: { lat, lng, radius }
    })
    return data
  },

  async getMyShop() {
    const { data } = await api.get('/barbershops/mine')
    return data
  },

  async create(shopData) {
    const { data } = await api.post('/barbershops', shopData)
    return data
  },

  async update(id, shopData) {
    const { data } = await api.put(`/barbershops/${id}`, shopData)
    return data
  },

  async delete(id) {
    const { data } = await api.delete(`/barbershops/delete/${id}`)
    return data
  },

  //Appointments

  async getMyAppointments() {
    const { data } = await api.get(`/appointments/my`)
    return data
  }, 

  // Services
  async getServices(shopId) {
    const { data } = await api.get(`/services/${shopId}`)
    return data
  },

  async createService(shopId, serviceData) {
    const { data } = await api.post(`/services/${shopId}`, serviceData)
    return data
  },

  async updateService(shopId, serviceId, serviceData) {
    const { data } = await api.put(`/services/${shopId}/${serviceId}`, serviceData)
    return data
  },

  async deleteService(shopId, serviceId) {
    const { data } = await api.delete(`/services/${shopId}/${serviceId}`)
    return data
  },

  // Schedules
  async getSchedules(shopId) {
    const { data } = await api.get(`/barbershops/${shopId}/schedules`)
    return data
  },

  async setSchedules(shopId, schedules) {
    const { data } = await api.put(`/barbershops/${shopId}/schedules`, { schedules })
    return data
  },

  async getAvailableSlots(shopId, date) {
    const { data } = await api.get(`/barbershops/${shopId}/slots`, { params: { date } })
    return data
  }
}