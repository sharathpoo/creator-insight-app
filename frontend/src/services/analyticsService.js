import api from './api'

export async function getOverview() {
  return api.fetchJSON('/analytics/overview')
}

export async function getPlatform(platform) {
  return api.fetchJSON(`/analytics/${platform}`)
}

const analyticsService = { getOverview, getPlatform }

export default analyticsService
