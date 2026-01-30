# Collinalitics Ltd – Next.js One-Page Site (App Router + Tailwind)

A professional one-page website for Collinalitics Ltd, built with **Next.js (App Router)** and **Tailwind CSS**. Ready for **Netlify** deployment with `@netlify/plugin-nextjs`.

## Features
- App Router (`/app`) with SEO `metadata`
- Tailwind CSS and reusable utility classes
- Smooth in-page navigation, fixed navbar, correct anchor offsets
- Sections: Hero, About, Services, How We Work, Demo Use Case, Why Us, Contact, Footer
- Open Graph meta and favicon in `/public`

## Getting Started
```bash
npm install
npm run dev
```
Open http://localhost:3000

### Production build
```bash
npm run build
npm start
```

## Deploy to Netlify
1. Push this repo to GitHub (or import directly in Netlify)
2. Netlify build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Plugin: `@netlify/plugin-nextjs` (already added in `netlify.toml`)
3. Add your custom domain (collinalitics.co.uk) and configure DNS at 123 Reg

## 🔧 Customise
- Replace the email and company number in `components/Contact.jsx` and `components/Footer.jsx`
- Update colours in `tailwind.config.js`
- Replace `/public/og-image.png` with a branded 1200×630 banner

##  Structure
```
collinalitics-next/
  app/
    layout.jsx
    page.jsx
    globals.css
  components/
    Navbar.jsx
    Hero.jsx
    About.jsx
    Services.jsx
    HowWeWork.jsx
    UseCase.jsx
    WhyUs.jsx
    Contact.jsx
    Footer.jsx
  public/
    favicon.svg
    og-image.png
  next.config.mjs
  package.json
  postcss.config.js
  tailwind.config.js
  netlify.toml
  README.md
```
