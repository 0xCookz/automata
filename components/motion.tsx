"use client";

import {
  useEffect,
  useRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Polymorphic tag that still accepts a ref (React 19 passes ref as a prop). */
type Poly = (props: HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }) => ReactNode;

let registered = false;
function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Quiet entrance: a short rise with a long ease. No bounce, no scale. */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 18,
  stagger,
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  /** When set, direct children are staggered instead of the wrapper. */
  stagger?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    ensureGsap();

    if (prefersReduced()) {
      el.setAttribute("data-reveal-ready", "");
      return;
    }

    const targets =
      stagger !== undefined ? Array.from(el.children) : [el];

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 1 });
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay,
          ease: "expo.out",
          stagger: stagger ?? 0,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, stagger]);

  const Comp = Tag as unknown as Poly;

  return (
    <Comp ref={ref} id={id} data-reveal className={className}>
      {children}
    </Comp>
  );
}

/** Headline lines rise out of their own clipping box, one after another. */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    ensureGsap();

    const inner = el.querySelectorAll<HTMLElement>("[data-line-inner]");

    if (prefersReduced()) {
      gsap.set(el, { opacity: 1 });
      gsap.set(inner, { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 1 });
      gsap.fromTo(
        inner,
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 1.05,
          delay,
          ease: "expo.out",
          stagger: 0.075,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  const Comp = Tag as unknown as Poly;

  return (
    <Comp ref={ref} data-reveal className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden ${lineClassName ?? ""}`}>
          <span data-line-inner className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Comp>
  );
}

/** A hairline that draws itself in from the left. */
export function DrawRule({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    ensureGsap();
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={`h-px w-full origin-left bg-line ${className}`}
      style={{ transform: "scaleX(1)" }}
    />
  );
}

/** Tabular figure that counts up when it first enters view. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    ensureGsap();

    const write = (v: number) => {
      el.textContent =
        prefix +
        v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        suffix;
    };

    if (prefersReduced()) {
      write(to);
      return;
    }

    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: to,
        duration: 1.6,
        ease: "expo.out",
        onUpdate: () => write(obj.v),
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [to, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
