import Link from "next/link";

export const metadata = {
  title: "Privacy Policy – Collinalitics Ltd",
  description: "How Collinalitics Ltd collects, uses, and protects personal data.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "27 January 2026";

  const toc = [
    { id: "who-we-are", label: "Who we are" },
    { id: "what-we-collect", label: "Information we collect" },
    { id: "how-we-use", label: "How we use your information" },
    { id: "lawful-bases", label: "Lawful bases (UK GDPR)" },
    { id: "cookies", label: "Cookies & analytics" },
    { id: "sharing", label: "Sharing your data" },
    { id: "transfers", label: "International transfers" },
    { id: "retention", label: "How long we keep data" },
    { id: "security", label: "How we keep data secure" },
    { id: "your-rights", label: "Your rights" },
    { id: "complaints", label: "Complaints" },
    { id: "contact", label: "Contact" },
    { id: "changes", label: "Changes to this policy" },
  ];

  return (
    <section className="section section-pad relative overflow-hidden bg-gray-50">
      {/* Ambient accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-collin-teal-light/16 blur-3xl" />
        <div className="absolute -bottom-28 left-[-6rem] h-72 w-72 rounded-full bg-collin-teal/10 blur-3xl" />
      </div>

      {/* Premium texture layers (masked to avoid “bars”) */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0",
          "bg-[url('/patterns/grid.svg')] bg-repeat mix-blend-multiply",
          "opacity-[0.035] sm:opacity-[0.04]",
          "bg-[length:220px_220px] lg:bg-[length:260px_260px] 2xl:bg-[length:300px_300px]",
          "[mask-image:radial-gradient(circle_at_50%_18%,black_0%,black_62%,transparent_84%)]",
          "[-webkit-mask-image:radial-gradient(circle_at_50%_18%,black_0%,black_62%,transparent_84%)]",
          "transform-gpu scale-110 rotate-[0.4deg]",
        ].join(" ")}
      />
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0",
          "bg-[url('/patterns/noise.png')] bg-repeat mix-blend-overlay",
          "opacity-[0.025] sm:opacity-[0.03] lg:opacity-[0.035]",
          "bg-[length:300px_300px] lg:bg-[length:420px_420px] 2xl:bg-[length:480px_480px]",
          "[mask-image:radial-gradient(circle_at_50%_22%,black_0%,black_64%,transparent_86%)]",
          "[-webkit-mask-image:radial-gradient(circle_at_50%_22%,black_0%,black_64%,transparent_86%)]",
        ].join(" ")}
      />

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
          <span className="text-collin-navy font-semibold">Privacy Policy</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
            Legal
          </p>

          <h1 className="mt-3 text-h2 text-collin-navy">Privacy Policy</h1>

          <p className="mt-5 text-bodylg text-collin-slate leading-relaxed">
            This policy explains how Collinalitics Ltd collects, uses, and protects personal
            information when you visit our website, contact us, or book a call.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <MetaChip>UK GDPR</MetaChip>
            <MetaChip>Transparency-first</MetaChip>
            <MetaChip>Minimal data</MetaChip>
            <MetaChip>Secure by design</MetaChip>
          </div>

          <p className="mt-4 text-caption text-collin-slate/80">
            Last updated: <span className="font-semibold text-collin-navy">{lastUpdated}</span>
          </p>
        </header>

        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 h-fit">
            <div className="card p-6 bg-white/95">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
                On this page
              </p>

              <ul className="mt-4 space-y-1.5">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="block rounded-xl px-3 py-2 text-sm text-collin-slate hover:bg-gray-100 hover:text-collin-navy transition"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-gray-200">
                <p className="text-xs text-gray-500 leading-relaxed">
                  If you have questions about privacy, email{" "}
                  <a
                    className="text-collin-teal font-semibold hover:underline"
                    href="mailto:collinsayidan@collinalitics.co.uk"
                  >
                    collinsayidan@collinalitics.co.uk
                  </a>
                  .
                </p>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-8">
            {/* Quick summary */}
            <div className="card p-7 bg-white/95">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
                Quick summary
              </p>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <SummaryItem title="We collect" desc="Contact details, enquiry content, booking details, and basic website usage data." />
                <SummaryItem title="We use it to" desc="Respond to requests, deliver services, improve the site, and keep things secure." />
                <SummaryItem title="We share" desc="Only with trusted providers needed to run the website and deliver services." />
                <SummaryItem title="You control" desc="Your rights include access, correction, deletion, objection, and more." />
              </div>
            </div>

            {/* Body */}
            <article className="mt-8 card card-pad bg-white/95">
              <Section id="who-we-are" title="Who we are">
                <p className="text-body text-gray-700 leading-relaxed">
                  <span className="font-semibold text-collin-navy">Collinalitics Ltd</span> is a UK-based
                  consultancy providing analytics engineering, BI dashboards, systems analysis, and practical AI solutions.
                </p>

                <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <dl className="space-y-3 text-sm text-gray-700">
                    <Row term="Data controller" value="Collinalitics Ltd" />
                    <Row term="Email" value={<a className="text-collin-teal font-semibold hover:underline" href="mailto:collinsayidan@collinalitics.co.uk">collinsayidan@collinalitics.co.uk</a>} />
                    <Row term="Company number" value="SC874504" />
                  </dl>
                </div>
              </Section>

              <Divider />

              <Section id="what-we-collect" title="Information we collect">
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
                  <li>
                    <span className="font-semibold text-collin-navy">Information you provide</span> (for example: name,
                    email, organisation, and the content of your enquiry).
                  </li>
                  <li>
                    <span className="font-semibold text-collin-navy">Booking information</span> if you schedule a call
                    (for example: meeting time and any details you submit in the booking form).
                  </li>
                  <li>
                    <span className="font-semibold text-collin-navy">Technical data</span> such as device/browser type,
                    approximate location (derived from IP), and basic logs for security/diagnostics.
                  </li>
                  <li>
                    <span className="font-semibold text-collin-navy">Analytics data</span> to understand how visitors
                    use the website (subject to cookie choices, where applicable).
                  </li>
                </ul>
              </Section>

              <Divider />

              <Section id="how-we-use" title="How we use your information">
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
                  <li>To respond to enquiries and provide requested information.</li>
                  <li>To book and manage calls/meetings.</li>
                  <li>To deliver consultancy services and manage client relationships.</li>
                  <li>To improve site performance, reliability, and user experience.</li>
                  <li>To maintain security and prevent misuse.</li>
                  <li>To comply with legal/financial obligations where required.</li>
                </ul>
              </Section>

              <Divider />

              <Section id="lawful-bases" title="Lawful bases (UK GDPR)">
                <p className="text-body text-gray-700 leading-relaxed">
                  We process personal data only when we have a lawful basis, such as:
                </p>

                <ul className="mt-4 list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
                  <li>
                    <span className="font-semibold text-collin-navy">Contract</span> — where processing is necessary to
                    deliver agreed services or take steps before entering a contract.
                  </li>
                  <li>
                    <span className="font-semibold text-collin-navy">Legitimate interests</span> — for running and
                    improving our business (for example: handling enquiries and keeping the site secure).
                  </li>
                  <li>
                    <span className="font-semibold text-collin-navy">Consent</span> — for optional cookies/analytics
                    (where required) and any marketing where you explicitly opt in.
                  </li>
                  <li>
                    <span className="font-semibold text-collin-navy">Legal obligation</span> — where we must comply with
                    applicable laws (for example: accounting or regulatory requirements).
                  </li>
                </ul>
              </Section>

              <Divider />

              <Section id="cookies" title="Cookies & analytics">
                <p className="text-body text-gray-700 leading-relaxed">
                  We may use cookies and similar technologies to make the website work properly, keep it secure, and (if
                  you allow) understand how visitors interact with pages so we can improve clarity and usability.
                </p>

                <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    For full details (including categories and how to manage preferences), see our{" "}
                    <Link href="/cookies" className="text-collin-teal font-semibold hover:underline">
                      Cookies Policy
                    </Link>
                    .
                  </p>
                </div>
              </Section>

              <Divider />

              <Section id="sharing" title="Sharing your data">
                <p className="text-body text-gray-700 leading-relaxed">
                  We do not sell personal data. We may share limited information with trusted service providers only when
                  needed to operate the website or deliver services (for example: website hosting, analytics, scheduling,
                  email, and security tools).
                </p>
              </Section>

              <Divider />

              <Section id="transfers" title="International transfers">
                <p className="text-body text-gray-700 leading-relaxed">
                  Some providers may process data outside the UK. Where this happens, we take steps to ensure appropriate
                  safeguards are in place (for example, contractual protections).
                </p>
              </Section>

              <Divider />

              <Section id="retention" title="How long we keep data">
                <p className="text-body text-gray-700 leading-relaxed">
                  We keep personal data only for as long as necessary for the purposes described in this policy.
                </p>

                <ul className="mt-4 list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
                  <li>Enquiry emails: typically up to 24 months (unless ongoing work requires longer).</li>
                  <li>Client records: retained as needed for delivery and legal/accounting obligations (often up to 6–7 years).</li>
                  <li>Basic security logs: typically up to 12 months, unless needed to investigate an incident.</li>
                </ul>

                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  Exact retention may vary depending on the type of engagement and legal requirements.
                </p>
              </Section>

              <Divider />

              <Section id="security" title="How we keep data secure">
                <p className="text-body text-gray-700 leading-relaxed">
                  We use appropriate technical and organisational measures designed to protect personal data against
                  unauthorised access, loss, or misuse (for example: access controls and secure tools). No method of
                  transmission or storage is completely risk-free, but we work to keep protections proportionate and current.
                </p>
              </Section>

              <Divider />

              <Section id="your-rights" title="Your rights">
                <p className="text-body text-gray-700 leading-relaxed">
                  Under UK GDPR, you may have rights including access, correction, deletion, restriction, objection, and
                  data portability (depending on the lawful basis). You can also withdraw consent where processing is based
                  on consent.
                </p>

                <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    To request any of these rights, email{" "}
                    <a className="text-collin-teal font-semibold hover:underline" href="mailto:collinsayidan@collinalitics.co.uk">
                      collinsayidan@collinalitics.co.uk
                    </a>
                    .
                  </p>
                </div>
              </Section>

              <Divider />

              <Section id="complaints" title="Complaints">
                <p className="text-body text-gray-700 leading-relaxed">
                  If you’re unhappy with how we handle your data, please contact us first and we’ll do our best to resolve
                  it. You also have the right to raise a concern with the UK Information Commissioner’s Office (ICO).
                </p>

                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  ICO website:{" "}
                  <a
                    className="text-collin-teal font-semibold hover:underline"
                    href="https://ico.org.uk/make-a-complaint/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ico.org.uk/make-a-complaint
                  </a>
                </p>
              </Section>

              <Divider />

              <Section id="contact" title="Contact">
                <p className="text-body text-gray-700 leading-relaxed">
                  For privacy-related enquiries, contact:{" "}
                  <a
                    href="mailto:collinsayidan@collinalitics.co.uk"
                    className="text-collin-teal font-semibold hover:underline"
                  >
                    collinsayidan@collinalitics.co.uk
                  </a>
                  .
                </p>
              </Section>

              <Divider />

              <Section id="changes" title="Changes to this policy">
                <p className="text-body text-gray-700 leading-relaxed">
                  We may update this policy from time to time to reflect changes in our services, tools, or legal
                  requirements. The “Last updated” date at the top indicates the most recent revision.
                </p>

                <div className="mt-6 rounded-2xl border border-collin-teal/20 bg-collin-teal/5 p-5">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold text-collin-navy">Note:</span> This page is a strong professional
                    template, but it should be reviewed against your exact setup (analytics provider, hosting region,
                    booking tools, marketing tools) before publishing.
                  </p>
                </div>
              </Section>
            </article>

            {/* CTA */}
            <div className="mt-10 card card-pad bg-white/95 text-center">
              <h2 className="text-h4 text-collin-navy">Questions about data privacy?</h2>
              <p className="mt-3 text-body text-collin-slate leading-relaxed max-w-2xl mx-auto">
                If you want a simple explanation of what we collect and why, we’ll reply clearly and quickly.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="mailto:collinsayidan@collinalitics.co.uk" className="cta-primary cta-full">
                  Email us
                </a>
                <Link href="/cookies" className="cta-secondary cta-full">
                  View Cookies Policy
                </Link>
              </div>
            </div>
          </main>
        </div>

        <div className="h-10" />
      </div>
    </section>
  );
}

/* ---------- Small UI helpers ---------- */

function MetaChip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-collin-navy">
      {children}
    </span>
  );
}

function SummaryItem({ title, desc }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <p className="text-sm font-semibold text-collin-navy">{title}</p>
      <p className="mt-1 text-sm text-gray-700 leading-relaxed">{desc}</p>
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-semibold text-collin-navy">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Divider() {
  return <div className="my-10 h-px w-full bg-gray-200" aria-hidden="true" />;
}

function Row({ term, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-gray-500">{term}</dt>
      <dd className="text-collin-navy font-medium text-right">{value}</dd>
    </div>
  );
}