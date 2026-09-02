import type { Metadata, Viewport } from "next";
import { faqs, site } from "@/lib/site";
import "./globals.css";

const title = "Automata — Get paid to film the chores that train humanoid robots";
const description =
  "Automata buys first-person footage of everyday chores to train humanoid robot manipulation. Record 5 to 30 seconds from your own eyeline, a person reviews it, and approved clips are paid in USDG on Robinhood Chain.";

export const metadata: Metadata = {
  metadataBase: new URL("https://tryautomata.app"),
  title: {
    default: title,
    template: "%s — Automata",
  },
  description,
  applicationName: "Automata",
  keywords: [
    "robot training data",
    "egocentric video dataset",
    "get paid to record",
    "USDG",
    "Robinhood Chain",
    "embodied AI",
    "manipulation data",
  ],
  openGraph: {
    type: "website",
    url: "https://tryautomata.app",
    siteName: "Automata",
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Automata" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@TryAutomata",
    creator: "@TryAutomata",
    title,
    description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://tryautomata.app" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      url: `https://${site.domain}`,
      description,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `js` is set on the server so hydration matches; the <noscript> block
    // below undoes the pre-animation hiding when scripting is unavailable.
    <html lang="en" className="js">
      <head>
        <link
          rel="preload"
          href="/fonts/zodiak-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/switzer-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
