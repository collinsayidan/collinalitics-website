import React from "react";
import Image from "next/image";

export default function ClientLogos() {
  const logos = [
    {
      name: "Client A",
      src: "https://dummyimage.com/160x60/0A2540/ffffff&text=▲",
    },
    {
      name: "Client B",
      src: "https://dummyimage.com/160x60/1FB6A6/ffffff&text=■",
    },
    {
      name: "Client C",
      src: "https://dummyimage.com/160x60/7EE0D2/ffffff&text=●",
    },
    {
      name: "Client D",
      src: "https://dummyimage.com/160x60/4A4A4A/ffffff&text=◆",
    },
  ];

  return (
    <section
      className="section section-pad relative overflow-hidden bg-white"
      aria-label="Client logos"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] bg-[url('/patterns/grid.svg')] pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-64 w-64 rounded-full bg-collin-teal-light/16 blur-3xl" />
        <div className="absolute -bottom-28 left-[-6rem] h-64 w-64 rounded-full bg-collin-teal/10 blur-3xl" />
      </div>

      <div className="container-wrapper relative z-10">
        {/* Top divider */}
        <div
          className="mx-auto h-px w-40 bg-gradient-to-r from-transparent via-collin-teal-light/50 to-transparent mb-12"
          aria-hidden="true"
        />

        {/* Headline */}
        <header className="text-center mb-12 sm:mb-14">
          <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
            Trusted partners
          </p>
          <h3 className="mt-3 text-h3 text-collin-navy">
            Trusted by UK organisations
          </h3>
          <p className="mt-3 text-body text-collin-slate">
            From public-sector teams to private-sector operations — clarity and outcomes first.
          </p>
        </header>

        {/* Logos */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 items-center">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className={[
                "card bg-white/95",
                "p-5 sm:p-6",
                "flex items-center justify-center",
                "hover:border-collin-teal/30",
              ].join(" ")}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={160}
                height={60}
                className="h-10 sm:h-11 md:h-12 w-auto grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div
          className="mx-auto h-px w-40 bg-gradient-to-r from-transparent via-collin-teal-light/50 to-transparent mt-14 sm:mt-16"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}