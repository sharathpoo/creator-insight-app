export default function Card({ children, className = '' }) {
  return (
    <div className={"rounded-3xl bg-white/95 p-5 shadow-lg shadow-slate-200/70 ring-1 ring-slate-200 " + className}>
      {children}
    </div>
  )
}
