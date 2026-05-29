const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || ''

export async function fetchJSON(path, opts = {}) {
  const headers = Object.assign({}, opts.headers || {})
  if (opts.body && !headers['Content-Type']) headers['Content-Type'] = 'application/json'
  let token = null
  try {
    if (typeof window !== 'undefined') token = localStorage.getItem('token')
  } catch (e) {}
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...opts, headers })
  if (!res.ok) {
    const text = await res.text()
    let message = res.statusText
    try { const parsed = JSON.parse(text); message = parsed.message || JSON.stringify(parsed) } catch (e) {}
    const err = new Error(message)
    err.status = res.status
    throw err
  }
  return res.json()
}

const api = { fetchJSON }

export default api
