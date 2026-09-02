import { Fragment } from "react";
import { ContractBadge } from "@/components/contract-badge";
import { MaskLines, Reveal } from "@/components/motion";
import { site } from "@/lib/site";

export function Cta() {
  return (
    <section
      id="record"
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-ink-raised py-24 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[110px]"
        style={{ background: "radial-gradient(circle, #ff4a1c 0%, transparent 65%)" }}
      />

      <div className="shell relative text-center">
        <Reveal className="eyebrow">Corpus 001 · open for submissions</Reveal>

        <MaskLines
          as="h2"
          className="mx-auto mt-8 max-w-[18ch] font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.03em]"
          lines={[
            <Fragment key="a">Thirty seconds of</Fragment>,
            <Fragment key="b">
              your <em className="font-normal italic text-signal">ordinary</em> day
            </Fragment>,
            <Fragment key="c">is worth something.</Fragment>,
          ]}
        />

        <Reveal delay={0.3} className="mx-auto mt-8 max-w-[46ch] text-bone-dim">
          <p>
            Film it, send it, get paid in {site.token}. No application, no equipment, no
            robotics knowledge — a phone and a wallet address is the whole list.
          </p>
        </Reveal>

        <Reveal delay={0.4} className="mt-11">
          <a
            href="#top"
            data-cta="record"
            className="group inline-flex h-14 w-full items-center justify-center gap-3 bg-signal px-9 sm:w-auto font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:bg-bone"
          >
            Record your first clip
            <svg width="15" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path
                d="M0 5h12M8.5 1 12.5 5l-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                className="transition-transform duration-300 group-hover:translate-x-[3px]"
              />
            </svg>
          </a>
        </Reveal>

        <Reveal delay={0.5} className="mt-10 flex justify-center">
          <ContractBadge />
        </Reveal>
      </div>
    </section>
  );
}
