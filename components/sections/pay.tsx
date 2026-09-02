"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { pay, payoutForClips, site } from "@/lib/site";

const marks = [1, 5, 10, 15, 20, 25];

export function Pay() {
  const [clips, setClips] = useState(5);
  const week = payoutForClips(clips);
  const progress = ((clips - 1) / (25 - 1)) * 100;

  return (
    <section id="pay" className="scroll-mt-24 border-y border-line bg-ink-raised py-24 md:py-32">
      <div className="shell grid grid-cols-12 gap-y-12 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-5">
          <SectionHead
            index="04"
            label="What it pays"
            title={
              <>
                One rate.
                <br />
                Every clip.
              </>
            }
            intro={
              <p>
                {pay.flat.toFixed(2)} {site.token} for every approved clip, whether it
                runs five seconds or thirty. No platform cut afterwards, no gas billed
                back to you, and nothing to pad — film the task, stop when it is done.
              </p>
            }
          />
        </div>

        <div className="col-span-12 lg:col-span-7">
          <Reveal className="panel border border-line bg-ink p-5 sm:p-6 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="eyebrow">Per approved clip</div>
                <div className="mt-3 font-display text-[clamp(3rem,9vw,5.5rem)] leading-none tracking-[-0.03em] tnum">
                  {pay.flat.toFixed(2)}
                  <span className="ml-3 align-baseline font-mono text-base tracking-normal text-bone-faint">
                    {site.token}
                  </span>
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
                  {pay.min}–{pay.max}s · flat rate · {site.chain}
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <label htmlFor="clip-count" className="eyebrow">
                    If you post
                  </label>
                  <div className="mt-2 font-display text-3xl tnum md:text-4xl">
                    {clips}
                    <span className="ml-2 text-base font-normal text-bone-dim">
                      {clips === 1 ? "clip a week" : "clips a week"}
                    </span>
                  </div>
                </div>

                <output htmlFor="clip-count" className="text-right">
                  <div className="eyebrow">You take home</div>
                  <div className="mt-2 font-display text-3xl tnum md:text-4xl">
                    {week.toFixed(2)}
                    <span className="ml-2 text-base font-normal text-bone-dim">
                      {site.token}
                    </span>
                  </div>
                </output>
              </div>

              <input
                id="clip-count"
                type="range"
                min={1}
                max={25}
                step={1}
                value={clips}
                onChange={(e) => setClips(Number(e.target.value))}
                className="dial mt-6"
                style={{ ["--progress" as string]: `${progress}%` }}
                aria-valuetext={`${clips} clips a week, ${week.toFixed(2)} ${site.token}`}
              />

              <div className="mt-2 flex justify-between font-mono text-[10px] tracking-[0.14em] text-bone-faint tnum">
                {marks.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setClips(m)}
                    className="min-h-11 flex-1 cursor-pointer transition-colors duration-200 first:text-left last:text-right hover:text-bone"
                    aria-label={`Set ${m} clips a week`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
              <span className="tnum">{clips} × {pay.flat.toFixed(2)} {site.token}</span>
              <span>paid per approval, not per week</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
