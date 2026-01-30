import "./globals.css";
import { Roboto, Roboto_Condensed } from "next/font/google";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import AssistantButton from "../components/AssistantButton";
import AnalyticsLoader from "../components/AnalyticsLoader";
import CookieConsentProvider from "../components/cookies/CookieConsentProvider";
import CookieBanner from "../components/cookies/CookieBanner";
import CookiePreferencesModal from "../components/cookies/CookiePreferencesModal";
import AssistantTeaser from "@/components/AssistantTeaser";
import ScrollHomeButton from "@/components/ScrollHomeButton";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto-condensed",
});

export const metadata = {
  metadataBase: new URL("https://collinalitics.co.uk"),
  title: "Collinalitics Ltd – Turning Data Into Clear Business Decisions",
  description:
    "IT Consulting, Data Analytics & Business Intelligence for UK organisations. Collinalitics Ltd delivers clear reporting, dashboards, and systems analysis.",
  alternates: { canonical: "https://collinalitics.co.uk" },
  openGraph: {
    title: "Collinalitics Ltd",
    description:
      "IT Consulting, Data Analytics & Business Intelligence for UK organisations.",
    url: "https://collinalitics.co.uk",
    type: "website",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Collinalitics Ltd",
    description:
      "IT Consulting, Data Analytics & Business Intelligence for UK organisations.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2a8af0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body
        suppressHydrationWarning
        className={`${roboto.className} ${robotoCondensed.variable} bg-white text-gray-900`}
      >
        {/* Skip to content */}
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        {/* Cookie consent must wrap Cookie UI + AnalyticsLoader */}
        <CookieConsentProvider>
          {/* Cookie UI sits above everything */}
          <CookieBanner />
          <CookiePreferencesModal />

          {/* Client providers/components */}
          <SmoothScrollProvider>
            <main id="main">{children}</main>
            <AssistantButton />
            <AssistantTeaser />
            <ScrollHomeButton />
          </SmoothScrollProvider>

          {/* Optional analytics (should respect consent inside this component) */}
          <AnalyticsLoader />
        </CookieConsentProvider>
      </body>
    </html>
  );
}