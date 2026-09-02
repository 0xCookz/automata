"use client";

import { Fragment } from "react";
import dynamic from "next/dynamic";
import { MaskLines, Reveal } from "@/components/motion";
import { stats } from "@/lib/site";

const RobotStage = dynamic(
  () => import("@/components/ui/robot-hero").then((m) => m.RobotStage),
  { ssr: false },
);
const UnitViewport = dynamic(
  () => import("@/components/unit-viewport").then((m) => m.UnitViewport),
  { ssr: false },
);

export type HeroTechSkin = {
  /** wide bloom behind the hero */
  bloom: string;
  /** glow inside the unit panel */
  glow: string;
  /** hairline the unit appears to stand on */
  pedestal: string;
  /** class applied to the accented words in the headline */
  gradient: string;
  robotColor: string;
  robotScreen: string;
  robotGlow: number;
  robotRim: string;
  /** primary button: filled accent, or bone on black */
  ctaClass: string;
};

const blueSkin: HeroTechSkin = {
  bloom:
    "radial-gradient(50% 50% at 50% 50%, #3a56d8 0%, rgba(58,86,216,0.25) 45%, transparent 75%)",
  glow: "radial-gradient(circle, #5d7dff 0%, transparent 70%)",
  pedestal: "linear-gradient(90deg, transparent, rgba(93,125,255,0.65), transparent)",
  gradient: "text-gradient",
  robotColor: "#cdd4e4",
  robotScreen: "#5d7dff",
  robotGlow: 0.95,
  robotRim: "#5d7dff",
  ctaClass:
    "bg-signal text-white shadow-[0_10px_30px_-10px_rgba(93,125,255,0.9)]",
};

/** the whole loop, spelled out under the fold-line */
const loop = [
  ["01", "Film 5–30s of a chore", "from your own eyeline, on your phone"],
  ["02", "A person reviews it", "median 6 hours, reasons given if not"],
  ["03", "USDG hits your wallet", "and the clip enters the training set"],
];

const readouts = [
  ["training on", "12,480 clips"],
  ["review queue", "6h 12m"],
  ["last payout", "$5.08"],
];

export function HeroTech({
  skin = blueSkin,
  /** "figure" shows the rendered humanoid; "model" keeps the live 3D unit. */
  unit = "model",
}: {
  skin?: HeroTechSkin;
  unit?: "model" | "figure";
}) {
  return (
    <section id="top" className="relative overflow-hidden pt-24 md:pt-32">
      {/* engineering grid + a single cold bloom, both behind everything */}
      <div aria-hidden className="grid-field pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-12rem] h-[38rem] w-[64rem] -translate-x-1/2 opacity-45 blur-[130px]"
        style={{ background: skin.bloom }}
      />

      <div className="shell relative">
        <div className="grid grid-cols-12 items-center gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <Reveal className="panel inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim">
                Training data for humanoid robots · corpus 001 open
              </span>
            </Reveal>

            <MaskLines
              as="h1"
              delay={0.08}
              className="mt-7 font-display text-[clamp(2.35rem,5.2vw,4.4rem)] leading-[1.02]"
              lines={[
                <Fragment key="a">Get paid to</Fragment>,
                <Fragment key="b">
                  <span className={skin.gradient}>train a robot</span>
                </Fragment>,
                <Fragment key="c">to do your chores.</Fragment>,
              ]}
            />

            <Reveal delay={0.26} className="mt-6 max-w-[44ch] text-[1.25rem] leading-snug text-bone">
              <p>
                Film 30 seconds of an everyday task. That clip teaches a robot&apos;s
                hands how to do it.
              </p>
            </Reveal>

            <Reveal delay={0.34} className="mt-5 max-w-[48ch] text-[1.0625rem] leading-relaxed text-bone-dim">
              <p>
                Humanoids are close to walking and nowhere near loading a dishwasher.
                Manipulation is learned by watching human hands, and the footage that
                teaches it — real homes, bad light, one continuous task — barely exists.
                Automata buys it, clip by clip, and pays you in USDG the moment a
                reviewer approves yours.
              </p>
            </Reveal>

            <Reveal delay={0.42} stagger={0.08} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#record"
                className={`group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl px-6 text-sm font-medium transition-transform duration-200 hover:-translate-y-px ${skin.ctaClass}`}
              >
                Record a clip
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                  <path
                    d="M0 5h12M8.5 1 12.5 5l-4 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="transition-transform duration-300 group-hover:translate-x-[2px]"
                  />
                </svg>
              </a>
              <a
                href="#ledger"
                className="panel inline-flex h-12 items-center justify-center rounded-xl border border-line px-6 text-sm font-medium text-bone transition-colors duration-200 hover:border-bone/25"
              >
                See what we have paid
              </a>
            </Reveal>

            <Reveal delay={0.52} stagger={0.07} className="mt-10 grid gap-px border-t border-line pt-6 sm:grid-cols-3">
              {loop.map(([n, title, detail]) => (
                <div key={n} className="sm:pr-5">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-signal">{n}</span>
                    <span className="text-[0.9375rem] font-medium text-bone">{title}</span>
                  </div>
                  <p className="mt-1.5 pl-[1.9rem] text-[0.8125rem] leading-snug text-bone-faint sm:pl-0">
                    {detail}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* the unit, on its own instrument panel */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal delay={0.2} className="panel relative border border-line">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full opacity-40 blur-[70px]"
                style={{ background: skin.glow }}
              />

              <div className="relative flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
                <span>Automata-01</span>
                <span className="flex items-center gap-1.5 text-signal">
                  <span className="inline-block h-1 w-1 rounded-full bg-signal" />
                  live
                </span>
              </div>

              <div className="relative">
                {unit === "figure" ? (
                  <UnitViewport className="h-[19rem] w-full sm:h-[23rem] lg:h-[28rem]" />
                ) : (
                <RobotStage
                  className="h-[17rem] w-full cursor-pointer sm:h-[20rem] lg:h-[23rem]"
                  scale={1.3}
                  color={skin.robotColor}
                  screenColor={skin.robotScreen}
                  screenGlow={skin.robotGlow}
                  rimColor={skin.robotRim}
                />
                )}
                {/* pedestal: a lit line the unit appears to sit on — only under
                    the 3D model; over a photograph it reads as a scratch */}
                {unit === "model" ? (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-10 bottom-8 h-px"
                  style={{ background: skin.pedestal }}
                />
                ) : null}
              </div>

              <div className="relative grid grid-cols-3 border-t border-line">
                {readouts.map(([k, v], i) => (
                  <div key={k} className={`px-4 py-3 ${i ? "border-l border-line" : ""}`}>
                    <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone-faint">
                      {k}
                    </div>
                    <div className="mt-1 font-mono text-xs text-bone tnum">{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal stagger={0.07} className="mt-16 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="panel border border-line px-5 py-6">
              <div className="font-display text-2xl tracking-tight md:text-[1.75rem]">
                {s.value}
              </div>
              <div className="eyebrow mt-2">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
