const analyticsService = require('../services/analyticsService')

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'x', name: 'X' },
]

function normalizeOverview(id, overview) {
  if (!overview) return {}
  // Map platform-specific fields to a common shape
  switch (id) {
    case 'instagram':
      return {
        id,
        name: 'Instagram',
        followers: overview.followers || 0,
        reach: overview.reach || overview.impressions || 0,
        engagement_rate: overview.engagement || null,
        total_posts: overview.posts || 0,
      }
    case 'youtube':
      return {
        id,
        name: 'YouTube',
        followers: overview.subscribers || 0,
        reach: overview.views || 0,
        engagement_rate: overview.engagement || null,
        total_posts: overview.videos || 0,
      }
    case 'tiktok':
      return {
        id,
        name: 'TikTok',
        followers: overview.followers || 0,
        reach: overview.video_views || overview.views || 0,
        engagement_rate: overview.engagement || null,
        total_posts: overview.videos || 0,
      }
    case 'linkedin':
      return {
        id,
        name: 'LinkedIn',
        followers: overview.followers || 0,
        reach: overview.impressions || 0,
        engagement_rate: overview.engagement || null,
        total_posts: overview.posts || 0,
      }
    case 'x':
      return {
        id,
        name: 'X',
        followers: overview.followers || 0,
        reach: overview.impressions || 0,
        engagement_rate: overview.engagement || null,
        total_posts: overview.tweets || 0,
      }
    default:
      return { id, name: id, followers: 0 }
  }
}

async function getOverview(req, res, next) {
  try {
    const results = []
    for (const p of PLATFORMS) {
      try {
        const data = await analyticsService.readPlatformData(p.id)
        results.push(normalizeOverview(p.id, data.overview))
      } catch (e) {
        results.push({ id: p.id, name: p.name, error: 'missing data' })
      }
    }
    res.json({ platforms: results })
  } catch (err) {
    next(err)
  }
}

async function getPlatform(req, res, next) {
  try {
    const { platform } = req.params
    const allowed = PLATFORMS.map((p) => p.id)
    if (!allowed.includes(platform)) return res.status(404).json({ message: 'Platform not found' })
    const data = await analyticsService.readPlatformData(platform)
    // Return the raw data for the platform (profile, timeseries, top_posts expected)
    res.json({ platform: platform, data })
  } catch (err) {
    next(err)
  }
}

module.exports = { getOverview, getPlatform }
