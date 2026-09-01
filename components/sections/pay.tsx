"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { pay, payoutFor, site } from "@/lib/site";

const ticks = [5, 10, 15, 20, 25, 30];

export function Pay() {
  const [seconds, setSeconds] = useState(24);
  const amount = payoutFor(seconds);
  const progress = ((seconds - pay.min) / (pay.max - pay.min)) * 100;

  return (
    <section id="pay" className="scroll-mt-24 border-y border-line bg-ink-raised py-24 md:py-32">
      <div className="shell grid grid-cols-12 gap-y-12 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-5">
          <SectionHead
            index="04"
            label="What it pays"
            title={
              <>
                Longer clips
                <br />
                pay more.
              </>
            }
            intro={
              <p>
                A flat base plus a per-second rate, and nothing else. The figure below is
                the figure that settles — no platform cut taken afterwards, no gas billed
                back to you.
              </p>
            }
          />
        </div>

        <div className="col-span-12 lg:col-span-7">
          <Reveal className="border border-line bg-ink p-5 sm:p-6 md:p-10">
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="eyebrow">You would receive</div>
                <output
                  htmlFor="clip-length"
                  className="mt-3 block font-display text-[clamp(2.75rem,9vw,5rem)] leading-none tracking-[-0.03em] tnum"
                >
                  ${amount.toFixed(2)}
                </output>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
                  {site.token} · {site.chain}
                </div>
              </div>

              <div className="text-right">
                <div className="font-display text-4xl leading-none tnum md:text-5xl">
                  {seconds}
                  <span className="text-bone-faint">s</span>
                </div>
                <div className="eyebrow mt-2">clip length</div>
              </div>
            </div>

            <div className="mt-10">
              <label htmlFor="clip-length" className="sr-only">
                Clip length in seconds
              </label>
              <input
                id="clip-length"
                type="range"
                min={pay.min}
                max={pay.max}
                step={1}
                value={seconds}
                onChange={(e) => setSeconds(Number(e.target.value))}
                className="dial"
                style={{ ["--progress" as string]: `${progress}%` }}
                aria-valuetext={`${seconds} seconds, ${amount.toFixed(2)} ${site.token}`}
              />

              <div className="mt-4 flex justify-between font-mono text-[10px] tracking-[0.14em] text-bone-faint tnum">
                {ticks.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSeconds(t)}
                    className="min-h-11 flex-1 cursor-pointer transition-colors duration-200 first:text-left last:text-right hover:text-bone"
                    aria-label={`Set clip length to ${t} seconds`}
                  >
                    {t}s
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
              <span className="tnum">
                {pay.base.toFixed(2)} base + {pay.perSecond.toFixed(2)} × {seconds}s
              </span>
              <span>settles on approval</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
