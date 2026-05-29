import SignupForm from '../../components/auth/SignupForm'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.15),_transparent_20%),_radial-gradient(circle_at_bottom_right,_rgba(79,70,229,0.18),_transparent_25%),_linear-gradient(180deg,_#f9f7ff_0%,_#eef2ff_55%,_#f8fafc_100%)] p-4">
      <div className="w-full max-w-md rounded-2xl md:rounded-[2rem] border border-white/80 bg-white/95 p-6 md:p-10 shadow-2xl shadow-fuchsia-200/35 backdrop-blur-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Create your account</h2>
        <p className="mt-3 text-sm md:text-base text-slate-600">Sign up and begin tracking creator performance across platforms.</p>
        <div className="mt-8">
          <SignupForm />
        </div>
        <p className="mt-5 text-sm text-slate-600">
          Already have an account? <Link href="/login" className="font-semibold text-fuchsia-600 hover:text-fuchsia-700">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
