"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The unit, as a camera feed rather than a toy: a still that drifts a few
 * pixels against the cursor so the panel reads as a live viewport.
 */
export function UnitViewport({
  src = "/unit.jpg",
  alt = "An Automata humanoid unit, hand raised mid-grasp.",
  className = "",
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      // -1..1 across the viewport, so the drift reads even off the panel
      tx = ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 2;
      ty = ((e.clientY - r.top - r.height / 2) / window.innerHeight) * 2;
    };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.transform = `translate3d(${(-cx * 14).toFixed(2)}px, ${(-cy * 10).toFixed(2)}px, 0) scale(1.06)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div ref={ref} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.06)" }}>
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" priority />
      </div>

      {/* the ground the unit stands on, and a soft vignette into the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 35%, transparent 40%, rgba(5,5,5,0.55) 100%)",
        }}
      />
    </div>
  );
}
