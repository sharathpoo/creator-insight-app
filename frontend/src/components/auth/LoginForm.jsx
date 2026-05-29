"use client"

import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import authService from '../../services/authService'
import useAuth from '../../hooks/useAuth'

export default function LoginForm() {
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
      const res = await authService.login({ email, password })
      if (res.token) {
        localStorage.setItem('token', res.token)
      }
      if (res.user) {
        localStorage.setItem('user', JSON.stringify(res.user))
      }
      setUser(res.user)
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 w-full">
      {error && <div className="text-sm md:text-base text-red-600">{error}</div>}
      <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit" className="w-full text-sm md:text-base">{loading ? 'Signing in...' : 'Sign in'}</Button>
    </form>
  )
}
