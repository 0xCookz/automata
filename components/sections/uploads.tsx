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

function TxLine({ label, amount, hash }: { label: string; amount: string; hash: string }) {
  return (
    <a
      href={`${site.explorerTx}${hash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 border-t border-line py-3.5 transition-colors duration-200 hover:bg-ink-card"
    >
      <span>
        <span className="block text-[0.875rem] text-bone">{label}</span>
        <span className="mt-0.5 block font-mono text-[10px] text-bone-faint">{short(hash)}</span>
      </span>
      <span className="flex items-center gap-2.5 whitespace-nowrap font-mono text-sm text-bone tnum">
        {amount}
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden className="text-bone-faint transition-colors duration-200 group-hover:text-bone">
          <path d="M1 8 8 1M3 1h5v5" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      </span>
    </a>
  );
}

export function Uploads() {
  const [clips, setClips] = useState<Paid[]>([]);

  useEffect(() => {
    let alive = true;
    fetch("/api/payouts")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { payouts?: Paid[] } | null) => {
        if (alive && d?.payouts?.length) setClips(d.payouts);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!clips.length) return null;

  // the oldest paid clip is the first anyone sent, and the only one with a bonus
  const firstHash = clips[clips.length - 1].hash;
  const total = clips.reduce((sum, c) => sum + c.amount, 0) + firstUpload.bonus;

  return (
    <section id="uploads" className="shell scroll-mt-24 py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-y-8">
        <SectionHead
          index="01"
          label="Uploads"
          title={
            <>
              The clips we
              <br />
              have accepted.
            </>
          }
          intro={
            <p>
              Every one that passed review, with the transaction that paid for it. The
              standing rate is {pay.flat.toFixed(2)} {site.token} a clip; the first upload
              also took a {firstUpload.bonus} kick-off bonus.
            </p>
          }
        />

        <Reveal delay={0.1} className="w-full text-left md:w-auto md:text-right">
          <div className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-tight tnum">
            {total.toFixed(2)}
            <span className="ml-3 font-mono text-base tracking-normal text-bone-faint">
              {site.token}
            </span>
          </div>
          <div className="eyebrow mt-2">
            paid across {clips.length} {clips.length === 1 ? "clip" : "clips"}
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
        {clips.map((clip, i) => (
          <Reveal key={clip.hash}>
            <figure className="panel panel-void overflow-hidden border border-line">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
                <span>
                  Clip {String(clips.length - i).padStart(3, "0")} · accepted
                </span>
                <span className="tnum">{clip.seconds}s</span>
              </div>

              <video
                src={clip.videoUrl}
                controls
                playsInline
                muted
                loop
                preload="metadata"
                className="aspect-video w-full bg-black object-contain"
              />

              <figcaption className="border-t border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
                {clip.task}
              </figcaption>
            </figure>

            <div className="mt-2">
              <TxLine
                label="Standing rate"
                amount={`${clip.amount.toFixed(2)} ${site.token}`}
                hash={clip.hash}
              />
              {clip.hash === firstHash ? (
                <TxLine
                  label="First-clip bonus"
                  amount={`${firstUpload.bonus.toFixed(2)} ${site.token}`}
                  hash={firstUpload.bonusHash}
                />
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
