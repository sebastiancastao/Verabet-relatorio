"use client";

import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

import {
  brandQueries,
  dailyRate,
  esportesChart,
  indexing,
  nonIndexedComposition,
  pages,
  projection,
  q1Monthly,
  q1Reference,
  q2Monthly,
  rollingWindows,
  signups,
} from "@/lib/data";
import { fmtCompact, fmtDecimal, fmtInt } from "@/lib/format";
import {
  axisStyle,
  ChartFrame,
  ChartTooltip,
  fmtPctTip,
  fmtPos,
  fmtThousands,
  palette,
  pieColors,
} from "./chart-kit";

// ---------------------------------------------------------------------------
// 1. Q1 — cliques & impressões (barras) + CTR (linha, eixo secundário)
// ---------------------------------------------------------------------------
export function Q1MonthlyChart() {
  return (
    <ChartFrame height={320}>
      <ResponsiveContainer>
        <ComposedChart data={q1Monthly} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="mes" tick={axisStyle} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => fmtCompact(v)}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[60, 80]}
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={
              <ChartTooltip
                formatters={{ cliques: fmtThousands, impressoes: fmtThousands, ctr: fmtPctTip }}
              />
            }
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Bar yAxisId="left" dataKey="cliques" name="Cliques" fill={palette.green} radius={[5, 5, 0, 0]} maxBarSize={46} />
          <Bar yAxisId="left" dataKey="impressoes" name="Impressões" fill={palette.sky} radius={[5, 5, 0, 0]} maxBarSize={46} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="ctr"
            name="CTR"
            stroke={palette.amber}
            strokeWidth={2.5}
            dot={{ r: 4, fill: palette.amber }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 2. Q2 — reconstrução mensal (barras; junho projetado em destaque)
// ---------------------------------------------------------------------------
export function Q2MonthlyChart() {
  return (
    <ChartFrame height={300}>
      <ResponsiveContainer>
        <ComposedChart data={q2Monthly} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="mes" tick={axisStyle} tickLine={false} axisLine={false} interval={0} />
          <YAxis tick={axisStyle} tickLine={false} axisLine={false} tickFormatter={(v) => fmtCompact(v)} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={<ChartTooltip formatters={{ cliques: fmtThousands }} />}
          />
          <Bar dataKey="cliques" name="Cliques" radius={[5, 5, 0, 0]} maxBarSize={70}>
            {q2Monthly.map((row, i) => (
              <Cell
                key={i}
                fill={row.projetado ? "transparent" : palette.green}
                stroke={row.projetado ? palette.green : undefined}
                strokeDasharray={row.projetado ? "5 4" : undefined}
                strokeWidth={row.projetado ? 2 : 0}
              />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 3. Ritmo diário Q1 vs Q2 (barras horizontais)
// ---------------------------------------------------------------------------
export function DailyRateChart() {
  return (
    <ChartFrame height={170}>
      <ResponsiveContainer>
        <ComposedChart
          layout="vertical"
          data={dailyRate}
          margin={{ top: 6, right: 56, left: 8, bottom: 6 }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 75000]}
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => fmtCompact(v)}
          />
          <YAxis
            type="category"
            dataKey="periodo"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            width={120}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={<ChartTooltip formatters={{ ritmo: (v) => `${fmtInt(v)} / dia` }} />}
          />
          <Bar dataKey="ritmo" name="Ritmo diário" radius={[0, 6, 6, 0]} maxBarSize={36}>
            {dailyRate.map((_, i) => (
              <Cell key={i} fill={i === 0 ? palette.slate : palette.green} />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 4. Janelas móveis — cliques por janela
// ---------------------------------------------------------------------------
export function RollingWindowsChart() {
  return (
    <ChartFrame height={280}>
      <ResponsiveContainer>
        <ComposedChart data={rollingWindows} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="periodo" tick={axisStyle} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => fmtCompact(v)}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[1, 1.4]}
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => fmtDecimal(v, 2)}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={
              <ChartTooltip
                formatters={{ cliques: fmtThousands, impressoes: fmtThousands, posicao: fmtPos }}
              />
            }
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Bar yAxisId="left" dataKey="cliques" name="Cliques" fill={palette.green} radius={[5, 5, 0, 0]} maxBarSize={56} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="posicao"
            name="Posição média"
            stroke={palette.violet}
            strokeWidth={2.5}
            dot={{ r: 4, fill: palette.violet }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 5. Projeção de fechamento do Q2 vs Q1 (linha de referência)
// ---------------------------------------------------------------------------
export function ProjectionChart() {
  // NB: do not name any field "ref" — recharts forwards data-point fields onto
  // rendered elements and React would treat it as an (invalid) ref prop.
  const data = [
    { cenario: "Q1 fechado", valor: q1Reference },
    ...projection.map((p) => ({ cenario: p.cenario, valor: p.q2 })),
  ];
  return (
    <ChartFrame height={300}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="cenario" tick={axisStyle} tickLine={false} axisLine={false} interval={0} />
          <YAxis
            domain={[0, 8000000]}
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => fmtCompact(v)}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={<ChartTooltip formatters={{ valor: fmtThousands }} />}
          />
          <ReferenceLine
            y={q1Reference}
            stroke={palette.slate}
            strokeDasharray="4 4"
            label={{ value: "Q1 = 6,35M", position: "insideTopRight", fill: palette.slate, fontSize: 11 }}
          />
          <Bar dataKey="valor" name="Cliques projetados" radius={[5, 5, 0, 0]} maxBarSize={80}>
            <Cell fill={palette.slate} />
            <Cell fill={palette.sky} />
            <Cell fill={palette.green} />
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 6. Sign-ups por mês (GA4) — abril corrompido em destaque
// ---------------------------------------------------------------------------
export function SignupsChart() {
  return (
    <ChartFrame height={280}>
      <ResponsiveContainer>
        <ComposedChart data={signups} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="mes" tick={axisStyle} tickLine={false} axisLine={false} />
          <YAxis tick={axisStyle} tickLine={false} axisLine={false} tickFormatter={(v) => fmtCompact(v)} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={<ChartTooltip formatters={{ signup: fmtThousands }} />}
          />
          <Bar dataKey="signup" name="Sign-ups" radius={[5, 5, 0, 0]} maxBarSize={64}>
            {signups.map((row, i) => (
              <Cell key={i} fill={row.valido ? palette.violet : palette.rose} fillOpacity={row.valido ? 1 : 0.5} />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 7. Queries de marca — cliques (barras horizontais) coloridas por CTR
// ---------------------------------------------------------------------------
export function BrandQueriesChart() {
  const data = [...brandQueries].sort((a, b) => a.cliques - b.cliques);
  return (
    <ChartFrame height={300}>
      <ResponsiveContainer>
        <ComposedChart
          layout="vertical"
          data={data}
          margin={{ top: 6, right: 16, left: 8, bottom: 6 }}
        >
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
            width={96}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={<ChartTooltip formatters={{ cliques: fmtThousands }} />}
          />
          <Bar dataKey="cliques" name="Cliques" radius={[0, 5, 5, 0]} maxBarSize={26}>
            {data.map((row, i) => (
              <Cell key={i} fill={row.ctr < 50 ? palette.rose : palette.green} />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 8. Páginas — dispersão impressões x CTR (bolha = cliques)
// ---------------------------------------------------------------------------
export function PagesScatterChart() {
  const data = pages.map((p) => ({
    ...p,
    short: p.pagina.replace("/cassino/jogar/", "…/").replace("/cassino/categoria/", "…/"),
  }));
  return (
    <ChartFrame height={340}>
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
          <ZAxis type="number" dataKey="cliques" range={[60, 900]} name="Cliques" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload as (typeof data)[number];
              return (
                <div className="rounded-xl border border-border bg-surface-2/95 px-3 py-2 text-xs shadow-2xl backdrop-blur">
                  <p className="mb-1 font-semibold text-foreground">{d.pagina}</p>
                  <p className="text-muted">Impressões: <span className="text-foreground">{fmtInt(d.impressoes)}</span></p>
                  <p className="text-muted">CTR: <span className="text-foreground">{fmtDecimal(d.ctr, 2)}%</span></p>
                  <p className="text-muted">Cliques: <span className="text-foreground">{fmtInt(d.cliques)}</span></p>
                  <p className="text-muted">Posição: <span className="text-foreground">{fmtDecimal(d.posicao, 2)}</span></p>
                </div>
              );
            }}
          />
          <Scatter data={data} name="Páginas">
            {data.map((row, i) => (
              <Cell key={i} fill={row.ctr < 10 ? palette.rose : palette.green} fillOpacity={0.7} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 9. Esportes — anterior vs atual (barras agrupadas)
// ---------------------------------------------------------------------------
export function EsportesChart() {
  return (
    <ChartFrame height={280}>
      <ResponsiveContainer>
        <ComposedChart data={esportesChart} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="metrica" tick={axisStyle} tickLine={false} axisLine={false} />
          <YAxis tick={axisStyle} tickLine={false} axisLine={false} tickFormatter={(v) => fmtCompact(v)} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={<ChartTooltip formatters={{ anterior: fmtThousands, atual: fmtThousands }} />}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Bar dataKey="anterior" name="Período anterior" fill={palette.slate} radius={[5, 5, 0, 0]} maxBarSize={56} />
          <Bar dataKey="atual" name="Últimos 28 dias" fill={palette.green} radius={[5, 5, 0, 0]} maxBarSize={56} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 10. Indexação — áreas (indexadas/não indexadas) + % indexadas (linha)
// ---------------------------------------------------------------------------
export function IndexingChart() {
  return (
    <ChartFrame height={340}>
      <ResponsiveContainer>
        <ComposedChart data={indexing} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gIdx" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.green} stopOpacity={0.5} />
              <stop offset="100%" stopColor={palette.green} stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="gNotIdx" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.slate} stopOpacity={0.35} />
              <stop offset="100%" stopColor={palette.slate} stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="data" tick={axisStyle} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => fmtCompact(v)}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 40]}
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.1)" }}
            content={
              <ChartTooltip
                formatters={{ indexadas: fmtThousands, naoIndexadas: fmtThousands, pct: fmtPctTip }}
              />
            }
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="naoIndexadas"
            name="Não indexadas"
            stroke={palette.slate}
            fill="url(#gNotIdx)"
            strokeWidth={2}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="indexadas"
            name="Indexadas"
            stroke={palette.green}
            fill="url(#gIdx)"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="pct"
            name="% indexadas"
            stroke={palette.amber}
            strokeWidth={2.5}
            dot={{ r: 3, fill: palette.amber }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ---------------------------------------------------------------------------
// 11. Composição das não indexadas — donut
// ---------------------------------------------------------------------------
export function CompositionDonut() {
  return (
    <ChartFrame height={340}>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload as (typeof nonIndexedComposition)[number];
              return (
                <div className="max-w-[220px] rounded-xl border border-border bg-surface-2/95 px-3 py-2 text-xs shadow-2xl backdrop-blur">
                  <p className="font-semibold text-foreground">{d.motivo}</p>
                  <p className="mt-1 text-muted">
                    {fmtInt(d.paginas)} páginas · {fmtDecimal(d.pct, 1)}%
                  </p>
                  <p className="text-muted">{d.tipo}</p>
                </div>
              );
            }}
          />
          <Pie
            data={nonIndexedComposition}
            dataKey="paginas"
            nameKey="motivo"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={120}
            paddingAngle={1.5}
            stroke="var(--surface)"
            strokeWidth={2}
          >
            {nonIndexedComposition.map((_, i) => (
              <Cell key={i} fill={pieColors[i % pieColors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function CompositionLegend() {
  const total = nonIndexedComposition.reduce((s, r) => s + r.paginas, 0);
  return (
    <ul className="space-y-2 text-xs">
      {nonIndexedComposition.map((row, i) => (
        <li key={row.motivo} className="flex items-center gap-2">
          <span
            className="h-3 w-3 shrink-0 rounded-sm"
            style={{ background: pieColors[i % pieColors.length] }}
          />
          <span className="flex-1 truncate text-foreground/90" title={row.motivo}>
            {row.motivo}
          </span>
          <span className="tabular-nums text-muted">{fmtDecimal(row.pct, 1)}%</span>
        </li>
      ))}
      <li className="mt-2 flex items-center justify-between border-t border-border pt-2 text-foreground">
        <span>Total não indexadas</span>
        <span className="font-semibold tabular-nums">{fmtInt(total)}</span>
      </li>
    </ul>
  );
}
