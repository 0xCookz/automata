import { Wordmark } from "@/components/wordmark";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="shell py-14 md:py-20">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <Wordmark className="h-4 w-auto text-bone" />
          <p className="mt-5 max-w-[34ch] text-sm text-bone-dim">
            A paid corpus of first-person footage, recorded by people who agreed to
            record it.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:gap-16">
          <nav aria-label="Footer">
            <h2 className="eyebrow">Sections</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-bone-dim transition-colors duration-200 hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Elsewhere</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={site.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-bone-dim transition-colors duration-200 hover:text-bone"
                >
                  {site.social.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>
          Paid in {site.token} on {site.chain}
        </span>
      </div>
    </footer>
  );
}
