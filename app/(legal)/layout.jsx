import Link from "next/link";

export default function LegalLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Top utility bar */}
      <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="container-wrapper py-4 flex items-center justify-between">

          <Link
            href="/"
            className="text-sm text-collin-navy hover:text-collin-teal transition-colors inline-flex items-center gap-1"
          >
            <span className="text-lg">←</span>
            <span>Back to Collinalitics</span>
          </Link>

          <span className="text-xs text-gray-500 tracking-wide uppercase">
            Legal Information
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <div className="container-wrapper max-w-3xl py-24 bg-white shadow-sm rounded-xl mt-10 mb-20 px-6 sm:px-10">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container-wrapper py-6 flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-600">

          <span className="text-gray-500">
            © {new Date().getFullYear()} Collinalitics Ltd
          </span>

          <nav className="flex gap-6" aria-label="Legal">
            <Link
              href="/privacy-policy"
              className="hover:text-collin-teal transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/cookies"
              className="hover:text-collin-teal transition-colors"
            >
              Cookies
            </Link>
          </nav>

        </div>
      </footer>

    </div>
  );
}
