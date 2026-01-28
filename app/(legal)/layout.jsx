import Link from "next/link";

export default function LegalLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Premium ambient accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-collin-teal-light/14 blur-3xl" />
        <div className="absolute -bottom-28 left-[-6rem] h-72 w-72 rounded-full bg-collin-teal/10 blur-3xl" />
      </div>

      {/* Subtle premium textures (masked to avoid “bars” on laptops) */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0",
          "bg-[url('/patterns/grid.svg')] bg-repeat mix-blend-multiply",
          "opacity-[0.035] sm:opacity-[0.04]",
          "bg-[length:220px_220px] lg:bg-[length:260px_260px] 2xl:bg-[length:300px_300px]",
          "[mask-image:radial-gradient(circle_at_50%_18%,black_0%,black_62%,transparent_84%)]",
          "[-webkit-mask-image:radial-gradient(circle_at_50%_18%,black_0%,black_62%,transparent_84%)]",
          "transform-gpu scale-110 rotate-[0.35deg]",
        ].join(" ")}
      />
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0",
          "bg-[url('/patterns/noise.png')] bg-repeat mix-blend-overlay",
          "opacity-[0.02] sm:opacity-[0.025] lg:opacity-[0.03]",
          "bg-[length:320px_320px] lg:bg-[length:420px_420px] 2xl:bg-[length:520px_520px]",
          "[mask-image:radial-gradient(circle_at_50%_20%,black_0%,black_64%,transparent_86%)]",
          "[-webkit-mask-image:radial-gradient(circle_at_50%_20%,black_0%,black_64%,transparent_86%)]",
        ].join(" ")}
      />

      {/* Top utility bar */}
      <header className="border-b border-gray-200/90 bg-white/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="container-wrapper py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm text-collin-navy hover:text-collin-teal transition-colors inline-flex items-center gap-2"
            aria-label="Back to Collinalitics home"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm">
              <span aria-hidden="true">←</span>
            </span>
            <span className="font-medium">Back to Collinalitics</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-gray-500 tracking-widest uppercase">
              Legal information
            </span>
            <span className="text-gray-300">•</span>
            <nav className="flex items-center gap-4 text-xs" aria-label="Legal quick navigation">
              <Link href="/privacy-policy" className="text-gray-600 hover:text-collin-teal transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-collin-teal transition-colors">
                Cookies
              </Link>
            </nav>
          </div>

          {/* Mobile compact label */}
          <span className="sm:hidden text-xs text-gray-500 tracking-widest uppercase">
            Legal
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow relative z-10">
        <div className="container-wrapper py-16 sm:py-20">
          <div
            className={[
              "max-w-3xl mx-auto",
              "bg-white/95 backdrop-blur-sm",
              "border border-gray-200 shadow-sm rounded-2xl",
              "px-6 sm:px-10 py-10 sm:py-12",
            ].join(" ")}
          >
            {children}
          </div>

          {/* Micro footer note area (optional feel-good polish) */}
          <p className="mt-8 text-center text-xs text-gray-500">
            Need help?{" "}
            <a
              href="mailto:collinsayidan@collinalitics.co.uk"
              className="text-collin-teal font-semibold hover:underline"
            >
              collinsayidan@collinalitics.co.uk
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/90 bg-white/85 backdrop-blur-sm relative z-10">
        <div className="container-wrapper py-6 flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-600">
          <span className="text-gray-500">
            © {new Date().getFullYear()} Collinalitics Ltd
          </span>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
            <Link href="/privacy-policy" className="hover:text-collin-teal transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-collin-teal transition-colors">
              Cookies
            </Link>
            <a
              href="mailto:collinsayidan@collinalitics.co.uk"
              className="hover:text-collin-teal transition-colors"
            >
              Email
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}