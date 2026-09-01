import Link from "next/link";

const options = [
  { href: "/tech", label: "D · instrument" },
  { href: "/bento", label: "E · bento" },
  { href: "/monolith", label: "F · monolith" },
  { href: "/aurora", label: "G · aurora" },
  { href: "/", label: "00 · archive" },
];

/** Temporary chooser so the four directions can be compared side by side. */
export function VariantSwitch({ current }: { current: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4">
      <nav
        aria-label="Design directions"
        className="pointer-events-auto flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/12 bg-[#0b0b0d]/92 p-1 backdrop-blur-md"
      >
        {options.map((o) => (
          <Link
            key={o.href}
            href={o.href}
            className={`whitespace-nowrap rounded-full px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 ${
              current === o.href
                ? "bg-white text-[#0b0b0d]"
                : "text-white/55 hover:text-white"
            }`}
          >
            {o.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
