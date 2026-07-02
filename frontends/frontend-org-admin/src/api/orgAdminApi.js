import api from './http'

export const getOrganizations = async () => {
  const { data } = await api.get('/api/org/getOrgs')
  return data.organizations || []
}

export const loginAdmin = async ({ email, password }) => {
  const { data } = await api.post('/api/users/login', { email, password })
  return data
}

export const signupAdmin = async (form) => {
  const { data } = await api.post('/api/users/signup', form)
  return data
}

export const getFlags = async (organizationId) => {
  const { data } = await api.get(`/api/flags/getflags/${organizationId}`)
  return data.featureFlags || []
}

export const createFlag = async (payload) => {
  const { data } = await api.post('/api/flags/createflag', payload)
  return data
}

export const updateFlag = async (flagId, isEnabled) => {
  const { data } = await api.put(`/api/flags/updateflag/${flagId}`, { isEnabled })
  return data
}

export const deleteFlag = async (flagId) => {
  const { data } = await api.delete(`/api/flags/deleteflag/${flagId}`)
  return data
}
