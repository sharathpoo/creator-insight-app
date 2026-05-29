"use client"

import { useRouter } from 'next/navigation'
import useAuth from '../../hooks/useAuth'

export default function Navbar() {
  const router = useRouter()
  const { user, setUser } = useAuth()

  function handleLogout() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    setUser(null)
    router.push('/login')
  }

  return (
    <header className="w-full px-4 py-3 md:px-5 md:py-5 bg-white/95 border-b border-slate-200/70 shadow-sm backdrop-blur-xl flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-indigo-600">Creator Insights</p>
        <h1 className="text-lg md:text-2xl font-semibold text-slate-900">Social media performance</h1>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {user && <span className="hidden sm:inline rounded-full bg-slate-100 px-3 py-2 text-xs md:text-sm text-slate-700">{user.name}</span>}
        <button type="button" onClick={handleLogout} className="rounded-2xl bg-slate-900 px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-white transition hover:bg-slate-800">
          Logout
        </button>
      </div>
    </header>
  )
}
