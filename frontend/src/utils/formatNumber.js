export default function formatNumber(n) {
  if (n == null) return '-'
  return n.toLocaleString()
}
