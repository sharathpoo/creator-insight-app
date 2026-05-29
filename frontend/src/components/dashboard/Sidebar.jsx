"use client"

import Link from 'next/link'
import { useState } from 'react'

const platforms = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'x', label: 'X' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white flex items-center justify-center shadow-lg hover:opacity-90 transition"
        title="Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {open && <div className="md:hidden fixed inset-0 bg-black/30 z-30" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed md:static top-0 left-0 h-screen md:h-full w-64 p-6 bg-gradient-to-b from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-xl shadow-slate-900/10 transition-transform duration-300 z-40 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-indigo-200/80">Creator Insights</p>
          <h2 className="text-2xl font-bold">Creator Hub</h2>
          <p className="text-sm text-indigo-100/80">Performance and engagement across every channel.</p>
        </div>
        <nav className="mt-8 space-y-2">
          <Link href="/dashboard" onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-white/10">Overview</Link>
          <div className="mt-6 text-[0.65rem] uppercase tracking-[0.35em] text-indigo-100/70">Platforms</div>
          {platforms.map((platform) => (
            <Link
              key={platform.id}
              href={`/dashboard/${platform.id}`}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-white/10"
            >
              {platform.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
