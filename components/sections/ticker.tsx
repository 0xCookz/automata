import { tasks } from "@/lib/site";

/** Endless line of accepted tasks. CSS-only, so it costs nothing to run. */
export function Ticker() {
  const row = [...tasks, ...tasks];

  return (
    <section aria-label="Accepted tasks" className="mt-20 border-y border-line py-4 md:mt-28">
      <div className="marquee">
        <div className="marquee-track">
          {row.map((t, i) => (
            <span key={`${t}-${i}`} className="marquee-item">
              <span className="text-bone-faint">{String((i % tasks.length) + 1).padStart(3, "0")}</span>
              <span className="text-bone-dim">{t}</span>
              <span aria-hidden className="inline-block h-1 w-1 bg-signal" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
