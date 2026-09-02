import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { dbConfigured, ensureSchema, listSubmissions } from "@/lib/db";
import { payoutBalance } from "@/lib/chain";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "not signed in" }, { status: 401 });
  if (!dbConfigured()) return NextResponse.json({ error: "database is not configured" }, { status: 503 });

  await ensureSchema();
  const submissions = await listSubmissions();

  let treasury: { address: string; usdg: number } | null = null;
  try {
    treasury = await payoutBalance();
  } catch {
    // no payout key set, or the RPC is unreachable — the queue still loads
  }

  return NextResponse.json({ submissions, treasury });
}
