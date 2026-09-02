import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "automata_admin";

const token = () => {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return null;
  return createHash("sha256").update(`automata:${secret}`).digest("hex");
};

export function checkPassword(candidate: string) {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function sessionToken() {
  return token();
}

export async function isAdmin() {
  const expected = token();
  if (!expected) return false;
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === expected;
}
