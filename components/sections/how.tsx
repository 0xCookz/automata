import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { steps } from "@/lib/site";

export function How() {
  return (
    <section id="how" className="shell scroll-mt-24 py-24 md:py-32">
      <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              index="03"
              label="How it works"
              title={
                <>
                  Three steps, no
                  <br />
                  experience needed.
                </>
              }
              intro={
                <p>
                  If you can use a phone and you do chores, you already have everything
                  this requires — a phone, a wallet address, and an ordinary task.
                </p>
              }
            />
          </div>
        </div>

        <ol className="col-span-12 lg:col-span-8">
          {steps.map((s) => (
            <li key={s.n} className="cardable border-t border-line last:border-b">
              <Reveal className="grid grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-11">
                <div className="col-span-12 flex items-baseline gap-4 md:col-span-8 md:gap-6">
                  <span className="font-display text-3xl leading-none text-signal md:text-5xl">
                    {s.n}
                  </span>
                  <h3 className="font-display text-[1.5rem] tracking-tight md:text-[1.75rem]">
                    {s.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-3">
                  <p className="mt-2 max-w-[44ch] text-bone-dim">{s.body}</p>
                </div>
                <div className="col-span-12 mt-3 md:col-span-4 md:mt-0 md:text-right">
                  <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-bone-faint">
                    {s.aside}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
