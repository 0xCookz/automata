"use client";

import { Fragment } from "react";
import dynamic from "next/dynamic";
import { MaskLines, Reveal } from "@/components/motion";
import { stats } from "@/lib/site";

const RobotStage = dynamic(
  () => import("@/components/ui/robot-hero").then((m) => m.RobotStage),
  { ssr: false },
);

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 md:pt-32">
      {/* a single warm bloom behind the automaton, nothing else */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[12%] h-[46rem] w-[46rem] rounded-full opacity-[0.18] blur-[120px]"
        style={{ background: "radial-gradient(circle, #ff4a1c 0%, transparent 62%)" }}
      />

      <div className="shell relative">
        <div className="grid grid-cols-12 items-start gap-y-6 md:gap-y-10 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-7">
            <Reveal className="eyebrow flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 animate-pulse bg-signal" />
              Corpus 001 · open for submissions
            </Reveal>

            <MaskLines
              as="h1"
              delay={0.08}
              className="mt-7 font-display text-[clamp(2.05rem,5vw,4.25rem)] font-bold leading-[0.94] tracking-[-0.03em]"
              lines={[
                <Fragment key="a">Machines learn the</Fragment>,
                <Fragment key="b">
                  world by <em className="font-normal italic text-signal">watching</em>
                </Fragment>,
                <Fragment key="c">someone do it.</Fragment>,
              ]}
            />

            <Reveal delay={0.35} className="mt-8 max-w-[46ch] text-[1.0625rem] leading-relaxed text-bone-dim">
              <p>
                Film thirty seconds of an ordinary chore from your own eyeline. A person
                reviews it. Approved clips settle in USDG on Robinhood Chain — straight to
                your wallet, no minimum, no payout cycle.
              </p>
            </Reveal>

            <Reveal delay={0.45} stagger={0.08} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="/record"
                className="group inline-flex h-14 items-center justify-center gap-3 bg-bone px-6 sm:h-12 sm:justify-start font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors duration-200 hover:bg-signal"
              >
                Record a clip
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                  <path
                    d="M0 5h12M8.5 1 12.5 5l-4 4"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    className="transition-transform duration-300 group-hover:translate-x-[2px]"
                  />
                </svg>
              </a>
              <a
                href="#ledger"
                className="inline-flex h-14 items-center justify-center border border-line px-6 sm:h-12 sm:justify-start font-mono text-[11px] uppercase tracking-[0.16em] text-bone-dim transition-colors duration-200 hover:border-bone/40 hover:text-bone"
              >
                See what we have paid
              </a>
            </Reveal>
          </div>

          {/* The automaton. Deliberately small — it is a signature, not a mascot. */}
          <div className="col-span-12 lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[24rem]">
              <RobotStage className="h-[15rem] w-full cursor-pointer sm:h-[20rem] lg:h-[27rem]" scale={1.25} />
              <Reveal delay={0.6} className="pointer-events-none -mt-4 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint md:-mt-2">
                <span>Automata-01 · prototype</span>
                <span className="hidden sm:inline">press to greet</span>
              </Reveal>
            </div>
          </div>
        </div>

        <Reveal
          delay={0.2}
          stagger={0.07}
          className="mt-14 grid grid-cols-2 border-t border-line md:mt-20 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="border-b border-line py-5 pr-4 even:border-l even:pl-5 md:border-b-0 md:border-l-0 md:border-r md:px-6 md:py-7 md:even:pl-6 md:first:pl-0 md:last:border-r-0"
            >
              <div className="font-display text-[1.75rem] tracking-tight md:text-[2.5rem]">{s.value}</div>
              <div className="eyebrow mt-2">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
