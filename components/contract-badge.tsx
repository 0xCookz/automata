"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const { address, ticker } = site.contract;
const short = `${address.slice(0, 6)}…${address.slice(-4)}`;

/** The token address, copyable in one tap and checkable on the explorer. */
export function ContractBadge({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard blocked — the address is on screen, and the explorer link works
    }
  };

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.14em] ${className}`}
    >
      <span className="text-bone-faint">${ticker} contract</span>

      <button
        type="button"
        onClick={copy}
        title={address}
        aria-label={`Copy the ${ticker} contract address`}
        className="inline-flex cursor-pointer items-center gap-2 text-bone transition-colors duration-200 hover:text-signal"
      >
        <span className="hidden sm:inline">{address}</span>
        <span className="sm:hidden">{short}</span>
        <span className="text-bone-faint">{copied ? "copied" : "copy"}</span>
      </button>

      <a
        href={`${site.explorerToken}${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-bone-dim underline-offset-4 transition-colors duration-200 hover:text-bone hover:underline"
      >
        explorer ↗
      </a>
    </div>
  );
}
