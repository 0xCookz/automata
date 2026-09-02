import "server-only";
import { neon } from "@neondatabase/serverless";

export type SubmissionStatus = "pending" | "approved" | "rejected";

export type Submission = {
  id: string;
  created_at: string;
  wallet: string;
  task: string;
  seconds: number;
  video_url: string;
  status: SubmissionStatus;
  review_note: string | null;
  tx_hash: string | null;
  amount: string | null;
  paid_at: string | null;
};

export const dbConfigured = () => Boolean(process.env.DATABASE_URL);

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

/** Idempotent — called before the first query in each route. */
export async function ensureSchema() {
  const q = sql();
  await q`
    CREATE TABLE IF NOT EXISTS submissions (
      id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at  timestamptz NOT NULL DEFAULT now(),
      wallet      text        NOT NULL,
      task        text        NOT NULL,
      seconds     integer     NOT NULL,
      video_url   text        NOT NULL,
      status      text        NOT NULL DEFAULT 'pending',
      review_note text,
      tx_hash     text,
      amount      numeric(12, 2),
      paid_at     timestamptz
    )`;
  await q`CREATE INDEX IF NOT EXISTS submissions_status_idx ON submissions (status, created_at DESC)`;
}

export async function createSubmission(input: {
  wallet: string;
  task: string;
  seconds: number;
  videoUrl: string;
}) {
  const q = sql();
  const rows = (await q`
    INSERT INTO submissions (wallet, task, seconds, video_url)
    VALUES (${input.wallet}, ${input.task}, ${input.seconds}, ${input.videoUrl})
    RETURNING id, created_at`) as { id: string; created_at: string }[];
  return rows[0];
}

export async function listSubmissions(status?: SubmissionStatus) {
  const q = sql();
  const rows = status
    ? await q`SELECT * FROM submissions WHERE status = ${status} ORDER BY created_at DESC LIMIT 100`
    : await q`SELECT * FROM submissions ORDER BY created_at DESC LIMIT 100`;
  return rows as unknown as Submission[];
}

export async function getSubmission(id: string) {
  const q = sql();
  const rows = (await q`SELECT * FROM submissions WHERE id = ${id}`) as unknown as Submission[];
  return rows[0] ?? null;
}

export async function markApproved(id: string, txHash: string, amount: number) {
  const q = sql();
  await q`
    UPDATE submissions
       SET status = 'approved', tx_hash = ${txHash}, amount = ${amount}, paid_at = now()
     WHERE id = ${id}`;
}

export async function markRejected(id: string, note: string) {
  const q = sql();
  await q`UPDATE submissions SET status = 'rejected', review_note = ${note} WHERE id = ${id}`;
}

/** Powers the public ledger. */
export async function listPaid(limit = 12) {
  const q = sql();
  const rows = (await q`
    SELECT task, seconds, amount, tx_hash, paid_at
      FROM submissions
     WHERE status = 'approved' AND tx_hash IS NOT NULL
     ORDER BY paid_at DESC
     LIMIT ${limit}`) as unknown as {
    task: string;
    seconds: number;
    amount: string;
    tx_hash: string;
    paid_at: string;
  }[];
  return rows;
}
