"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.target);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setStatus("success");
      e.target.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="py-32 bg-white">
      <div className="container-wrapper max-w-2xl mx-auto">

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-h2 text-collin-navy font-semibold">
            Contact Us
          </h1>

          <p className="text-body text-collin-slate mt-3 leading-relaxed">
            Have a question or want to work with us? Send a message and we’ll get back to you shortly.
          </p>

          <div className="mt-6 h-px w-24 bg-collin-lightTeal/40" />
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-bodysm text-collin-navy font-medium block mb-2">
              Your Name
            </label>
            <input
              name="name"
              required
              className="
                w-full rounded-lg px-4 py-3
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-collin-lightTeal
                transition
              "
            />
          </div>

          <div>
            <label className="text-bodysm text-collin-navy font-medium block mb-2">
              Your Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="
                w-full rounded-lg px-4 py-3
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-collin-lightTeal
                transition
              "
            />
          </div>

          <div>
            <label className="text-bodysm text-collin-navy font-medium block mb-2">
              Your Message
            </label>
            <textarea
              name="message"
              rows="5"
              required
              className="
                w-full rounded-lg px-4 py-3
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-collin-lightTeal
                transition
              "
            />
          </div>

          <button
            type="submit"
            className="
              cta-primary inline-flex items-center justify-center
              px-6 py-3 text-body font-semibold
            "
          >
            Send Message
          </button>

          {/* Status Messages */}
          {status === "loading" && (
            <p className="text-bodysm text-gray-500">Sending…</p>
          )}
          {status === "success" && (
            <p className="text-bodysm text-green-600">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-bodysm text-red-600">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}
