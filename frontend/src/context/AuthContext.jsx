"use client"

import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('user')
      if (stored) setUser(JSON.parse(stored))
    } catch (e) {
      console.warn('Unable to restore user', e)
    }
  }, [])

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
