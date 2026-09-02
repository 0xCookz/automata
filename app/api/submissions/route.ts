import { NextResponse } from "next/server";
import { z } from "zod";
import { createSubmission, dbConfigured, ensureSchema } from "@/lib/db";
import { pay } from "@/lib/site";

const schema = z.object({
  wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "that is not a wallet address"),
  task: z.string().trim().min(3, "say what the clip shows").max(120),
  seconds: z.number().int().min(pay.min).max(pay.max),
  videoUrl: z.string().url(),
});

export async function POST(request: Request) {
  if (!dbConfigured()) {
    return NextResponse.json({ error: "submissions are not live yet" }, { status: 503 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "invalid submission" },
      { status: 400 },
    );
  }

  await ensureSchema();
  const row = await createSubmission(parsed.data);

  return NextResponse.json({ id: row.id, status: "pending" }, { status: 201 });
}
