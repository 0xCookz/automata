"use client";

import { Fragment } from "react";
import dynamic from "next/dynamic";
import { MaskLines, Reveal } from "@/components/motion";
import { pay, site } from "@/lib/site";

const RobotStage = dynamic(
  () => import("@/components/ui/robot-hero").then((m) => m.RobotStage),
  { ssr: false },
);

const specs = [
  ["Clip length", `${pay.min}–${pay.max}s`],
  ["Every clip pays", `${pay.flat.toFixed(2)} ${site.token}`],
  ["Settles in", site.token],
  ["Reviewed by", "a person"],
];

export function HeroProduct() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 30%, #ffffff 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      <div className="shell relative text-center">
        <Reveal className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
          Corpus 001 · open for submissions
        </Reveal>

        <MaskLines
          as="h1"
          delay={0.08}
          className="mx-auto mt-7 max-w-[15ch] font-display text-[clamp(2.4rem,6.6vw,5.25rem)] leading-[0.94]"
          lines={[
            <Fragment key="a">Get paid to teach</Fragment>,
            <Fragment key="b">
              robots the <span className="text-signal">boring</span> part.
            </Fragment>,
          ]}
        />

        <Reveal delay={0.3} className="mx-auto mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed text-bone-dim">
          <p>
            Thirty seconds of an ordinary chore, filmed from your eyeline. Reviewed by a
            person, paid in {site.token} on {site.chain}.
          </p>
        </Reveal>

        <Reveal delay={0.4} stagger={0.08} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/record"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-signal px-7 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-px sm:w-auto"
          >
            Record a clip
          </a>
          <a
            href="#how"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line bg-ink-card px-7 text-sm font-medium text-bone transition-colors duration-200 hover:border-bone/40 sm:w-auto"
          >
            See how it works
          </a>
        </Reveal>

        {/* the product on its stage */}
        <div className="relative mx-auto -mt-2 max-w-[46rem] sm:mt-0">
          <RobotStage
            className="h-[17rem] w-full cursor-pointer sm:h-[21rem] md:h-[24rem]"
            scale={1.5}
            color="#f2f1ee"
            screenColor="#1f3cff"
            screenGlow={0.9}
          />
          <div
            aria-hidden
            className="mx-auto -mt-10 h-10 w-[42%] rounded-[50%] blur-2xl"
            style={{ background: "rgba(16,16,18,0.22)" }}
          />
        </div>

        <Reveal stagger={0.07} className="mt-12 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {specs.map(([k, v]) => (
            <div
              key={k}
              className="border-b border-line py-5 even:border-l even:pl-5 md:border-b-0 md:border-l-0 md:border-r md:px-6 md:py-6 md:last:border-r-0"
            >
              <div className="eyebrow">{k}</div>
              <div className="mt-1.5 font-display text-xl md:text-2xl">{v}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
