"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedRoute({ children }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null
    if (!token) {
      router.replace('/login')
      return
    }
    setReady(true)
  }, [router])

  if (!ready) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Checking access...</div>
  }

  return <>{children}</>
}
