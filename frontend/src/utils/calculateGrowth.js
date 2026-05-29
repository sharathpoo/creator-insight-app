export default function calculateGrowth(previous, current) {
  if (!previous) return null
  return ((current - previous) / previous) * 100
}
