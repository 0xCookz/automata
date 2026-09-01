import type { Metadata, Viewport } from "next";
import { faqs, site } from "@/lib/site";
import "./globals.css";

const title = "Automata — Get paid to teach robots how the world works";
const description =
  "Record 5 to 30 seconds of an everyday task from your own point of view. A human reviews it. Approved clips are paid in USDG on Robinhood Chain, straight to your wallet.";

export const metadata: Metadata = {
  metadataBase: new URL("https://automata.build"),
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
    url: "https://automata.build",
    siteName: "Automata",
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Automata" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://automata.build" },
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
