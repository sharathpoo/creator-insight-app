import ProtectedRoute from '../../../components/auth/ProtectedRoute'
import PlatformDetail from '../../../components/dashboard/PlatformDetail'

export default function XPage() {
  return (
    <ProtectedRoute>
      <PlatformDetail platform="x" />
    </ProtectedRoute>
  )
}
