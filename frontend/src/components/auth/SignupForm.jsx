"use client"

import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import authService from '../../services/authService'
import useAuth from '../../hooks/useAuth'

export default function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { setUser } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await authService.signup({ name, email, password })
      if (res.token) localStorage.setItem('token', res.token)
      if (res.user) localStorage.setItem('user', JSON.stringify(res.user))
      setUser(res.user)
      window.location.href = '/dashboard'
    } catch (err) {
      console.error('Signup error:', err)
      const message = err?.message || String(err) || 'Signup failed'
      if (message.toLowerCase().includes('user exists')) {
        setError('Email already registered. Please use a different email.')
      } else if (message.toLowerCase().includes('invalid')) {
        setError('Please check your input and try again.')
      } else if (message.toLowerCase().includes('failed to fetch') || message.toLowerCase().includes('network')) {
        setError('Unable to reach the backend API. Check your API URL or deployment settings.')
      } else if (message.toLowerCase().includes('missing next_public_api_base_url')) {
        setError('Missing API base URL. Set NEXT_PUBLIC_API_BASE_URL in Vercel environment variables.')
      } else {
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 w-full">
      {error && <div className="text-sm md:text-base text-red-600">{error}</div>}
      <Input placeholder="Full name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit" className="w-full text-sm md:text-base">{loading ? 'Creating account...' : 'Create account'}</Button>
    </form>
  )
}
