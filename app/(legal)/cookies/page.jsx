
export const metadata = {
  title: "Cookies Policy – Collinalitics Ltd",
  description: "How Collinalitics Ltd uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <section className="section bg-white">
      <div className="container-wrapper max-w-3xl">
        <article className="space-y-10">
          {/* Header */}
          <header className="space-y-4">
            <h1 className="text-h2 text-collin-navy font-semibold">
              Cookies Policy
            </h1>

            <p className="text-caption text-gray-500">
              Last updated: 13 January 2026
            </p>

            <p className="text-body text-gray-700 leading-relaxed">
              This Cookies Policy explains how Collinalitics Ltd uses cookies and
              similar technologies on our website. By continuing to browse our
              site, you agree to the use of cookies as described below.
            </p>
          </header>

          {/* What Are Cookies */}
          <section className="space-y-3">
            <h2 className="text-h4 text-collin-navy font-semibold">
              What Are Cookies?
            </h2>

            <p className="text-body text-gray-700 leading-relaxed">
              Cookies are small text files placed on your device when you visit a
              website. They help websites function correctly, improve your
              browsing experience, and provide insight into how visitors use a
              site.
            </p>
          </section>

          {/* Types of Cookies */}
          <section className="space-y-3">
            <h2 className="text-h4 text-collin-navy font-semibold">
              Types of Cookies We Use
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-body text-gray-700">
              <li>
                <strong>Essential cookies:</strong> These are necessary for the
                website to function properly and cannot be disabled.
              </li>
              <li>
                <strong>Analytics cookies:</strong> These help us understand how
                visitors interact with our website so we can improve
                performance and usability. This may include tools such as
                Google Analytics.
              </li>
              <li>
                <strong>Third‑party cookies:</strong> Some pages may include
                third‑party services or embedded tools (such as scheduling or
                analytics providers) that set their own cookies.
              </li>
            </ul>
          </section>

          {/* Managing Cookies */}
          <section className="space-y-3">
            <h2 className="text-h4 text-collin-navy font-semibold">
              Managing Cookies
            </h2>

            <p className="text-body text-gray-700 leading-relaxed">
              You can control or disable cookies through your browser settings.
              Please note that disabling certain cookies may affect the
              functionality and performance of this website.
            </p>
          </section>

          {/* Contact */}
          <section className="space-y-3">
            <h2 className="text-h4 text-collin-navy font-semibold">
              Contact Us
            </h2>

            <p className="text-body text-gray-700 leading-relaxed">
              If you have any questions about our Cookies Policy, please contact
              us at:
            </p>

            <p className="text-body">
              <a href="mailto:collinsayidan@collinalitics.co.uk">
                collinsayidan@collinalitics.co.uk
              </a>
            </p>
          </section>
        </article>
      </div>
    </section>
  );
}
