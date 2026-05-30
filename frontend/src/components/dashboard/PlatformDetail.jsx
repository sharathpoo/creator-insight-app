"use client"

import { useEffect, useMemo, useState } from 'react'
import { getPlatform } from '../../services/analyticsService'
import Card from '../ui/Card'
import Loader from '../ui/Loader'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

const PLATFORM_CONFIG = {
  instagram: {
    title: 'Instagram',
    metricKey: 'followers',
    metricLabel: 'Followers',
    chartKey: 'followers',
    topTitle: 'Top posts',
  },
  youtube: {
    title: 'YouTube',
    metricKey: 'subscribers',
    metricLabel: 'Subscribers',
    chartKey: 'views',
    topTitle: 'Top videos',
  },
  tiktok: {
    title: 'TikTok',
    metricKey: 'followers',
    metricLabel: 'Followers',
    chartKey: 'video_views',
    topTitle: 'Top videos',
  },
  linkedin: {
    title: 'LinkedIn',
    metricKey: 'followers',
    metricLabel: 'Followers',
    chartKey: 'impressions',
    topTitle: 'Top posts',
  },
  x: {
    title: 'X',
    metricKey: 'followers',
    metricLabel: 'Followers',
    chartKey: 'impressions',
    topTitle: 'Top tweets',
  },
}

function formatNumber(value) {
  if (value == null) return '-'
  return value.toLocaleString()
}

function TopItems({ items }) {
  if (!items || items.length === 0) return null
  return (
    <div className="mt-6">
      <h3 className="text-base md:text-lg font-semibold mb-3">Top posts</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="border">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm md:text-base truncate">{item.title || item.name || item.id}</p>
                <p className="text-xs md:text-sm text-gray-500">{item.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                {(() => {
                  const key = Object.keys(item).find((k) => ['views', 'impressions', 'likes', 'shares', 'engagement_rate'].includes(k))
                  const value = key ? item[key] : null
                  return <p className="font-semibold text-sm md:text-base">{formatNumber(value)}</p>
                })()}
                <p className="text-xs text-gray-500">Top metric</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-700">
              {item.likes != null && <span>Likes: {formatNumber(item.likes)}</span>}
              {item.comments != null && <span>Comments: {formatNumber(item.comments)}</span>}
              {item.shares != null && <span>Shares: {formatNumber(item.shares)}</span>}
              {item.impressions != null && <span>Impr: {formatNumber(item.impressions)}</span>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function PlatformDetail({ platform }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const response = await getPlatform(platform)
        setData(response.data)
      } catch (err) {
        setError(err.message || 'Unable to load platform data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [platform])

  const config = PLATFORM_CONFIG[platform] || {}

  const chartData = useMemo(() => {
    if (!data?.timeseries) return []
    return [...data.timeseries]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((point) => ({
        date: point.date,
        value: point[config.chartKey] ?? point[config.metricKey] ?? 0,
      }))
  }, [data, config.chartKey, config.metricKey])



  if (loading) return <div className="p-6 flex justify-center"><Loader /></div>
  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!data) return <div className="p-6 text-gray-600">No data available.</div>

  const overview = data.overview || {}
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">{config.title || platform}</h1>
          <p className="text-sm md:text-base text-slate-600">Detailed metrics for {config.title || platform}</p>
        </div>
        <div className="rounded-2xl md:rounded-3xl bg-slate-100 px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-slate-700 flex-shrink-0">{config.topTitle}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className="border-l-4 border-indigo-500/90 bg-slate-50">
          <p className="text-xs md:text-sm uppercase tracking-wide text-indigo-600">{config.metricLabel}</p>
          <p className="text-2xl md:text-3xl font-semibold text-slate-900 mt-2">{formatNumber(overview[config.metricKey])}</p>
        </Card>
        <Card className="border-l-4 border-fuchsia-500/90 bg-slate-50">
          <p className="text-xs md:text-sm uppercase tracking-wide text-fuchsia-600">Reach</p>
          <p className="text-2xl md:text-3xl font-semibold text-slate-900 mt-2">{formatNumber(overview.reach ?? overview.impressions ?? overview.views)}</p>
        </Card>
        <Card className="border-l-4 border-cyan-500/90 bg-slate-50">
          <p className="text-xs md:text-sm uppercase tracking-wide text-cyan-600">Engagement rate</p>
          <p className="text-2xl md:text-3xl font-semibold text-slate-900 mt-2">{overview.engagement ? `${overview.engagement}%` : '-'}</p>
        </Card>
      </div>
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-slate-900">Performance trend</h2>
            <p className="text-xs md:text-sm text-slate-500">Last 7 days</p>
          </div>
        </div>
        <div className="h-56 md:h-72 -mx-3 md:-mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value) => formatNumber(value)} contentStyle={{ borderRadius: '1rem', borderColor: '#e2e8f0' }} />
              <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={3} dot={{ fill: '#7c3aed', r: 5 }} activeDot={{ r: 7 }} isAnimationActive={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <TopItems items={data.top_posts} />
    </div>
  )
}
