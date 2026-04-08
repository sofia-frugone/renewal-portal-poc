export default function Footer({ brandName }) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy text-gray-400 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p>&copy; {year} {brandName}. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  )
}
