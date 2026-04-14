import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dental Office Automation — Noell by Ops by Noell",
  description:
    "Stop losing new patients to voicemail. Noell helps dental offices respond faster, reduce no-shows, and support the front desk without adding more callback burden.",
};

export default function DentalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
