import Card from '../ui/Card'

export default function PlatformCard({ name, stats }) {
  return (
    <Card>
      <h4 className="font-semibold">{name}</h4>
      <div className="text-sm text-gray-600">{stats}</div>
    </Card>
  )
}
