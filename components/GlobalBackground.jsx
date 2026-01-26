// /components/GlobalBackground.jsx
"use client";
import { useEffect, useRef } from "react";

export default function GlobalBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const offset = window.scrollY * 0.02;
      ref.current.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="
        fixed inset-0 -z-10 pointer-events-none
        bg-[radial-gradient(circle_at_50%_20%,rgba(10,37,64,0.25),rgba(10,37,64,0.9))]
      "
    >
      <div
        className="
          absolute inset-0 opacity-[0.04]
          bg-[url('/patterns/grid.svg')]
        "
      />
    </div>
  );
}
