export default function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={"inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200/50 transition hover:-translate-y-0.5 hover:shadow-indigo-300/40 " + className}
    >
      {children}
    </button>
  )
}
