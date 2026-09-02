"use client";

import { Fragment } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MaskLines, Reveal } from "@/components/motion";
import { stats } from "@/lib/site";

const RobotStage = dynamic(
  () => import("@/components/ui/robot-hero").then((m) => m.RobotStage),
  { ssr: false },
);

export function HeroPaper() {
  return (
    <section id="top" className="pt-24 md:pt-28">
      <div className="shell">
        <Reveal className="flex items-baseline justify-between border-b border-bone pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
          <span>Automata · a field guide</span>
          <span className="hidden sm:inline">No. 01 · MMXXVI</span>
          <span>Open for submissions</span>
        </Reveal>

        <MaskLines
          as="h1"
          delay={0.08}
          className="mt-8 font-display text-[clamp(2.15rem,6.4vw,5.25rem)] leading-[0.98]"
          lines={[
            <Fragment key="a">Machines learn the world</Fragment>,
            <Fragment key="b">
              by <span className="text-signal">watching</span> someone do it.
            </Fragment>,
          ]}
        />

        <div className="mt-10 grid grid-cols-12 gap-y-10 border-t border-line pt-8 md:gap-x-8">
          <Reveal delay={0.2} className="col-span-12 md:col-span-4">
            <p className="text-[1.0625rem] leading-relaxed text-bone-dim">
              <span className="float-left mr-2 mt-1 font-display text-[3.25rem] leading-[0.72] text-bone">
                F
              </span>
              ilm thirty seconds of an ordinary chore from your own eyeline. A person
              reviews it by hand. Approved clips are paid in USDG on Robinhood Chain,
              straight to your wallet — no minimum, no payout cycle, no invoice.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/record"
                className="inline-flex h-12 items-center justify-center gap-3 bg-bone px-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors duration-200 hover:bg-signal hover:text-ink-card"
              >
                Record a clip
              </a>
              <a
                href="#ledger"
                className="inline-flex h-12 items-center justify-center border border-bone/30 px-6 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-dim transition-colors duration-200 hover:border-bone hover:text-bone"
              >
                What we have paid
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.28} className="col-span-12 md:col-span-5">
            <figure className="border border-line bg-ink-card">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/pov.jpg"
                  alt="First-person view of two hands lifting a mug from a cluttered kitchen counter."
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="flex items-baseline justify-between gap-4 border-t border-line px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
                <span>Plate I · accepted, 24s</span>
                <span className="text-signal">8.50 USDG</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.36} className="col-span-12 md:col-span-3">
            <figure className="border border-line bg-ink-raised">
              <RobotStage
                className="h-[13rem] w-full cursor-pointer md:h-[15rem]"
                scale={1.15}
                color="#5d574a"
                screenColor="#bf3d17"
                screenGlow={0.7}
              />
              <figcaption className="border-t border-line px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
                Fig. 1 · the automaton
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal stagger={0.07} className="mt-12 grid grid-cols-2 border-t border-bone/25 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="border-b border-line py-5 pr-4 even:border-l even:pl-5 md:border-b-0 md:border-l-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
            >
              <div className="font-display text-[1.75rem] md:text-[2.25rem]">{s.value}</div>
              <div className="eyebrow mt-1.5">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
