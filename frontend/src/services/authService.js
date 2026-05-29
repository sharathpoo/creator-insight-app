import api from './api'

export async function login(credentials) {
  return api.fetchJSON('/auth/login', { method: 'POST', body: JSON.stringify(credentials) })
}

export async function signup(data) {
  return api.fetchJSON('/auth/register', { method: 'POST', body: JSON.stringify(data) })
}

const authService = { login, signup }

export default authService
