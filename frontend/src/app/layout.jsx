import './globals.css'
import { AuthProvider } from '../context/AuthContext'

export const metadata = {
  title: 'Creator Insights',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-transparent text-slate-900">{children}</div>
        </AuthProvider>
      </body>
    </html>
  )
}
