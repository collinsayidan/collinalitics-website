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
    <section className="relative py-24 bg-white overflow-hidden">

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/patterns/grid.svg')] pointer-events-none" />

      <div className="container-wrapper relative z-10">

        {/* Top Divider */}
        <div className="mx-auto h-px w-32 bg-collin-lightTeal/40 mb-12" />

        {/* Headline */}
        <div className="text-center mb-14">
          <h3 className="text-collin-navy text-xl font-semibold tracking-wide">
            Trusted by UK Organisations
          </h3>
          <p className="text-collin-slate text-sm mt-2">
            From public‑sector teams to private‑sector operations
          </p>
        </div>

        {/* Logos */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-12 items-center">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex justify-center p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-collin-teal/40 transition-all duration-300"
              data-aos="fade-up"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-12 w-auto grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Bottom Divider */}
        <div className="mx-auto h-px w-32 bg-collin-lightTeal/40 mt-16" />

      </div>
    </section>
  );
}
