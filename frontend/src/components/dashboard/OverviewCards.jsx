"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getOverview } from '../../services/analyticsService'
import Card from '../ui/Card'
import Loader from '../ui/Loader'

function formatNumber(value) {
  if (value == null) return '-'
  return value.toLocaleString()
}

export default function OverviewCards() {
  const [platforms, setPlatforms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const response = await getOverview()
        setPlatforms(response.platforms || [])
      } catch (err) {
        setError(err.message || 'Unable to load overview')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="p-6 flex justify-center"><Loader /></div>
  if (error) return <div className="p-6 text-red-600">{error}</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-4">
      {platforms.map((platform) => (
        <Link key={platform.id} href={`/dashboard/${platform.id}`} className="block">
          <Card className="group border-l-4 border-indigo-500/80 hover:border-fuchsia-500 transition duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-indigo-600/90">{platform.name}</p>
                <p className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900">{formatNumber(platform.followers)}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Reach</p>
                <p className="text-lg md:text-xl font-semibold text-slate-900">{formatNumber(platform.reach)}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs md:text-sm text-slate-600">
              <span>Engagement {platform.engagement_rate != null ? `${platform.engagement_rate}%` : '-'}</span>
              <span className="text-indigo-500 group-hover:text-fuchsia-600">View details -&gt;</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
