"use client";

import { Fragment } from "react";
import dynamic from "next/dynamic";
import { MaskLines, Reveal } from "@/components/motion";
import { stats } from "@/lib/site";

const RobotStage = dynamic(
  () => import("@/components/ui/robot-hero").then((m) => m.RobotStage),
  { ssr: false },
);

export function HeroMonolith() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      {/* one shaft of light, nothing else */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[52rem] w-[30rem] -translate-x-1/2 opacity-[0.16] blur-[90px]"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.15) 45%, transparent 80%)",
        }}
      />

      <div className="shell relative">
        <Reveal className="flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-bone-faint">
          <span className="h-px w-8 bg-line" />
          Corpus 001 · open
          <span className="h-px w-8 bg-line" />
        </Reveal>

        <MaskLines
          as="h1"
          delay={0.08}
          className="mx-auto mt-9 max-w-[13ch] text-center font-display text-[clamp(2.9rem,9vw,7.5rem)] leading-[0.9] uppercase"
          lines={[
            <Fragment key="a">Teach</Fragment>,
            <Fragment key="b">
              the <span className="text-mercury">machine</span>
            </Fragment>,
            <Fragment key="c">by hand.</Fragment>,
          ]}
        />

        <Reveal delay={0.34} className="mx-auto mt-9 max-w-[52ch] text-center text-[1.0625rem] leading-relaxed text-bone-dim">
          <p>
            Thirty seconds of an ordinary chore, filmed from your own eyeline. A person
            reviews it. USDG lands in your wallet on Robinhood Chain — no minimum, no
            cycle, no invoice.
          </p>
        </Reveal>

        <Reveal delay={0.44} className="mt-10 flex justify-center">
          <a
            href="#record"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden border border-bone px-10 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors duration-300 hover:text-ink"
          >
            <span className="absolute inset-0 -translate-y-full bg-bone transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            <span className="relative">Record a clip</span>
          </a>
        </Reveal>

        {/* the unit, standing on the fold */}
        <div className="relative mx-auto mt-4 max-w-[34rem]">
          <RobotStage
            className="h-[17rem] w-full cursor-pointer sm:h-[20rem] md:h-[22rem]"
            scale={1.35}
            color="#e6e3dd"
            screenColor="#f4f3f1"
            screenGlow={0.55}
          />
          <div
            aria-hidden
            className="pointer-events-none mx-auto -mt-6 h-px w-[70%]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(244,243,241,0.5), transparent)" }}
          />
        </div>

        <Reveal stagger={0.07} className="mt-14 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="border-b border-line py-6 pr-4 even:border-l even:pl-5 md:border-b-0 md:border-l-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
            >
              <div className="font-display text-[1.75rem] uppercase md:text-[2rem]">{s.value}</div>
              <div className="eyebrow mt-2">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
