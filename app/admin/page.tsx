import type { Metadata } from "next";
import { AdminConsole } from "@/components/admin-console";

export const metadata: Metadata = {
  title: "Review",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div data-variant="steel" className="min-h-dvh bg-ink text-bone">
      <style>{`body{background:#050505}`}</style>
      <AdminConsole />
    </div>
  );
}
