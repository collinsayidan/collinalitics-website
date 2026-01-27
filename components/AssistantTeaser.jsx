"use client";
import { useEffect, useState } from "react";

export default function AssistantTeaser() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000); // show after 3s
    const hideTimer = setTimeout(() => setShow(false), 9000); // hide after 6s

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-32 right-6 z-40 transition-all duration-500
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      {/* Bubble */}
      <div className="bg-white shadow-xl rounded-xl px-4 py-3 border border-gray-200 max-w-xs flex items-start gap-3">
        {/* Chat bubble icon */}
        <div className="h-7 w-7 rounded-md bg-collin-teal flex items-center justify-center flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-4 w-4 text-white"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
          </svg>
        </div>

        <p className="text-sm text-collin-navy font-medium leading-snug">
          Need help? I’m here if you need anything.
        </p>
      </div>

      {/* Arrow */}
      <div className="w-3 h-3 bg-white rotate-45 shadow-sm border border-gray-200 -mt-1 ml-8"></div>
    </div>
  );
}
