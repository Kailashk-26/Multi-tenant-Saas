import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export const getApiError = (error, fallback) => {
  return error.response?.data?.error || error.response?.data?.message || error.message || fallback
}

export default api
