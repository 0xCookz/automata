"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Mode = "plate" | "figure";

/**
 * The unit inside the hero panel.
 *
 * `plate` fills the panel with a still, like a camera feed.
 * `figure` floats a cut-out unit over the panel's own ground — a specimen
 * in a case. Either way it drifts a few pixels against the cursor so the
 * panel reads as live rather than as a stock image dropped in.
 */
export function UnitViewport({
  src = "/unit-figure.png",
  alt = "An Automata humanoid unit.",
  mode = "figure",
  className = "",
}: {
  src?: string;
  alt?: string;
  mode?: Mode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const depth = mode === "figure" ? 10 : 14;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 2;
      ty = ((e.clientY - r.top - r.height / 2) / window.innerHeight) * 2;
    };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const scale = mode === "figure" ? 1 : 1.06;
      el.style.transform = `translate3d(${(-cx * depth).toFixed(2)}px, ${(-cy * depth * 0.7).toFixed(2)}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  if (mode === "plate") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div ref={ref} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.06)" }}>
          <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" priority />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 35%, transparent 40%, rgba(5,5,5,0.55) 100%)" }}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* the light it stands in */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] h-[70%] w-[70%] -translate-x-1/2 rounded-full opacity-[0.16] blur-[60px]"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
      />

      <div ref={ref} className="absolute inset-x-0 bottom-0 top-[6%] will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 70vw, 34vw"
          className="object-contain object-bottom"
          priority
        />
      </div>

      {/* contact shadow, so it is standing rather than pasted */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[6%] left-1/2 h-6 w-[46%] -translate-x-1/2 rounded-[50%] blur-xl"
        style={{ background: "rgba(0,0,0,0.85)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 bottom-[7%] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(244,243,241,0.35), transparent)" }}
      />
    </div>
  );
}
