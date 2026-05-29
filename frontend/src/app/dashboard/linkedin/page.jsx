import ProtectedRoute from '../../../components/auth/ProtectedRoute'
import PlatformDetail from '../../../components/dashboard/PlatformDetail'

export default function LinkedInPage() {
  return (
    <ProtectedRoute>
      <PlatformDetail platform="linkedin" />
    </ProtectedRoute>
  )
}
