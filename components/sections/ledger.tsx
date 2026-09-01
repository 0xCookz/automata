"use client";

import { CountUp, Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { payouts, site } from "@/lib/site";

const short = (h: string) => `${h.slice(0, 6)}…${h.slice(-4)}`;
const total = payouts.reduce((sum, p) => sum + p.amount, 0);

export function Ledger() {
  return (
    <section id="ledger" className="shell scroll-mt-24 py-24 md:py-36">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHead
          index="03"
          label="Paid out"
          title={
            <>
              Every payment is
              <br />
              a public record.
            </>
          }
        />

        <Reveal delay={0.1} className="text-right">
          <div className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-tight">
            <CountUp to={total} prefix="$" decimals={2} className="tnum" />
          </div>
          <div className="eyebrow mt-2">
            paid across {payouts.length} clips · settled in {site.token}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-12 border-t border-line">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Recent clip payments, with a link to each transaction on the {site.chain} explorer.
          </caption>
          <thead>
            <tr className="hidden md:table-row">
              {["Clip", "Length", "Paid", "Transaction", ""].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="border-b border-line py-3 font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-bone-faint last:text-right"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr
                key={p.hash}
                className="group block border-b border-line py-5 transition-colors duration-200 hover:bg-ink-card md:table-row md:py-0"
              >
                <td className="block pr-6 md:table-cell md:py-5">
                  <span className="text-[0.9375rem] text-bone">{p.task}</span>
                  <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint md:hidden">
                    {p.seconds}s
                  </span>
                </td>
                <td className="hidden font-mono text-xs text-bone-dim tnum md:table-cell md:py-5">
                  {p.seconds}s
                </td>
                <td className="mt-1 block font-mono text-sm text-bone tnum md:table-cell md:py-5">
                  ${p.amount.toFixed(2)}
                </td>
                <td className="mt-1 block font-mono text-xs text-bone-faint md:table-cell md:py-5">
                  <span className="transition-colors duration-200 group-hover:text-bone-dim">
                    {short(p.hash)}
                  </span>
                  <span className="ml-3 text-bone-faint/70">{p.when}</span>
                </td>
                <td className="mt-2 block md:table-cell md:py-5 md:text-right">
                  <a
                    href={`${site.explorerTx}${p.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim underline-offset-4 transition-colors duration-200 hover:text-signal hover:underline"
                  >
                    Verify
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
                      <path d="M1 8 8 1M3 1h5v5" stroke="currentColor" strokeWidth="1.1" />
                    </svg>
                    <span className="sr-only">
                      transaction {short(p.hash)} on the {site.chain} explorer
                    </span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Reveal delay={0.05} className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
        Transactions are public on {site.chain}. We never publish who filmed what.
      </Reveal>
    </section>
  );
}
