import Sidebar from '../../components/dashboard/Sidebar'
import Navbar from '../../components/dashboard/Navbar'
import OverviewCards from '../../components/dashboard/OverviewCards'
import ProtectedRoute from '../../components/auth/ProtectedRoute'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-100/70">
        <Navbar />
        <div className="flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6">
            <div className="mb-6 rounded-2xl md:rounded-3xl bg-white/95 p-4 md:p-6 shadow-lg shadow-slate-200/40 ring-1 ring-slate-200">
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Dashboard overview</h1>
              <p className="mt-2 text-sm md:text-base text-slate-600">Quick view across all platforms with reach, followers, and engagement.</p>
            </div>
            <OverviewCards />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
