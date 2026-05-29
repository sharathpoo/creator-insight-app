import LoginForm from '../../components/auth/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.2),_transparent_25%),_radial-gradient(circle_at_top_right,_rgba(236,72,153,0.18),_transparent_18%),_linear-gradient(180deg,_#f8fbff_0%,_#eef2ff_45%,_#f9fafb_100%)] p-4">
      <div className="w-full max-w-md rounded-2xl md:rounded-[2rem] border border-white/80 bg-white/95 p-6 md:p-10 shadow-2xl shadow-indigo-200/40 backdrop-blur-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Welcome back</h2>
        <p className="mt-3 text-sm md:text-base text-slate-600">Sign in to access your Creator Insights dashboard.</p>
        <div className="mt-8">
          <LoginForm />
        </div>
        <p className="mt-5 text-sm text-slate-600">
          New here? <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
