import ProtectedRoute from '../../../components/auth/ProtectedRoute'
import PlatformDetail from '../../../components/dashboard/PlatformDetail'

export default function YoutubePage() {
  return (
    <ProtectedRoute>
      <PlatformDetail platform="youtube" />
    </ProtectedRoute>
  )
}
