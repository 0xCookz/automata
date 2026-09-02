import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VariantSwitch } from "@/components/variant-switch";
import { HeroMonolith } from "@/components/variants/hero-monolith";
import { Uploads } from "@/components/sections/uploads";
import { Ticker } from "@/components/sections/ticker";
import { How } from "@/components/sections/how";
import { Why } from "@/components/sections/why";
import { Ledger } from "@/components/sections/ledger";
import { Pay } from "@/components/sections/pay";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Monolith",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div data-variant="mono" className="bg-ink text-bone">
      <style>{`body{background:#050505}`}</style>
      <SiteHeader />
      <main id="main">
        <HeroMonolith />
        <Uploads />
        <Ticker />
        <Why />
        <How />
        <Ledger />
        <Pay />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
      <VariantSwitch current="/monolith" />
    </div>
  );
}
