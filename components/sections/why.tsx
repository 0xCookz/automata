import { AnnotatedFrame } from "@/components/annotated-frame";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { principles } from "@/lib/site";

export function Why() {
  return (
    <section id="why" className="scroll-mt-24 border-t border-line bg-ink-raised py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index="02"
          label="The technical bit"
          title={
            <>
              What your clips
              <br />
              actually train.
            </>
          }
          intro={
            <p>
              Almost all manipulation data on file was captured in a lab: clean bench,
              even light, one object at a time. Real kitchens are none of those things,
              and that gap is exactly where robots still fail.
            </p>
          }
          className="max-w-4xl"
        />

        <div className="mt-14 grid grid-cols-12 gap-y-12 lg:gap-x-12">
          <Reveal className="col-span-12 lg:col-span-5">
            <AnnotatedFrame />
          </Reveal>

          <div className="col-span-12 lg:col-span-7">
            <dl className="cardable-grid grid gap-px bg-line sm:grid-cols-2">
              {principles.map((p) => (
                <Reveal key={p.n} className="cardable bg-ink-raised p-6 md:p-8">
                  <dt className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-signal">
                      {p.n}
                    </span>
                    <span className="font-display text-xl leading-snug tracking-tight md:text-[1.375rem]">
                      {p.title}
                    </span>
                  </dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-bone-dim">
                    {p.body}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
