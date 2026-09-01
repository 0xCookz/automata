import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VariantSwitch } from "@/components/variant-switch";
import { HeroBento } from "@/components/variants/hero-bento";
import { Ticker } from "@/components/sections/ticker";
import { How } from "@/components/sections/how";
import { Why } from "@/components/sections/why";
import { Ledger } from "@/components/sections/ledger";
import { Pay } from "@/components/sections/pay";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Bento",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div data-variant="bento" className="bg-ink text-bone">
      <style>{`body{background:#08090c}`}</style>
      <SiteHeader />
      <main id="main">
        <HeroBento />
        <Ticker />
        <Why />
        <How />
        <Ledger />
        <Pay />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
      <VariantSwitch current="/bento" />
    </div>
  );
}
