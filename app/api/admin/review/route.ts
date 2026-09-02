import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/admin";
import { ensureSchema, getSubmission, markApproved, markRejected } from "@/lib/db";
import { isWallet, payUsdg } from "@/lib/chain";
import { pay } from "@/lib/site";

const schema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("approve"), id: z.string().uuid() }),
  z.object({ action: z.literal("reject"), id: z.string().uuid(), note: z.string().trim().min(3).max(300) }),
]);

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "not signed in" }, { status: 401 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  await ensureSchema();
  const submission = await getSubmission(parsed.data.id);
  if (!submission) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (submission.status !== "pending") {
    return NextResponse.json({ error: `already ${submission.status}` }, { status: 409 });
  }

  if (parsed.data.action === "reject") {
    await markRejected(submission.id, parsed.data.note);
    return NextResponse.json({ ok: true, status: "rejected" });
  }

  if (!isWallet(submission.wallet)) {
    return NextResponse.json({ error: "stored wallet is malformed" }, { status: 422 });
  }

  try {
    // pay first, then record — a paid clip that failed to save is recoverable
    // from the chain, an unpaid clip marked approved is not
    const hash = await payUsdg(submission.wallet, pay.flat);
    await markApproved(submission.id, hash, pay.flat);
    return NextResponse.json({ ok: true, status: "approved", hash });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "payout failed" },
      { status: 502 },
    );
  }
}
