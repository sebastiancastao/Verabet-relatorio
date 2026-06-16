"use client";

import { useEffect, useRef, useState } from "react";

import { fmtDecimal, fmtInt } from "@/lib/format";

// SeoLab brand palette (logo: teal #50b8c0, blue #006098, slate #384868).
// `green`/`sky`/`violet` keys are kept for call sites but now carry brand hues;
// amber/rose stay for semantic meaning (warnings / negatives).
export const palette = {
  green: "#4cc2cc", // teal (primary)
  sky: "#2a93cf", // blue (secondary)
  violet: "#6f86c9", // indigo-blue (stays in family)
  amber: "#fbbf24",
  rose: "#fb7185",
  slate: "#5d6f8e", // brand slate, lightened for dark UI
  emeraldSoft: "#3aa9b3",
};

export const pieColors = [
  "#fb7185", // crawled not indexed (destaque)
  "#2a93cf",
  "#fbbf24",
  "#6f86c9",
  "#4cc2cc",
  "#0079bd",
  "#94a3b8",
  "#22c5cf",
  "#5d6f8e",
];

type Formatter = (v: number) => string;

type TooltipPayloadItem = {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string | number;
};

export function ChartTooltip({
  active,
  payload,
  label,
  formatters,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
  formatters?: Record<string, Formatter>;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-border bg-surface-2/95 px-3 py-2 text-xs shadow-2xl backdrop-blur">
      {label !== undefined && label !== "" && (
        <p className="mb-1.5 font-semibold text-foreground">{label}</p>
      )}
      <div className="space-y-1">
        {payload.map((item, i) => {
          const key = String(item.dataKey ?? item.name ?? i);
          const fmt = formatters?.[key];
          const raw = typeof item.value === "number" ? item.value : Number(item.value);
          const display = fmt
            ? fmt(raw)
            : Number.isFinite(raw)
            ? fmtInt(raw)
            : String(item.value);
          return (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-muted">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ background: item.color }}
                />
                {item.name}
              </span>
              <span className="font-semibold tabular-nums text-foreground">
                {display}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const fmtMillions: Formatter = (v) => fmtDecimal(v / 1_000_000, 2) + " M";
export const fmtThousands: Formatter = (v) => fmtInt(v);
export const fmtPctTip: Formatter = (v) => fmtDecimal(v, 2) + "%";
export const fmtPos: Formatter = (v) => fmtDecimal(v, 2);

export const axisStyle = {
  fontSize: 11,
  fill: "var(--muted)",
};

export function ChartFrame({
  height = 300,
  children,
}: {
  height?: number;
  children: React.ReactNode;
}) {
  // recharts' ResponsiveContainer logs "width(-1)/height(-1)" whenever it tries
  // to measure a container that has no layout yet (during SSR/prerender and on
  // the very first client paint). We mount the chart only after the wrapper has
  // a real measured width, so ResponsiveContainer always reads a size > 0. The
  // wrapper keeps its height reserved, so there is no layout shift.
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      if (el.clientWidth > 0) setReady(true);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", height }} className="text-muted">
      {ready ? (
        children
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="h-6 w-6 animate-pulse rounded-full bg-border" />
        </div>
      )}
    </div>
  );
}
