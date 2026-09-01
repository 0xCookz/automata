import { Reveal } from "@/components/motion";
import type { ReactNode } from "react";

export function SectionHead({
  index,
  label,
  title,
  intro,
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal className="eyebrow flex items-center gap-3">
        <span className="text-signal">{index}</span>
        <span className="h-px w-8 bg-line" />
        {label}
      </Reveal>
      <Reveal
        delay={0.05}
        as="h2"
        className="mt-6 max-w-[18ch] font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.04] tracking-[-0.025em]"
      >
        {title}
      </Reveal>
      {intro ? (
        <Reveal delay={0.1} className="mt-6 max-w-[42ch] text-bone-dim">
          {intro}
        </Reveal>
      ) : null}
    </div>
  );
}
