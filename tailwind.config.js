import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },

      /* ============================
         Collinalitics Colour System
         ============================ */
      colors: {
        collin: {
          navy: "#0A2540",
          teal: "#0FB5BA",
          "teal-light": "#6EDAD5",
          slate: "#4A4A4A",
          white: "#FFFFFF",
        },

        semantic: {
          success: "#0FB5BA",
          warning: "#F5A623",
          error: "#D64545",
          info: "#1AA7D1",
        },
      },

      /* ============================
         Backgrounds
         ============================ */
      backgroundImage: {
        "collin-navy-gradient":
          "linear-gradient(135deg, #0A2540 0%, #0D315A 100%)",
      },

      /* ============================
         Premium Tokens
         ============================ */
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.1rem",
      },

      boxShadow: {
        soft: "0 10px 30px rgba(2,12,27,0.06)",
        lift: "0 18px 50px rgba(2,12,27,0.10)",
        glowTeal: "0 0 0 6px rgba(15,181,186,0.10)",
        glowTealLight: "0 0 0 6px rgba(110,218,213,0.12)",
        glowNavy: "0 0 0 6px rgba(10,37,64,0.10)",
      },

      /* ============================
         Typography Scale (optional)
         Keep if you want theme tokens.
         ============================ */
      fontSize: {
        display: ["4rem", { lineHeight: "1.1", fontWeight: "700" }],
        h1: ["3rem", { lineHeight: "1.1", fontWeight: "700" }],
        h2: ["2.25rem", { lineHeight: "1.2", fontWeight: "600" }],
        h3: ["1.875rem", { lineHeight: "1.2", fontWeight: "600" }],
        h4: ["1.5rem", { lineHeight: "1.2", fontWeight: "600" }],
        h5: ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],

        bodyxl: ["1.25rem", { lineHeight: "1.6", fontWeight: "400" }],
        bodylg: ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        bodysm: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "400" }],
      },
    },
  },

  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};