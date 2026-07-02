import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('superAdminToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const getApiError = (error, fallback) => {
  return error.response?.data?.error || error.response?.data?.message || error.message || fallback
}

export default api
