"use client";

import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

import {
  cbBrandedSplit,
  cbFunnelChart,
  cbMigration,
  cbQueries,
  cbTokenMigration,
} from "@/lib/cassino-data";
import { fmtCompact, fmtDecimal, fmtInt } from "@/lib/format";
import {
  axisStyle,
  ChartFrame,
  ChartTooltip,
  fmtThousands,
  palette,
} from "./chart-kit";

// ---------------------------------------------------------------------------
// 2. Top queries por cliques (barras horizontais)
// ---------------------------------------------------------------------------
export function CbQueriesChart() {
  const data = [...cbQueries].sort((a, b) => a.cliques - b.cliques);
  return (
    <ChartFrame height={360}>
      <ResponsiveContainer>
        <ComposedChart layout="vertical" data={data} margin={{ top: 6, right: 16, left: 8, bottom: 6 }}>
          <CartesianGrid horizontal={false} />
          <XAxis
            type="number"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => fmtCompact(v)}
          />
          <YAxis
            type="category"
            dataKey="query"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            width={104}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={<ChartTooltip formatters={{ cliques: fmtThousands }} />}
          />
          <Bar dataKey="cliques" name="Cliques" radius={[0, 5, 5, 0]} maxBarSize={22}>
            {data.map((row, i) => (
              <Cell key={i} fill={row.varCliquesNum < 0 ? palette.rose : palette.green} />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 2b. Branded vs Non-branded (atual vs anterior)
// ---------------------------------------------------------------------------
export function CbBrandedSplitChart() {
  return (
    <ChartFrame height={260}>
      <ResponsiveContainer>
        <ComposedChart data={cbBrandedSplit} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="tipo" tick={axisStyle} tickLine={false} axisLine={false} />
          <YAxis tick={axisStyle} tickLine={false} axisLine={false} tickFormatter={(v) => fmtCompact(v)} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={<ChartTooltip formatters={{ anterior: fmtThousands, atual: fmtThousands }} />}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Bar dataKey="anterior" name="Anterior" fill={palette.slate} radius={[5, 5, 0, 0]} maxBarSize={70} />
          <Bar dataKey="atual" name="Atual" fill={palette.green} radius={[5, 5, 0, 0]} maxBarSize={70} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 3. Migração de token: 'cassino pix' vs 'cassino bet' (atual vs anterior)
// ---------------------------------------------------------------------------
export function CbTokenMigrationChart() {
  return (
    <ChartFrame height={300}>
      <ResponsiveContainer>
        <ComposedChart data={cbTokenMigration} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="query" tick={axisStyle} tickLine={false} axisLine={false} />
          <YAxis tick={axisStyle} tickLine={false} axisLine={false} tickFormatter={(v) => fmtCompact(v)} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={<ChartTooltip formatters={{ anterior: fmtThousands, atual: fmtThousands }} />}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Bar dataKey="anterior" name="Semestre anterior" fill={palette.slate} radius={[5, 5, 0, 0]} maxBarSize={60} />
          <Bar dataKey="atual" name="Semestre atual" fill={palette.sky} radius={[5, 5, 0, 0]} maxBarSize={60} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 4. Migração de páginas: dispersão impressões × CTR (bolha = cliques)
// ---------------------------------------------------------------------------
export function CbMigrationScatter() {
  const data = cbMigration.filter((p) => p.impressoes !== null && p.ctr !== null);
  return (
    <ChartFrame height={360}>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 16, right: 24, left: 8, bottom: 16 }}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="impressoes"
            name="Impressões"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => fmtCompact(v)}
            label={{ value: "Impressões", position: "insideBottom", offset: -8, fill: "var(--muted)", fontSize: 11 }}
          />
          <YAxis
            type="number"
            dataKey="ctr"
            name="CTR"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
            label={{ value: "CTR", angle: -90, position: "insideLeft", fill: "var(--muted)", fontSize: 11 }}
          />
          <ZAxis type="number" dataKey="cliques" range={[80, 900]} name="Cliques" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload as (typeof data)[number];
              return (
                <div className="max-w-[260px] rounded-xl border border-border bg-surface-2/95 px-3 py-2 text-xs shadow-2xl backdrop-blur">
                  <p className="mb-1 break-all font-semibold text-foreground">{d.pagina}</p>
                  <p className="text-muted">Impressões: <span className="text-foreground">{fmtInt(d.impressoes ?? 0)}</span></p>
                  <p className="text-muted">CTR: <span className="text-foreground">{fmtDecimal(d.ctr ?? 0, 2)}%</span></p>
                  <p className="text-muted">Cliques: <span className="text-foreground">{fmtInt(d.cliques)}</span></p>
                </div>
              );
            }}
          />
          <Scatter data={data} name="Páginas">
            {data.map((row, i) => (
              <Cell key={i} fill={(row.ctr ?? 0) < 10 ? palette.rose : palette.green} fillOpacity={0.75} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 6. Funil GA4 — etapas principais (barras horizontais)
// ---------------------------------------------------------------------------
export function CbFunnelChart() {
  return (
    <ChartFrame height={300}>
      <ResponsiveContainer>
        <ComposedChart layout="vertical" data={cbFunnelChart} margin={{ top: 6, right: 24, left: 8, bottom: 6 }}>
          <CartesianGrid horizontal={false} />
          <XAxis
            type="number"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => fmtCompact(v)}
          />
          <YAxis
            type="category"
            dataKey="etapa"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            width={110}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={<ChartTooltip formatters={{ usuarios: fmtThousands }} />}
          />
          <Bar dataKey="usuarios" name="Usuários" radius={[0, 5, 5, 0]} maxBarSize={34}>
            {cbFunnelChart.map((_, i) => (
              <Cell key={i} fill={i === 0 ? palette.sky : palette.green} fillOpacity={1 - i * 0.13} />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
