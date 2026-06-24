"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const reports = [
  { href: "/", label: "VeraBet" },
  { href: "/cassino-bet", label: "Cassino Bet" },
];

export function BrandSwitcher() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-surface-2/60 p-1">
      {reports.map((r) => {
        const active = pathname === r.href;
        return (
          <Link
            key={r.href}
            href={r.href}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              active
                ? "bg-accent/15 text-accent ring-1 ring-inset ring-accent/30"
                : "text-muted hover:text-foreground"
            }`}
          >
            {r.label}
          </Link>
        );
      })}
    </div>
  );
}
