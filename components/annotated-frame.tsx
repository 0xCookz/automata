import Image from "next/image";

/**
 * A single still from a submitted clip, marked up the way the reviewer sees it.
 * The overlay is drawn, not baked into the image, so it stays sharp and legible
 * at every size and can be re-labelled without a new render.
 */
export function AnnotatedFrame() {
  return (
    <figure className="panel relative border border-line bg-ink-raised">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src="/pov.jpg"
          alt="First-person view of two hands lifting a mug from a cluttered kitchen counter."
          fill
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover opacity-90"
          priority={false}
        />

        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <g stroke="#ff4a1c" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke">
            <rect x="148" y="96" width="118" height="104" />
            <path d="M148 96h-14M266 96h14M148 200h-14M266 200h14" />
          </g>
          <g stroke="#ece7de" strokeOpacity="0.5" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke">
            <rect x="52" y="150" width="72" height="86" strokeDasharray="3 4" />
          </g>
        </svg>

        {/* labels sit in the DOM so their type stays at real pixel sizes */}
        <span className="absolute left-[37%] top-[27%] -translate-y-full bg-signal px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink">
          grasp · 00:07
        </span>
        <span className="absolute bottom-[18%] left-[13%] font-mono text-[9px] uppercase tracking-[0.14em] text-bone/70">
          occluded
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/90 to-transparent px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/70">
          <span>clip 0412 · 24s · accepted</span>
          <span className="tnum">1080p · 60fps</span>
        </div>
      </div>

      <figcaption className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
        <span>What the model is given</span>
        <span className="text-signal">reviewed by hand</span>
      </figcaption>
    </figure>
  );
}
