export default function Navbar({ brandName }) {
  return (
    <nav className="bg-brand-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-sm font-bold">
            T
          </div>
          <span className="text-lg font-semibold tracking-tight">{brandName}</span>
        </div>
        <a
          href="#help"
          className="text-sm text-gray-300 hover:text-white transition-colors"
        >
          Help
        </a>
      </div>
    </nav>
  )
}
