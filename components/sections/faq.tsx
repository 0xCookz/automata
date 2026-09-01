import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="shell scroll-mt-24 py-24 md:py-32">
      <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead index="05" label="Questions" title={<>Before you<br />ask.</>} />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <Reveal className="border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} name="faq" className="faq group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 md:py-7">
                  <h3 className="max-w-[36ch] font-display text-[1.125rem] leading-snug tracking-tight sm:text-xl md:text-[1.5rem]">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden
                    className="relative mt-2 block h-3 w-3 shrink-0 text-bone-dim transition-colors duration-200 group-open:text-signal"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <div className="faq-body">
                  <p className="max-w-[62ch] pb-7 pr-10 text-bone-dim">{f.a}</p>
                </div>
              </details>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
