import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_18%),_radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.14),_transparent_18%),_linear-gradient(180deg,_#f9fbff_0%,_#eef2ff_50%,_#f8fafc_100%)] flex items-center justify-center p-4">
      <div className="max-w-3xl rounded-2xl md:rounded-[2rem] border border-white/80 bg-white/95 p-6 md:p-12 shadow-2xl shadow-indigo-200/20 backdrop-blur-xl">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">Creator Insights</h1>
        <p className="mt-5 text-slate-600 text-base md:text-lg leading-7 md:leading-8">
          A creator analytics dashboard to monitor performance across Instagram, YouTube, TikTok, LinkedIn, and X.
        </p>
        <div className="mt-8 md:mt-10 flex flex-col gap-3 md:gap-4 sm:flex-row">
          <Link href="/login" className="inline-flex justify-center rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-6 md:px-7 py-2 md:py-3 text-xs md:text-sm font-semibold text-white shadow-lg shadow-indigo-200/40 hover:opacity-95">
            Sign in
          </Link>
          <Link href="/signup" className="inline-flex justify-center rounded-full border border-slate-300 bg-white px-6 md:px-7 py-2 md:py-3 text-xs md:text-sm font-semibold text-slate-900 hover:bg-slate-50">
            Create account
          </Link>
        </div>
      </div>
    </main>
  )
}
