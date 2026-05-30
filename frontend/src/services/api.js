const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : '')

function resolveUrl(path) {
  if (!BASE) {
    throw new Error('Missing NEXT_PUBLIC_API_BASE_URL. Set it in Vercel environment variables or use a same-origin API route.')
  }
  return `${BASE}${path}`
}

export async function fetchJSON(path, opts = {}) {
  const headers = Object.assign({}, opts.headers || {})
  if (opts.body && !headers['Content-Type']) headers['Content-Type'] = 'application/json'
  let token = null
  try {
    if (typeof window !== 'undefined') token = localStorage.getItem('token')
  } catch (e) {}
  if (token) headers['Authorization'] = `Bearer ${token}`

  const url = resolveUrl(path)
  const res = await fetch(url, { ...opts, headers })
  if (!res.ok) {
    const text = await res.text()
    let message = res.statusText || 'Request failed'
    try { const parsed = JSON.parse(text); message = parsed.message || JSON.stringify(parsed) } catch (e) {}
    const err = new Error(`${message} (${res.status})`)
    err.status = res.status
    throw err
  }
  return res.json()
}

const api = { fetchJSON }

export default api
