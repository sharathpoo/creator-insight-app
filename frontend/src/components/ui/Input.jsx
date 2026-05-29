export default function Input(props) {
  return (
    <input
      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-indigo-500 focus:bg-white"
      {...props}
    />
  )
}
