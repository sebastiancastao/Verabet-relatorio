import { Kpi } from "@/lib/data";

const accentMap: Record<NonNullable<Kpi["accent"]>, string> = {
  green: "from-[#4cc2cc]/25 to-[#4cc2cc]/0 text-[#7fd6dd] ring-[#4cc2cc]/30",
  blue: "from-[#2a93cf]/25 to-[#2a93cf]/0 text-[#7cc0e8] ring-[#2a93cf]/30",
  amber: "from-amber-500/20 to-amber-500/0 text-amber-300 ring-amber-500/30",
  violet: "from-[#6f86c9]/25 to-[#6f86c9]/0 text-[#aab7e2] ring-[#6f86c9]/30",
};

function TrendIcon({ trend }: { trend: Kpi["trend"] }) {
  if (trend === "up") {
    return (
      <span className="text-[#4cc2cc]" aria-hidden>
        ▲
      </span>
    );
  }
  if (trend === "down") {
    return (
      <span className="text-rose-400" aria-hidden>
        ▼
      </span>
    );
  }
  return null;
}

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const accent = accentMap[kpi.accent ?? "green"];
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-5 ring-1 ring-inset ${accent.split(" ").pop()} transition-transform duration-200 hover:-translate-y-0.5`}
    >
      <div
        className={`pointer-events-none absolute -right-6 -top-10 h-32 w-32 rounded-full bg-gradient-to-b ${accent} blur-2xl opacity-60`}
      />
      <p className="relative text-xs font-medium uppercase tracking-wider text-muted">
        {kpi.label}
      </p>
      <div className="relative mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-foreground tabular-nums">
          {kpi.value}
        </span>
        <TrendIcon trend={kpi.trend} />
      </div>
      {kpi.sub && (
        <p className="relative mt-1.5 text-xs leading-relaxed text-muted">
          {kpi.sub}
        </p>
      )}
    </div>
  );
}
