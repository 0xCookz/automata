import { Reveal } from "@/components/motion";

/** Slim band: the app is being built, and the web recorder works meanwhile. */
export function AppSoon() {
  return (
    <section aria-label="Mobile app" className="border-y border-line">
      <Reveal className="shell flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-9">
        <div className="flex items-start gap-4 md:items-center">
          <span
            aria-hidden
            className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-signal md:mt-0"
          />
          <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-bone-dim">
            <span className="text-bone">The app is in build.</span> Record, check your take,
            submit and get paid without leaving the camera — the web recorder keeps working
            meanwhile.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-bone px-5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
            iOS
          </span>
          <span className="rounded-full bg-bone px-5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
            Android
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
            coming soon
          </span>
        </div>
      </Reveal>
    </section>
  );
}
