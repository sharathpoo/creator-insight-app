import ProtectedRoute from '../../../components/auth/ProtectedRoute'
import PlatformDetail from '../../../components/dashboard/PlatformDetail'

export default function InstagramPage() {
  return (
    <ProtectedRoute>
      <PlatformDetail platform="instagram" />
    </ProtectedRoute>
  )
}
