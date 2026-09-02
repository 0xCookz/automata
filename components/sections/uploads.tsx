"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { firstUpload, pay, site } from "@/lib/site";

type Paid = {
  task: string;
  seconds: number;
  amount: number;
  hash: string;
  paidAt: string;
  videoUrl: string;
};

const short = (h: string) => `${h.slice(0, 8)}…${h.slice(-6)}`;

export function Uploads() {
  const [clip, setClip] = useState<Paid | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/payouts")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { payouts?: Paid[] } | null) => {
        // the oldest paid clip is the first one anyone sent
        const first = d?.payouts?.length ? d.payouts[d.payouts.length - 1] : null;
        if (alive && first) setClip(first);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!clip) return null;

  const total = clip.amount + firstUpload.bonus;

  const rows: [string, string, string][] = [
    ["Standing rate", `${clip.amount.toFixed(2)} ${site.token}`, clip.hash],
    ["First-clip bonus", `${firstUpload.bonus.toFixed(2)} ${site.token}`, firstUpload.bonusHash],
  ];

  return (
    <section id="uploads" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHead
        index="01"
        label="Uploads"
        title={
          <>
            The first clip
            <br />
            anyone sent us.
          </>
        }
        intro={
          <p>
            Five seconds of a hand picking up a can. A person watched it, approved it, and
            the chain paid — the standing {pay.flat.toFixed(2)} {site.token} plus{" "}
            {firstUpload.bonus} for being first. Both transfers are below; open either one
            and check it yourself.
          </p>
        }
        className="max-w-3xl"
      />

      <div className="mt-14 grid grid-cols-12 gap-y-10 lg:gap-x-12">
        <Reveal className="col-span-12 lg:col-span-7">
          <figure className="panel panel-void overflow-hidden border border-line">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
              <span>Clip 001 · accepted</span>
              <span className="tnum">{clip.seconds}s</span>
            </div>

            <video
              src={clip.videoUrl}
              controls
              playsInline
              muted
              loop
              className="aspect-video w-full bg-black object-contain"
            />

            <figcaption className="border-t border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
              {clip.task}
            </figcaption>
          </figure>
        </Reveal>

        <div className="col-span-12 lg:col-span-5">
          <Reveal className="border-t border-line">
            <div className="flex items-baseline justify-between py-6">
              <span className="eyebrow">Paid for it</span>
              <span className="font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-none tnum">
                {total.toFixed(2)}
                <span className="ml-2 font-mono text-sm tracking-normal text-bone-faint">
                  {site.token}
                </span>
              </span>
            </div>
          </Reveal>

          <Reveal stagger={0.08}>
            {rows.map(([label, amount, hash]) => (
              <a
                key={hash}
                href={`${site.explorerTx}${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-t border-line py-5 transition-colors duration-200 hover:bg-ink-card"
              >
                <span>
                  <span className="block text-[0.9375rem] text-bone">{label}</span>
                  <span className="mt-1 block font-mono text-[11px] text-bone-faint">
                    {short(hash)}
                  </span>
                </span>
                <span className="flex items-center gap-3 whitespace-nowrap font-mono text-sm text-bone tnum">
                  {amount}
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden className="text-bone-faint transition-colors duration-200 group-hover:text-bone">
                    <path d="M1 8 8 1M3 1h5v5" stroke="currentColor" strokeWidth="1.1" />
                  </svg>
                </span>
              </a>
            ))}
          </Reveal>

          <Reveal className="border-t border-line pt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-bone-faint">
            The bonus was a one-off for the first upload. Every clip after it pays the
            standing {pay.flat.toFixed(2)} {site.token}.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
