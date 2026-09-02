import { NextResponse } from "next/server";
import { dbConfigured, ensureSchema, corpusStats } from "@/lib/db";

export const revalidate = 30;

/** Real counters for the hero and the ledger. Zero until the first clip lands. */
export async function GET() {
  if (!dbConfigured()) {
    return NextResponse.json({ approved: 0, pending: 0, paid: 0 });
  }
  await ensureSchema();
  return NextResponse.json(await corpusStats());
}
