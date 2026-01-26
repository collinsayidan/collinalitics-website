
"use client";
import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Lazy-load Calendly widget script then open popup
  const openCalendly = () => {
    if (typeof window === "undefined") return;

    const openWidget = () => {
      window.Calendly?.initPopupWidget({
        url: "https://calendly.com/YOUR-LINK", // TODO: replace with your actual Calendly URL
      });
    };

    // Already loaded?
    if (window.Calendly) {
      openWidget();
      return;
    }

    // Load script once
    if (!document.getElementById("calendly-widget-script")) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = openWidget;
      document.body.appendChild(script);
    } else {
      // Script exists but Calendly not attached yet; wait briefly then try
      setTimeout(openWidget, 250);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Simple client-side validation
  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email address.";
    if (form.message.trim().length < 10) return "Please provide a short message (at least 10 characters).";
    if (form.company) return "Spam detected."; // honeypot triggered
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const error = validate();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }

    setSubmitting(true);
    try {
      // If you have an API route, post to it; otherwise fallback to mailto or keep alert.
      // Example POST:
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      // });
      // if (!res.ok) throw new Error("Network error");
      // const data = await res.json();

      // Temporary success (remove when API is wired):
      await new Promise((r) => setTimeout(r, 600));

      setStatus({
        type: "success",
        message: "Thanks! Your message has been sent. We’ll be in touch shortly.",
      });
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          "Sorry, something went wrong sending your message. Please email us directly at collinsayidan@collinalitics.co.uk.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section bg-gray-50 py-28 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] bg-[url('/patterns/grid.svg')] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-wrapper relative z-10">
        <div className="grid lg:grid-cols-3 gap-14 items-start">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <h2 className="section-title text-collin-navy">
              Ready to improve how you use data?
            </h2>

            <p className="section-subtitle text-collin-slate mt-3 max-w-xl">
              Book a call or send us a message — we’ll get back to you promptly.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              {/* Email Button */}
              <a
                href="mailto:collinsayidan@collinalitics.co.uk"
                className="cta-primary inline-flex items-center gap-2"
                aria-label="Email us at collinsayidan@collinalitics.co.uk"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l8 8 8-8" />
                </svg>
                Email us
              </a>

              {/* Website Button */}
              <a
                href="https://collinalitics.co.uk"
                target="_blank"
                rel="noreferrer"
                className="cta-secondary inline-flex items-center gap-2"
                aria-label="Visit collinalitics.co.uk (opens in new tab)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M2 12h20" />
                  <path d="M12 2c3 4 3 16 0 20" />
                </svg>
                Visit website
              </a>

              {/* Calendly Button */}
              <button
                onClick={openCalendly}
                className="cta-secondary inline-flex items-center gap-2"
                aria-label="Book a free discovery call on Calendly"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm9-6l-2 2-1-1"
                  />
                </svg>
                Book a Free Discovery Call
              </button>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="mt-14 grid gap-6 max-w-xl" noValidate>
              {/* Honeypot (hidden from users) */}
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

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-collin-navy mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-collin-teal focus:border-collin-teal transition"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-collin-navy mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-collin-teal focus:border-collin-teal transition"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-collin-navy mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-collin-teal focus:border-collin-teal transition"
                />
              </div>

              {/* Status */}
              {status.message && (
                <div
                  role="status"
                  className={`text-sm rounded-lg px-3 py-2 ${
                    status.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {status.message}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="cta-primary text-base py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right Contact Card */}
          <div
            className="card p-10 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-collin-teal/40 transition-all"
            data-aos="fade-left"
          >
            <div className="h-14 w-14 rounded-full bg-collin-teal/10 flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-collin-teal"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l8 8 8-8" />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-collin-navy">Contact</h3>

            <dl className="mt-6 text-gray-700 space-y-4">
              <div>
                <dt className="font-medium text-collin-navy">Email</dt>
                <dd>
                  <a
                    className="text-collin-teal hover:underline"
                    href="mailto:collinsayidan@collinalitics.co.uk"
                  >
                    collinsayidan@collinalitics.co.uk
                  </a>
                </dd>
              </div>

              <div>
                <dt className="font-medium text-collin-navy">Website</dt>
                <dd>
                  <a
                    className="text-collin-teal hover:underline"
                    href="https://collinalitics.co.uk"
                    target="_blank"
                    rel="noreferrer"
                  >
                    collinalitics.co.uk
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
