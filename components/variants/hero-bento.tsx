"use client";

import { Fragment } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MaskLines, Reveal } from "@/components/motion";
import { payouts, site } from "@/lib/site";

const RobotStage = dynamic(
  () => import("@/components/ui/robot-hero").then((m) => m.RobotStage),
  { ssr: false },
);

const latest = payouts[0];

export function HeroBento() {
  return (
    <section id="top" className="pt-24 md:pt-28">
      <div className="shell">
        <div className="grid grid-cols-12 gap-3">
          {/* the claim */}
          <Reveal className="panel col-span-12 border border-line p-7 sm:p-9 lg:col-span-7 lg:p-11">
            <div className="flex items-center gap-2.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim">
                Corpus 001 · open for submissions
              </span>
            </div>

            <MaskLines
              as="h1"
              delay={0.06}
              className="mt-7 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.04]"
              lines={[
                <Fragment key="a">Your kitchen is</Fragment>,
                <Fragment key="b">
                  a <span className="text-signal">training set</span>.
                </Fragment>,
                <Fragment key="c">Nobody has filmed it.</Fragment>,
              ]}
            />

            <Reveal delay={0.3} className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-bone-dim">
              <p>
                Five to thirty seconds of an ordinary task, shot from your own eyeline.
                Reviewed by a person, paid in {site.token} on {site.chain}.
              </p>
            </Reveal>

            <Reveal delay={0.4} stagger={0.08} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#record"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-signal px-6 text-sm font-semibold text-[#08090c] transition-transform duration-200 hover:-translate-y-px"
              >
                Record a clip
              </a>
              <a
                href="#how"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-line px-6 text-sm font-medium text-bone-dim transition-colors duration-200 hover:text-bone"
              >
                How it works
              </a>
            </Reveal>
          </Reveal>

          {/* the unit */}
          <Reveal delay={0.12} className="panel relative col-span-12 border border-line sm:col-span-7 lg:col-span-5">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/3 h-52 w-52 -translate-x-1/2 rounded-full opacity-25 blur-[70px]"
              style={{ background: "radial-gradient(circle, #35e0c5 0%, transparent 70%)" }}
            />
            <div className="relative flex items-center justify-between px-5 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
              <span>Automata-01</span>
              <span className="text-signal">live</span>
            </div>
            <RobotStage
              className="h-[15rem] w-full cursor-pointer sm:h-[17rem] lg:h-[19rem]"
              scale={1.25}
              color="#cfd6d4"
              screenColor="#35e0c5"
              screenGlow={0.9}
            />
          </Reveal>

          {/* last payout */}
          <Reveal delay={0.18} className="panel col-span-6 border border-line p-6 sm:col-span-5 lg:col-span-3">
            <div className="eyebrow">Last payout</div>
            <div className="mt-3 font-display text-[2.5rem] leading-none tnum">
              ${latest.amount.toFixed(2)}
            </div>
            <div className="mt-3 text-sm text-bone-dim">{latest.task}</div>
            <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
              <span className="inline-block h-1 w-1 rounded-full bg-signal" />
              {latest.when} · {latest.seconds}s
            </div>
          </Reveal>

          {/* rate */}
          <Reveal delay={0.24} className="panel col-span-6 border border-line p-6 lg:col-span-3">
            <div className="eyebrow">Pays up to</div>
            <div className="mt-3 font-display text-[2.5rem] leading-none tnum">$5.80</div>
            <div className="mt-3 text-sm text-bone-dim">for a full thirty seconds</div>
            <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
              no minimum · no cycle
            </div>
          </Reveal>

          {/* a frame from the corpus */}
          <Reveal delay={0.3} className="panel relative col-span-12 min-h-[13rem] border border-line lg:col-span-6">
            <Image
              src="/pov.jpg"
              alt="First-person view of two hands lifting a mug from a cluttered kitchen counter."
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
              <div>
                <div className="eyebrow">From the corpus</div>
                <div className="mt-1.5 text-sm text-bone">Wiping down a kitchen counter</div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
                accepted
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
