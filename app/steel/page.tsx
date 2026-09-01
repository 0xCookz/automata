import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VariantSwitch } from "@/components/variant-switch";
import { HeroTech, type HeroTechSkin } from "@/components/variants/hero-tech";
import { Ticker } from "@/components/sections/ticker";
import { How } from "@/components/sections/how";
import { Why } from "@/components/sections/why";
import { Ledger } from "@/components/sections/ledger";
import { Pay } from "@/components/sections/pay";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Steel",
  robots: { index: false, follow: false },
};

/** Instrument's layout, lit in white instead of blue. */
const steelSkin: HeroTechSkin = {
  bloom:
    "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 45%, transparent 75%)",
  glow: "radial-gradient(circle, rgba(255,255,255,0.75) 0%, transparent 70%)",
  pedestal:
    "linear-gradient(90deg, transparent, rgba(244,243,241,0.7), transparent)",
  gradient: "text-mercury",
  robotColor: "#e6e3dd",
  robotScreen: "#f4f3f1",
  robotGlow: 0.6,
  robotRim: "#efece6",
  ctaClass: "bg-bone text-ink shadow-[0_10px_30px_-12px_rgba(255,255,255,0.55)]",
};

export default function Page() {
  return (
    <div data-variant="steel" className="bg-ink text-bone">
      <style>{`body{background:#050505}`}</style>
      <SiteHeader />
      <main id="main">
        <HeroTech skin={steelSkin} />
        <Ticker />
        <Why />
        <How />
        <Ledger />
        <Pay />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
      <VariantSwitch current="/steel" />
    </div>
  );
}
