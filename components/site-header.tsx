"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "@/components/wordmark";

export function SiteHeader() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        stuck
          ? "border-b border-line bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <Wordmark className="h-[18px] w-auto text-bone transition-colors group-hover:text-signal" />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-dim transition-colors duration-200 hover:text-bone"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#record"
            className="hidden h-9 items-center border border-bone/25 px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-bone transition-colors duration-200 hover:border-signal hover:bg-signal hover:text-ink sm:inline-flex"
          >
            Record a clip
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center border border-line text-bone md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet — full-height, large tap targets, its own rhythm */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-16 z-40 origin-top border-y border-line bg-ink transition-[opacity,transform] duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        style={{ height: open ? "calc(100dvh - 4rem)" : undefined }}
      >
        <nav className="shell flex h-full flex-col justify-between py-10" aria-label="Mobile">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-line-soft">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-5"
                >
                  <span className="font-mono text-[11px] text-bone-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-3xl">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#record"
            onClick={() => setOpen(false)}
            className="flex h-14 items-center justify-center bg-signal font-mono text-xs uppercase tracking-[0.16em] text-ink"
          >
            Record a clip
          </a>
        </nav>
      </div>
    </header>
  );
}
