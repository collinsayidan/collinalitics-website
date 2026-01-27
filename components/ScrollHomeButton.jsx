"use client";
import { useEffect, useState } from "react";

export default function ScrollHomeButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <a
      href="/"
      aria-label="Back to Home"
      className={`fixed right-6 bottom-28 z-40 transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        bg-white text-collin-navy border border-gray-200
        w-12 h-12 rounded-full shadow-md flex items-center justify-center
        hover:bg-gray-50
      `}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M5 15l7-7 7 7" />
      </svg>
    </a>
  );
}
