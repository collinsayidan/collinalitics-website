import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },

      /* ============================
         Collinalitics Colour System
         ============================ */
      colors: {
        collin: {
          navy: '#0A2540',
          teal: '#0FB5BA',
          'teal-light': '#6EDAD5',   // ✔ FIXED — kebab-case
          slate: '#4A4A4A',
          white: '#FFFFFF',
        },

        semantic: {
          success: '#0FB5BA',
          warning: '#F5A623',
          error: '#D64545',
          info: '#1AA7D1',
        }
      },

      /* ============================
         Collinalitics Typography Scale
         ============================ */
      fontSize: {
        display: ['4rem', { lineHeight: '1.1', fontWeight: '700' }],
        h1: ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        h2: ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        h3: ['1.875rem', { lineHeight: '1.2', fontWeight: '600' }],
        h4: ['1.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        h5: ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],

        bodyxl: ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
        bodylg: ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        bodysm: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
