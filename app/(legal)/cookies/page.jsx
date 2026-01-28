import Link from "next/link";

export const metadata = {
  title: "Cookies | Collinalitics",
  description:
    "How Collinalitics uses cookies and similar technologies, and how to manage your preferences.",
};

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-h4 text-collin-navy">{title}</h2>
      <div className="mt-3 text-body text-gray-700 leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-collin-navy">
      {children}
    </span>
  );
}

export default function CookiesPage() {
  const lastUpdated = "27 January 2026";

  // ⚠️ Replace these with your real cookies after you audit your site.
  // Keep “Strictly necessary” separate from everything else.
  const cookieRows = [
    {
      name: "session",
      purpose: "Maintain basic session state (site functionality).",
      type: "Strictly necessary",
      duration: "Session",
      provider: "Collinalitics",
    },
    {
      name: "cookie_consent",
      purpose: "Store your cookie preferences.",
      type: "Strictly necessary",
      duration: "6 months",
      provider: "Collinalitics",
    },
    {
      name: "analytics_*",
      purpose: "Understand how visitors use the site to improve content and UX.",
      type: "Analytics (optional)",
      duration: "Up to 24 months",
      provider: "Add your analytics tool",
    },
  ];

  return (
    <main className="section section-pad relative overflow-hidden bg-gray-50">
      {/* Ambient accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-collin-teal-light/18 blur-3xl" />
        <div className="absolute -bottom-28 left-[-6rem] h-72 w-72 rounded-full bg-collin-teal/10 blur-3xl" />
      </div>

      <div className="container-wrapper relative">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-collin-slate mb-10 flex flex-wrap items-center gap-2"
        >
          <Link href="/" className="hover:text-collin-navy transition font-medium">
            Home
          </Link>
          <span className="text-collin-slate/60">/</span>
          <span className="text-collin-navy font-semibold">Cookies</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
            Legal
          </p>
          <h1 className="mt-3 text-h2 text-collin-navy">Cookies</h1>
          <p className="mt-4 text-bodylg text-collin-slate leading-relaxed">
            This page explains how we use cookies and similar technologies, what they do,
            and how you can manage your preferences.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <Chip>UK-focused</Chip>
            <Chip>Clear categories</Chip>
            <Chip>Preference control</Chip>
          </div>

          <p className="mt-5 text-caption text-collin-slate/80">
            Last updated: {lastUpdated}
          </p>
        </header>

        {/* Content */}
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Main column */}
          <div className="lg:col-span-8">
            <div className="card card-pad bg-white/95 space-y-10">
              <Section id="what-are-cookies" title="What are cookies?">
                <p>
                  Cookies are small text files placed on your device. Similar technologies (such as local
                  storage) may also store or access information on your device.
                </p>
              </Section>

              <Section id="how-we-use-cookies" title="How we use cookies">
                <p>
                  We use cookies to (1) make the website work properly, (2) remember preferences, and
                  (3) understand how the site is used so we can improve performance and user experience.
                </p>
                <p>
                  Where cookies are not strictly necessary, we aim to use them only with your consent and
                  give you clear choices.
                </p>
              </Section>

              <Section id="cookie-categories" title="Cookie categories">
                <ul className="space-y-3">
                  <li>
                    <strong>Strictly necessary</strong> — required for core site functionality and security.
                  </li>
                  <li>
                    <strong>Preferences</strong> — remember choices you make (optional).
                  </li>
                  <li>
                    <strong>Analytics</strong> — help us understand usage and improve the site (optional).
                  </li>
                  <li>
                    <strong>Marketing</strong> — used for advertising/retargeting (optional; only if you actually use it).
                  </li>
                </ul>
              </Section>

              <Section id="cookie-list" title="Cookies we use (example table)">
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-gray-50">
                      <tr className="text-gray-600">
                        <th className="px-4 py-3 font-semibold">Name</th>
                        <th className="px-4 py-3 font-semibold">Purpose</th>
                        <th className="px-4 py-3 font-semibold">Category</th>
                        <th className="px-4 py-3 font-semibold">Duration</th>
                        <th className="px-4 py-3 font-semibold">Provider</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {cookieRows.map((c) => (
                        <tr key={c.name} className="text-gray-700">
                          <td className="px-4 py-3 font-medium text-collin-navy">{c.name}</td>
                          <td className="px-4 py-3">{c.purpose}</td>
                          <td className="px-4 py-3">{c.type}</td>
                          <td className="px-4 py-3">{c.duration}</td>
                          <td className="px-4 py-3">{c.provider}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-gray-500">
                  Note: update this table after you confirm your actual cookies (eg analytics, embeds, video players).
                </p>
              </Section>

              <Section id="cookie-preferences" title="Manage your cookie preferences">
                <p>
                  You can manage cookies in two ways:
                </p>
                <ul className="space-y-2">
                  <li>
                    <strong>On this site:</strong> use our cookie controls (if enabled) to accept or reject non-essential cookies.
                  </li>
                  <li>
                    <strong>In your browser:</strong> you can block or delete cookies via your browser settings.
                  </li>
                </ul>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-700">
                    If you later change your mind, you can revisit this page and update your preferences.
                  </p>
                </div>
              </Section>

              <Section id="more-info" title="More information">
                <p>
                  For how we handle personal data more broadly, see our{" "}
                  <Link href="/privacy-policy" className="text-collin-teal font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <p className="text-xs text-gray-500">
                  This template is provided for general information and should be reviewed for your specific setup.
                </p>
              </Section>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="card p-7 bg-white/95">
                <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
                  Quick links
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {[
                    ["#what-are-cookies", "What are cookies?"],
                    ["#how-we-use-cookies", "How we use cookies"],
                    ["#cookie-categories", "Cookie categories"],
                    ["#cookie-list", "Cookie list"],
                    ["#cookie-preferences", "Preferences"],
                    ["#more-info", "More information"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="text-collin-slate hover:text-collin-teal transition font-medium"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-7 bg-white/95">
                <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
                  Contact
                </p>
                <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                  Questions about cookies or privacy?
                </p>
                <a
                  href="mailto:info@collinalitics.co.uk"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-collin-navy hover:border-collin-teal/40 hover:text-collin-teal transition"
                >
                  Email us
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}