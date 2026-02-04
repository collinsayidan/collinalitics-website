"use client";

import React, { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/collinsayidan-collinalitics/30min";

export default function Contact() {
  const reduce = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
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

    const openWidget = () => {
      if (window.Calendly?.initPopupWidget) {
        window.Calendly.initPopupWidget({ url: CALENDLY_URL });
        return true;
      }
      return false;
    };

    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    if (openWidget()) return;

    if (!document.getElementById("calendly-widget-script")) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        const ok = openWidget();
        if (!ok) window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
      };
      script.onerror = () => {
        window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
      };
      document.body.appendChild(script);
    } else {
      setTimeout(() => {
        const ok = openWidget();
        if (!ok) window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
      }, 250);
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
    if (!/^\S+@\S+\.\S+$/.test(data.email))
      next.email = "Please enter a valid email address.";
    if (data.message.trim().length < 10)
      next.message = "Please provide a short message (at least 10 characters).";

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

      const any =
        nextErrors.name ||
        nextErrors.email ||
        nextErrors.message ||
        nextErrors.form;
      if (any) return;

      setSubmitting(true);
      try {
        // TODO: wire to /api/contact
        await new Promise((r) => setTimeout(r, 700));

        setStatus({
          type: "success",
          message: "Thanks! Your message has been sent. We’ll be in touch shortly.",
        });

        setForm({ name: "", email: "", org: "", message: "", company: "" });
        setErrors({ name: "", email: "", message: "", form: "" });
      } catch {
        setStatus({
          type: "error",
          message:
            "Sorry, something went wrong sending your message. Please email us directly at info@collinalitics.co.uk.",
        });
      } finally {
        setSubmitting(false);
      }
    },
    [form, validate]
  );

  // ✅ Solid-dark inputs (no glass)
  const inputClass = (hasError) =>
    [
      "w-full rounded-2xl border px-4 py-3 text-sm",
      "bg-slate-950/60 text-white caret-white",
      "placeholder:text-white/35",
      "transition focus:outline-none focus:ring-2",
      hasError
        ? "border-red-400/60 focus:ring-red-400/25 focus:border-red-400/70"
        : "border-slate-800 focus:ring-collin-teal/25 focus:border-collin-teal/50",
    ].join(" ");

  const baseTransition = { duration: 0.6, ease: [0.2, 0.65, 0.25, 1] };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 lg:py-32 text-white bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      aria-labelledby="contact-heading"
    >
      {/* Background glows + grid (keep), but cards are solid */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-collin-teal/12 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-collin-lightTeal/10 blur-3xl" />
        <div className="absolute top-24 right-10 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.16]
          [background-image:linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)]
          [background-size:72px_72px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: reduce ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={baseTransition}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/40 px-4 py-2 mb-7">
              <span className="h-2 w-2 rounded-full bg-collin-teal" aria-hidden="true" />
              <p className="text-xs font-semibold tracking-widest text-white/80 uppercase">
                Get in touch
              </p>
            </div>

            <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to transform your data?
            </h2>

            <p className="mt-4 text-lg text-white/75 leading-relaxed max-w-xl">
              Book a free strategy call to discuss your challenges and explore how we can help you
              build a data foundation that drives clear decisions.
            </p>

            <div className="mt-10 space-y-4">
              <button
                type="button"
                onClick={openCalendly}
                className={[
                  "group w-full text-left rounded-2xl border border-slate-800 bg-slate-900/70 p-5",
                  "transition hover:bg-slate-900/85 hover:-translate-y-0.5",
                  "focus:outline-none focus:ring-2 focus:ring-collin-teal/25",
                ].join(" ")}
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/40 border border-slate-800 text-white">
                    <IconCalendar className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">Book a Free Strategy Call</p>
                    <p className="text-sm text-white/65">
                      30-minute consultation • no obligation
                    </p>
                  </div>
                  <span className="text-collin-teal transition-transform group-hover:translate-x-1">
                    <IconArrowRight className="h-5 w-5" />
                  </span>
                </div>
              </button>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/40 border border-slate-800 text-white">
                  <IconMail className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-white">Email us</p>
                  <a
                    href="mailto:info@collinalitics.co.uk"
                    className="text-sm font-semibold text-collin-teal hover:opacity-90 transition"
                  >
                    info@collinalitics.co.uk
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <p className="text-white/80 italic leading-relaxed">
                “Collinalitics transformed our reporting process. What used to take days now happens
                automatically — and leadership finally trusts the numbers.”
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-collin-teal to-collin-lightTeal" />
                <div>
                  <p className="font-semibold text-white">Sarah Mitchell</p>
                  <p className="text-sm text-white/60">Operations Director, UK Charity</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: reduce ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={baseTransition}
          >
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 sm:p-9 shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">Send us a message</h3>
                  <p className="mt-2 text-sm text-white/70">
                    Tell us what you’re trying to improve — we’ll reply with practical next steps.
                  </p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/40 border border-slate-800 text-white">
                  <IconSend className="h-6 w-6" />
                </span>
              </div>

              {(status.message || errors.form) && (
                <div
                  role="status"
                  aria-live="polite"
                  className={[
                    "mt-6 rounded-2xl border px-4 py-3 text-sm",
                    errors.form || status.type === "error"
                      ? "border-red-400/40 bg-red-500/10 text-red-100"
                      : "border-emerald-400/35 bg-emerald-500/10 text-emerald-50",
                  ].join(" ")}
                >
                  {errors.form || status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-6" noValidate>
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

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass(Boolean(errors.name))}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-2 text-xs text-red-200/90">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={inputClass(Boolean(errors.email))}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      autoComplete="email"
                      inputMode="email"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-2 text-xs text-red-200/90">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="org">Company / Organisation</Label>
                  <Input
                    id="org"
                    name="org"
                    value={form.org}
                    onChange={handleChange}
                    placeholder="Your organisation"
                    className={inputClass(false)}
                    autoComplete="organization"
                  />
                </div>

                <div>
                  <Label htmlFor="message">How can we help?</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your data challenges…"
                    className={[inputClass(Boolean(errors.message)), "min-h-[150px] resize-none"].join(" ")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : "message-help"}
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-2 text-xs text-red-200/90">
                      {errors.message}
                    </p>
                  ) : (
                    <p id="message-help" className="mt-2 text-xs text-white/55">
                      Include goals + timelines if you can — we’ll tailor the response.
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={submitting} className="w-full rounded-xl" variant="primary">
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Spinner />
                      Sending…
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      Send Message
                      <IconSend className="h-5 w-5" />
                    </span>
                  )}
                </Button>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="button" onClick={openCalendly} variant="outlineDark" className="w-full">
                    <span className="inline-flex items-center gap-2">
                      <IconCalendar className="h-4 w-4" />
                      Book a call instead
                    </span>
                  </Button>

                  <a
                    href="mailto:info@collinalitics.co.uk"
                    className="w-full inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-950/40 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-950/55 transition"
                  >
                    <span className="inline-flex items-center gap-2">
                      <IconMail className="h-4 w-4" />
                      Email us
                    </span>
                  </a>
                </div>

                <p className="text-center text-xs text-white/55">
                  We typically respond within 24 hours.
                </p>

                {hasErrors && (
                  <p className="text-center text-xs text-white/55">
                    Please fix the highlighted fields and try again.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ===== Minimal UI ===== */

function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-white mb-2">
      {children}
    </label>
  );
}

function Input({ className = "", ...props }) {
  return <input {...props} className={className} />;
}

function Textarea({ className = "", ...props }) {
  return <textarea {...props} className={className} />;
}

function Button({ className = "", variant = "primary", disabled, children, ...props }) {
  const styles =
    variant === "primary"
      ? [
          "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold",
          "bg-collin-teal text-white shadow-lg shadow-collin-teal/25 hover:opacity-95 transition",
          "disabled:opacity-60 disabled:cursor-not-allowed",
        ].join(" ")
      : variant === "outlineDark"
      ? [
          "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold",
          "border border-slate-800 bg-slate-950/40 text-white hover:bg-slate-950/55 transition",
          "disabled:opacity-60 disabled:cursor-not-allowed",
        ].join(" ")
      : "";

  return (
    <button {...props} disabled={disabled} className={[styles, className].join(" ")}>
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path d="M22 12a10 10 0 0 1-10 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/* ===== Inline icons ===== */

function IconArrowRight({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7" />
    </svg>
  );
}

function IconCalendar({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
    </svg>
  );
}

function IconMail({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
    </svg>
  );
}

function IconSend({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}