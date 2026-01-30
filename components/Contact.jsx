"use client";

import React, { useMemo, useCallback, useState } from "react";

const CALENDLY_URL = "https://calendly.com/collinsayidan-collinalitics/30min";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
    form: "",
  });

  const openCalendly = useCallback(() => {
    if (typeof window === "undefined") return;

    const openWidget = () => window.Calendly?.initPopupWidget({ url: CALENDLY_URL });

    // Load Calendly CSS once
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // If Calendly already available, open immediately
    if (window.Calendly) return openWidget();

    // Load Calendly script once
    if (!document.getElementById("calendly-widget-script")) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = openWidget;
      script.onerror = () => window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
      document.body.appendChild(script);
    } else {
      // Script exists but Calendly not ready yet
      setTimeout(openWidget, 250);
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setStatus({ type: "", message: "" });
  }, []);

  const validate = useCallback((data) => {
    const next = { name: "", email: "", message: "", form: "" };

    if (data.company) {
      next.form = "Spam detected.";
      return next;
    }

    if (!data.name.trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = "Please enter a valid email address.";
    if (data.message.trim().length < 10) next.message = "Please provide a short message (at least 10 characters).";

    return next;
  }, []);

  const hasErrors = useMemo(
    () => Boolean(errors.name || errors.email || errors.message || errors.form),
    [errors]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus({ type: "", message: "" });

      const nextErrors = validate(form);
      setErrors(nextErrors);

      const any = nextErrors.name || nextErrors.email || nextErrors.message || nextErrors.form;
      if (any) return;

      setSubmitting(true);
      try {
        // TODO: wire to /api/contact
        await new Promise((r) => setTimeout(r, 700));

        setStatus({
          type: "success",
          message: "Thanks! Your message has been sent. We’ll be in touch shortly.",
        });
        setForm({ name: "", email: "", message: "", company: "" });
        setErrors({ name: "", email: "", message: "", form: "" });
      } catch {
        setStatus({
          type: "error",
          message:
            "Sorry, something went wrong sending your message. Please email us directly at collinsayidan@collinalitics.co.uk.",
        });
      } finally {
        setSubmitting(false);
      }
    },
    [form, validate]
  );

  // ✅ Navy/Blue glass inputs with visible typing
  const inputClass = (hasError) =>
    [
      "w-full rounded-2xl border px-4 py-3 text-sm",
      "bg-white/10 backdrop-blur-md",
      "text-white caret-white",
      "placeholder:text-white/45",
      "transition focus:outline-none focus:ring-2",
      hasError
        ? "border-red-300/60 focus:ring-red-300/30 focus:border-red-300/70"
        : "border-white/15 focus:ring-collin-teal/25 focus:border-collin-teal/50",
    ].join(" ");

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 sm:py-32 text-white"
      aria-labelledby="contact-heading"
    >
      {/* ✅ Same “footer-style” navy/blue background */}
      <div aria-hidden="true" className="absolute inset-0 hero-bg" />

      {/* Subtle grid + noise (optional, matches footer vibe) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]
        [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)]
        [background-size:72px_72px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/patterns/noise.png')] bg-repeat mix-blend-overlay opacity-[0.035]"
      />

      {/* Glow accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-collin-teal/18 blur-[120px]" />
        <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-collin-teal-light/14 blur-[120px]" />
        <div className="absolute top-20 right-10 h-56 w-56 rounded-full bg-blue-400/10 blur-[110px]" />
      </div>

      <div className="container-wrapper relative z-10">
        {/* Header */}
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
            <p className="text-xs font-semibold tracking-widest text-white/80 uppercase">Contact</p>
          </div>

          <h2 id="contact-heading" className="mt-6 text-h2 text-white">
            Ready to improve how you use data?
          </h2>

          <p className="mt-4 text-bodylg text-white/80 leading-relaxed">
            Book a call or send a message — we’ll respond promptly with practical next steps.
          </p>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left: Contact actions + expectations */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <ActionCard
                title="Email us"
                desc="Best for detailed requests, docs, and context."
                href="mailto:info@collinalitics.co.uk"
                icon={<MailIcon className="h-5 w-5" />}
                cta="info@collinalitics.co.uk"
              />
              <ActionCard
                title="Book a free discovery call"
                desc="A quick chat to confirm fit and next steps."
                onClick={openCalendly}
                icon={<CalendarIcon className="h-5 w-5" />}
                cta="Open Calendly"
              />
              <ActionCard
                title="Visit our website"
                desc="Services, examples, and what we offer."
                href="https://collinalitics.co.uk"
                newTab
                icon={<GlobeIcon className="h-5 w-5" />}
                cta="collinalitics.co.uk"
              />
            </div>

            <div className="rounded-3xl border border-white/12 bg-white/6 p-6 backdrop-blur">
              <p className="text-xs font-semibold tracking-widest text-white/70 uppercase">
                What happens next
              </p>

              <div className="mt-4 space-y-3">
                <MiniLine text="We respond within 1 business day (usually sooner)." />
                <MiniLine text="We’ll clarify your goals, constraints, and current reporting." />
                <MiniLine text="You’ll get practical next steps (no jargon, no pressure)." />
              </div>

              <dl className="mt-6 grid gap-4 rounded-2xl border border-white/12 bg-white/6 p-5">
                <div>
                  <dt className="text-xs font-semibold tracking-widest text-white/65 uppercase">Location</dt>
                  <dd className="mt-1 text-sm font-semibold text-white">Edinburgh, United Kingdom</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-widest text-white/65 uppercase">Typical work</dt>
                  <dd className="mt-1 text-sm text-white/80">
                    Dashboards • KPI design • Automation • Analytics engineering
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/12 bg-white/6 p-7 sm:p-9 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-white/70 uppercase">
                    Send a message
                  </p>
                  <p className="mt-2 text-sm text-white/75">
                    Tell us what you’re trying to improve — we’ll tailor the response.
                  </p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <MailIcon className="h-6 w-6" />
                </span>
              </div>

              {/* Status */}
              {(status.message || errors.form) && (
                <div
                  role="status"
                  aria-live="polite"
                  className={[
                    "mt-6 rounded-2xl border px-4 py-3 text-sm backdrop-blur",
                    errors.form || status.type === "error"
                      ? "border-red-300/40 bg-red-500/10 text-red-100"
                      : "border-emerald-300/35 bg-emerald-500/10 text-emerald-50",
                  ].join(" ")}
                >
                  {errors.form || status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 grid gap-5" noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={inputClass(Boolean(errors.name))}
                      placeholder="Collins Ayidan"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-2 text-xs text-red-100/90">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : "email-help"}
                      className={inputClass(Boolean(errors.email))}
                      placeholder="you@company.com"
                    />
                    {errors.email ? (
                      <p id="email-error" className="mt-2 text-xs text-red-100/90">
                        {errors.email}
                      </p>
                    ) : (
                      <p id="email-help" className="mt-2 text-xs text-white/55">
                        We’ll only use this to reply.
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : "message-help"}
                    className={[inputClass(Boolean(errors.message)), "min-h-[160px] resize-y"].join(" ")}
                    placeholder="Tell us what you’re trying to improve (reporting, KPIs, automation, dashboards…)."
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-2 text-xs text-red-100/90">
                      {errors.message}
                    </p>
                  ) : (
                    <p id="message-help" className="mt-2 text-xs text-white/55">
                      Include goals + timelines if you can we’ll tailor the response.
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={[
                      "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold",
                      "bg-collin-teal text-white shadow-lg shadow-collin-teal/25 transition hover:opacity-95",
                      "disabled:opacity-60 disabled:cursor-not-allowed",
                    ].join(" ")}
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <Spinner />
                        Sending…
                      </span>
                    ) : (
                      "Send message"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={openCalendly}
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                    aria-label="Book a free discovery call on Calendly"
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Book a call instead
                  </button>
                </div>

                <p className="text-xs text-white/55 leading-relaxed">
                  By sending this message, you agree we can contact you about your enquiry. No spam.
                </p>

                {hasErrors && (
                  <p className="text-xs text-white/55">
                    Please fix the highlighted fields and try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small components ---------- */

function ActionCard({ title, desc, href, onClick, icon, cta, newTab }) {
  const Comp = href ? "a" : "button";
  const props = href
    ? { href, target: newTab ? "_blank" : undefined, rel: newTab ? "noreferrer" : undefined }
    : { type: "button", onClick };

  return (
    <Comp
      {...props}
      className={[
        "group w-full text-left rounded-3xl border border-white/12 bg-white/6 p-6 backdrop-blur",
        "transition hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] hover:-translate-y-0.5",
        "focus:outline-none focus:ring-2 focus:ring-collin-teal/25",
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm text-white/70 leading-relaxed">{desc}</p>
          <p className="mt-4 inline-flex items-center text-sm font-semibold text-collin-teal">
            {cta}
            <span className="ml-2 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              →
            </span>
          </p>
        </div>
      </div>
    </Comp>
  );
}

function MiniLine({ text }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-white/10 text-collin-teal">
        <IconCheck />
      </span>
      <p className="text-sm text-white/80 leading-relaxed">{text}</p>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------- Icons ---------- */

function IconCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
    </svg>
  );
}

function GlobeIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M2 12h20" />
      <path d="M12 2c3 4 3 16 0 20" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}