"use client";

import { Fragment } from "react";
import dynamic from "next/dynamic";
import { MaskLines, Reveal } from "@/components/motion";
import { pay, site } from "@/lib/site";

const RobotStage = dynamic(
  () => import("@/components/ui/robot-hero").then((m) => m.RobotStage),
  { ssr: false },
);

const chips = ["5–30 seconds", "Reviewed by a person", "Paid on-chain", "No minimum"];

export function HeroAurora() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 md:pt-32">
      {/* mesh light: three slow blobs behind everything */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-[10%] top-[-18%] h-[36rem] w-[36rem] rounded-full opacity-50 blur-[120px]"
          style={{ background: "radial-gradient(circle, #2f4bd8 0%, transparent 70%)" }}
        />
        <div
          className="absolute right-[-12%] top-[6%] h-[32rem] w-[32rem] rounded-full opacity-40 blur-[120px]"
          style={{ background: "radial-gradient(circle, #17a1a1 0%, transparent 70%)" }}
        />
        <div
          className="absolute left-[38%] top-[42%] h-[26rem] w-[26rem] rounded-full opacity-30 blur-[130px]"
          style={{ background: "radial-gradient(circle, #6f4bd8 0%, transparent 70%)" }}
        />
      </div>

      <div className="shell relative">
        <div className="grid grid-cols-12 items-center gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-6">
            <Reveal className="panel inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim">
                Corpus 001 · open for submissions
              </span>
            </Reveal>

            <MaskLines
              as="h1"
              delay={0.08}
              className="mt-7 font-display text-[clamp(2.4rem,5.4vw,4.5rem)] leading-[1.0]"
              lines={[
                <Fragment key="a">Thirty seconds</Fragment>,
                <Fragment key="b">of your ordinary</Fragment>,
                <Fragment key="c">
                  day, <span className="text-aurora">paid for</span>.
                </Fragment>,
              ]}
            />

            <Reveal delay={0.32} className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-bone-dim">
              <p>
                Film an everyday task from your own eyeline. A person reviews it, and
                approved clips settle in {site.token} on {site.chain} — straight to your
                wallet.
              </p>
            </Reveal>

            <Reveal delay={0.42} stagger={0.08} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/record"
                className="inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold text-[#070810] transition-transform duration-200 hover:-translate-y-px"
                style={{ background: "linear-gradient(96deg, #dfe8ff 0%, #7ff0e0 100%)" }}
              >
                Record a clip
              </a>
              <a
                href="#ledger"
                className="panel inline-flex h-12 items-center justify-center rounded-full border px-7 text-sm font-medium text-bone"
              >
                See the ledger
              </a>
            </Reveal>

            <Reveal delay={0.5} stagger={0.05} className="mt-8 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span
                  key={c}
                  className="panel rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-dim"
                >
                  {c}
                </span>
              ))}
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Reveal delay={0.2} className="panel relative border p-5 sm:p-7">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
                <span>Automata-01</span>
                <span className="text-signal">live</span>
              </div>

              <RobotStage
                className="h-[17rem] w-full cursor-pointer sm:h-[20rem] lg:h-[22rem]"
                scale={1.3}
                color="#d5dbec"
                screenColor="#7aa2ff"
                screenGlow={1}
                rimColor="#7aa2ff"
              />

              <div className="grid grid-cols-3 gap-3">
                {[
                  ["clip", `${pay.min}–${pay.max}s`],
                  ["per clip", `${pay.flat.toFixed(2)}`],
                  ["reviewed", "by a person"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-line/70 bg-white/[0.03] px-3 py-2.5">
                    <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone-faint">
                      {k}
                    </div>
                    <div className="mt-1 text-sm text-bone tnum">{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
