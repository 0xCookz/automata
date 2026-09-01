"use client";

import { Fragment } from "react";
import dynamic from "next/dynamic";
import { MaskLines, Reveal } from "@/components/motion";
import { stats } from "@/lib/site";

const RobotStage = dynamic(
  () => import("@/components/ui/robot-hero").then((m) => m.RobotStage),
  { ssr: false },
);

const readouts = [
  ["corpus", "001 · open"],
  ["accepted clips", "12,480"],
  ["review queue", "6h 12m"],
  ["settlement", "USDG · Robinhood Chain"],
];

export function HeroHud() {
  return (
    <section id="top" className="pt-24 md:pt-28">
      <div className="shell">
        {/* instrument panel */}
        <Reveal className="relative border border-line bg-ink-raised">
          <span aria-hidden className="absolute -left-px -top-px h-3 w-3 border-l border-t border-signal" />
          <span aria-hidden className="absolute -right-px -top-px h-3 w-3 border-r border-t border-signal" />
          <span aria-hidden className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-signal" />
          <span aria-hidden className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-signal" />

          <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint">
            <span className="flex items-center gap-2 text-signal">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
              rec · corpus 001
            </span>
            <span className="tnum">cam 01 · 1080p · 60fps</span>
          </div>

          <div className="grid grid-cols-12">
            <div className="relative col-span-12 border-b border-line lg:col-span-5 lg:border-b-0 lg:border-r">
              <RobotStage
                className="h-[16rem] w-full cursor-pointer sm:h-[19rem] lg:h-[26rem]"
                scale={1.3}
                color="#c9d2cc"
                screenColor="#ffb020"
                screenGlow={0.85}
                rimColor="#ffb020"
              />
              {/* framing marks over the stage */}
              <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <line x1="50%" y1="44%" x2="50%" y2="56%" stroke="#ffb020" strokeWidth="1" opacity="0.5" />
                <line x1="44%" y1="50%" x2="56%" y2="50%" stroke="#ffb020" strokeWidth="1" opacity="0.5" />
              </svg>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
                <span>subject · automata-01</span>
                <span className="tnum">00:00:07:14</span>
              </div>
            </div>

            <div className="col-span-12 p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <MaskLines
                as="h1"
                className="font-display text-[clamp(1.65rem,3.4vw,2.85rem)] leading-[1.06]"
                lines={[
                  <Fragment key="a">Show the machine</Fragment>,
                  <Fragment key="b">what a real kitchen</Fragment>,
                  <Fragment key="c">
                    actually <span className="text-signal">looks like</span>
                  </Fragment>,
                ]}
              />

              <Reveal delay={0.3} className="mt-6 max-w-[48ch] text-[0.9375rem] leading-relaxed text-bone-dim">
                <p>
                  Five to thirty seconds of an ordinary task, filmed from your own eyeline.
                  A human reviews every frame. Approved clips settle on-chain, straight to
                  your wallet.
                </p>
              </Reveal>

              <Reveal delay={0.4} stagger={0.06} className="mt-8 grid grid-cols-2 gap-px bg-line">
                {readouts.map(([k, v]) => (
                  <div key={k} className="bg-ink-raised px-4 py-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">{k}</div>
                    <div className="mt-1 font-mono text-sm text-bone tnum">{v}</div>
                  </div>
                ))}
              </Reveal>

              <Reveal delay={0.5} stagger={0.08} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#record"
                  className="inline-flex h-12 items-center justify-center gap-3 bg-signal px-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-opacity duration-200 hover:opacity-85"
                >
                  Start recording
                </a>
                <a
                  href="#ledger"
                  className="inline-flex h-12 items-center justify-center border border-line px-6 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-dim transition-colors duration-200 hover:border-signal hover:text-signal"
                >
                  Inspect the ledger
                </a>
              </Reveal>
            </div>
          </div>
        </Reveal>

        <Reveal stagger={0.06} className="mt-px grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink-raised px-4 py-5">
              <div className="font-mono text-xl text-bone tnum md:text-2xl">{s.value}</div>
              <div className="eyebrow mt-1.5">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
