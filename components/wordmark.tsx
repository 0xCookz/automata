/**
 * Typeset wordmark. Drawn as text in the display face so it stays crisp at
 * any size and needs no image request.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      style={{ lineHeight: 1 }}
    >
      <svg
        viewBox="0 0 16 16"
        className="h-[0.95em] w-[0.95em] shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        aria-hidden="true"
      >
        <rect x="0.45" y="0.45" width="15.1" height="15.1" />
        <circle cx="8" cy="8" r="6.1" />
        <path d="M8 0.45v3.1M8 12.45v3.1M0.45 8h3.1M12.45 8h3.1" />
      </svg>
      <span
        className="font-display font-bold uppercase"
        style={{ fontSize: "1em", letterSpacing: "0.18em" }}
      >
        Automata
      </span>
    </span>
  );
}
