import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Recorder } from "@/components/recorder";
import { pay, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Record a clip",
  description: `Film 5 to 30 seconds of an everyday task from your own eyeline. Approved clips pay ${pay.flat.toFixed(2)} ${site.token} on ${site.chain}.`,
};

export default function RecordPage() {
  return (
    <div data-variant="steel" className="bg-ink text-bone">
      <style>{`body{background:#050505}`}</style>
      <SiteHeader />

      <main id="main" className="shell pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="max-w-3xl">
          <div className="eyebrow">Corpus 001 · open for submissions</div>
          <h1 className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.04]">
            Film one task. Keep your hands in frame.
          </h1>
          <p className="mt-5 max-w-[54ch] text-bone-dim">
            Five to thirty seconds, shot from your own eyeline, one continuous take. A
            person reviews it and every approved clip pays {pay.flat.toFixed(2)}{" "}
            {site.token} — flat, whatever its length.
          </p>
        </div>

        <div className="mt-12">
          <Recorder />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
