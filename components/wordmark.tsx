import Image from "next/image";

/**
 * Wordmark: the automaton mark next to the name. The mark ships as a keyed
 * PNG (white on transparent) so it inherits the page's ground; light themes
 * invert it through the `.mark` hook.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
      style={{ lineHeight: 1 }}
    >
      <Image
        src="/mark.png"
        alt=""
        width={256}
        height={256}
        priority
        className="mark h-[1.4em] w-[1.4em] shrink-0"
      />
      <span
        className="font-display font-bold uppercase"
        style={{ fontSize: "1em", letterSpacing: "0.18em" }}
      >
        Automata
      </span>
    </span>
  );
}
