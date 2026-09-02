import { NextResponse } from "next/server";
import { dbConfigured, ensureSchema, listPaid } from "@/lib/db";

export const revalidate = 30;

/** Public feed behind the ledger. Empty until the first clip is paid. */
export async function GET() {
  if (!dbConfigured()) return NextResponse.json({ payouts: [] });

  await ensureSchema();
  const rows = await listPaid(12);

  return NextResponse.json({
    payouts: rows.map((r) => ({
      task: r.task,
      seconds: r.seconds,
      amount: Number(r.amount),
      hash: r.tx_hash,
      paidAt: r.paid_at,
      videoUrl: r.video_url,
    })),
  });
}
