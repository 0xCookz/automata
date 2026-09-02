"use client";

import { useCallback, useEffect, useState } from "react";
import { explorerTx } from "@/lib/chain-links";
import { pay, site } from "@/lib/site";

type Submission = {
  id: string;
  created_at: string;
  wallet: string;
  task: string;
  seconds: number;
  video_url: string;
  status: "pending" | "approved" | "rejected";
  review_note: string | null;
  tx_hash: string | null;
};

type Treasury = { address: string; usdg: number } | null;

export function AdminConsole() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Submission[]>([]);
  const [treasury, setTreasury] = useState<Treasury>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/list", { cache: "no-store" });
    if (res.status === 401) {
      setAuthed(false);
      setReady(true);
      return;
    }
    const data = (await res.json()) as { submissions?: Submission[]; treasury?: Treasury; error?: string };
    if (data.error) setError(data.error);
    setRows(data.submissions ?? []);
    setTreasury(data.treasury ?? null);
    setAuthed(true);
    setReady(true);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const signIn = async () => {
    setError(null);
    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) return setError(((await res.json()) as { error?: string }).error ?? "sign in failed");
    setPassword("");
    await load();
  };

  const review = async (id: string, action: "approve" | "reject") => {
    const note = action === "reject" ? window.prompt("Why is it rejected? The person is told verbatim.") : null;
    if (action === "reject" && !note) return;

    setBusy(id);
    setError(null);
    const res = await fetch("/api/admin/review", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(action === "approve" ? { action, id } : { action, id, note }),
    });
    if (!res.ok) setError(((await res.json()) as { error?: string }).error ?? "failed");
    setBusy(null);
    await load();
  };

  if (!ready) return null;

  if (!authed) {
    return (
      <div className="grid min-h-dvh place-items-center px-6">
        <div className="panel w-full max-w-sm border border-line p-8">
          <div className="eyebrow">Automata · review</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && signIn()}
            placeholder="Password"
            className="mt-6 h-12 w-full rounded-xl border border-line bg-ink px-4 text-sm outline-none focus:border-bone/30"
          />
          <button
            type="button"
            onClick={signIn}
            className="mt-4 h-12 w-full rounded-xl bg-bone text-sm font-medium text-ink"
          >
            Sign in
          </button>
          {error ? <p className="mt-4 text-sm text-signal">{error}</p> : null}
        </div>
      </div>
    );
  }

  const pending = rows.filter((r) => r.status === "pending");
  const done = rows.filter((r) => r.status !== "pending");

  return (
    <div className="shell py-12">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
        <div>
          <div className="eyebrow">Review queue</div>
          <h1 className="mt-2 font-display text-3xl">{pending.length} waiting</h1>
        </div>
        <div className="text-right font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
          {treasury ? (
            <>
              <div className="tnum text-bone">{treasury.usdg.toFixed(2)} {site.token} in the payout wallet</div>
              <div className="mt-1">{treasury.address}</div>
            </>
          ) : (
            <div>payout wallet unavailable</div>
          )}
        </div>
      </header>

      {error ? <p className="mt-6 text-sm text-signal">{error}</p> : null}

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pending.map((row) => (
          <article key={row.id} className="panel border border-line">
            <video src={row.video_url} controls playsInline className="aspect-[4/3] w-full bg-black object-contain" />
            <div className="p-5">
              <h2 className="text-[0.9375rem] text-bone">{row.task}</h2>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
                {row.seconds}s · {new Date(row.created_at).toLocaleString()}
              </div>
              <div className="mt-1 break-all font-mono text-[10px] text-bone-faint">{row.wallet}</div>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  disabled={busy === row.id}
                  onClick={() => review(row.id, "approve")}
                  className="h-11 flex-1 rounded-lg bg-bone text-xs font-medium text-ink disabled:opacity-40"
                >
                  {busy === row.id ? "Paying…" : `Approve · ${pay.flat.toFixed(2)}`}
                </button>
                <button
                  type="button"
                  disabled={busy === row.id}
                  onClick={() => review(row.id, "reject")}
                  className="h-11 flex-1 rounded-lg border border-line text-xs font-medium text-bone-dim disabled:opacity-40"
                >
                  Reject
                </button>
              </div>
            </div>
          </article>
        ))}
        {pending.length === 0 ? (
          <p className="text-bone-dim">Nothing waiting. The queue is clear.</p>
        ) : null}
      </div>

      {done.length ? (
        <section className="mt-14">
          <h2 className="eyebrow">Decided</h2>
          <table className="mt-4 w-full border-collapse text-left text-sm">
            <tbody>
              {done.map((row) => (
                <tr key={row.id} className="border-b border-line">
                  <td className="py-3 pr-4">{row.task}</td>
                  <td className="py-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
                    {row.status}
                  </td>
                  <td className="py-3 pr-4 font-mono text-[11px] text-bone-faint">
                    {row.tx_hash ? (
                      <a
                        href={explorerTx(row.tx_hash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:text-bone hover:underline"
                      >
                        {row.tx_hash.slice(0, 10)}…
                      </a>
                    ) : (
                      row.review_note
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}
    </div>
  );
}
