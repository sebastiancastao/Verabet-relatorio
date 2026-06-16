"use client";

import { ReactNode } from "react";

import { SeoLabMark } from "@/components/ui/Brand";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Figure } from "@/components/ui/Figure";
import { KpiCard } from "@/components/ui/KpiCard";
import { Callout, Section } from "@/components/ui/Section";
import { Column, DataTable } from "@/components/DataTable";
import {
  BrandQueriesChart,
  CompositionDonut,
  CompositionLegend,
  DailyRateChart,
  EsportesChart,
  IndexingChart,
  PagesScatterChart,
  ProjectionChart,
  Q1MonthlyChart,
  Q2MonthlyChart,
  RollingWindowsChart,
  SignupsChart,
} from "@/components/charts/Charts";
import {
  actionPlan,
  ActionPlanBlock,
  brandQueries,
  businessMetrics,
  BusinessMetricRow,
  blogMetrics,
  CompareRow,
  CompositionRow,
  EsporteRow,
  FunnelRow,
  funnelConsolidado,
  heroKpis,
  ga4EventsConsolidated,
  ga4EventsMay,
  Ga4EventRow,
  indexing,
  IndexRow,
  MonthRow,
  nonBrandedQueries,
  NonBrandedQueryRow,
  OpportunityMetricRow,
  pages,
  PageRow,
  PriorityRow,
  priorities,
  q1Monthly,
  q1MoM,
  q1Total,
  q2Monthly,
  Q2MonthRow,
  q2vsQ1,
  QueryRow,
  rollingWindows,
  ScenarioRow,
  projection,
  funnelMaio,
  signups,
  SignupRow,
  VariationRow,
  WindowRow,
  esportes,
  nonIndexedComposition,
} from "@/lib/data";
import { fmtBRL, fmtDecimal, fmtInt } from "@/lib/format";

// --- small primitives ------------------------------------------------------
type Tone = "green" | "amber" | "rose" | "sky" | "slate" | "violet";

const toneClass: Record<Tone, string> = {
  green: "border-[#4cc2cc]/30 bg-[#4cc2cc]/10 text-[#8fdfe4]",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  rose: "border-rose-500/30 bg-rose-500/10 text-rose-300",
  sky: "border-[#2a93cf]/30 bg-[#2a93cf]/10 text-[#86c4ea]",
  slate: "border-border bg-surface-2 text-muted",
  violet: "border-[#6f86c9]/30 bg-[#6f86c9]/10 text-[#aab7e2]",
};

function Badge({ children, tone = "slate" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}

function VarCell({ value }: { value: string }) {
  const cls = value.includes("-")
    ? "text-rose-300"
    : value.includes("+")
    ? "text-[#5fcdd5]"
    : "text-foreground/80";
  return <span className={cls}>{value}</span>;
}

function pct(value: number, digits = 2) {
  return `${fmtDecimal(value, digits)}%`;
}

function diagTone(d: string): Tone {
  if (d.includes("fraca")) return "rose";
  if (d.includes("Excelente") || d.includes("ideal")) return "green";
  return "sky";
}

// ===========================================================================
export function Report() {
  // ----- column configs ----------------------------------------------------
  const q1Cols: Column<MonthRow>[] = [
    { key: "mes", header: "Mês" },
    { key: "cliques", header: "Cliques", align: "right", bar: true, render: (r) => fmtInt(r.cliques) },
    { key: "impressoes", header: "Impressões", align: "right", render: (r) => fmtInt(r.impressoes) },
    { key: "ctr", header: "CTR", align: "right", render: (r) => pct(r.ctr, 1) },
    { key: "posicao", header: "Pos. média", align: "right", render: (r) => fmtDecimal(r.posicao, 2) },
  ];

  const momCols: Column<VariationRow>[] = [
    { key: "metrica", header: "Métrica", sortable: false },
    { key: "fevJan", header: "Fev vs. Jan", align: "right", sortable: false, render: (r) => <VarCell value={r.fevJan} /> },
    { key: "marFev", header: "Mar vs. Fev", align: "right", sortable: false, render: (r) => <VarCell value={r.marFev} /> },
  ];

  const compareCols: Column<CompareRow>[] = [
    { key: "metrica", header: "Métrica", sortable: false },
    { key: "q1", header: "Q1 (91 dias)", align: "right", sortable: false },
    { key: "q2", header: "Q2 acum. (77 dias)", align: "right", sortable: false, render: (r) => <span className="font-semibold text-[#5fcdd5]">{r.q2}</span> },
    { key: "leitura", header: "Leitura", sortable: false, render: (r) => <span className="text-muted">{r.leitura}</span> },
  ];

  const q2MonthCols: Column<Q2MonthRow>[] = [
    {
      key: "mes",
      header: "Mês (2026)",
      render: (r) => (
        <span className="flex items-center gap-2">
          {r.mes}
          {r.projetado && <Badge tone="sky">projeção</Badge>}
        </span>
      ),
    },
    { key: "cliques", header: "Cliques (est.)", align: "right", bar: true, render: (r) => fmtInt(r.cliques) },
    { key: "ritmo", header: "Ritmo/dia", align: "right", render: (r) => fmtInt(r.ritmo) },
    { key: "leitura", header: "Leitura", render: (r) => <span className="text-muted">{r.leitura}</span> },
  ];

  const windowCols: Column<WindowRow>[] = [
    { key: "periodo", header: "Período" },
    { key: "cliques", header: "Cliques", align: "right", bar: true, render: (r) => fmtInt(r.cliques) },
    { key: "vsAnteriorNum", header: "vs. anterior", align: "right", render: (r) => <VarCell value={r.vsAnterior} /> },
    { key: "impressoes", header: "Impressões", align: "right", render: (r) => fmtInt(r.impressoes) },
    { key: "ctr", header: "CTR", align: "right", render: (r) => pct(r.ctr, 2) },
    { key: "posicao", header: "Pos.", align: "right", render: (r) => fmtDecimal(r.posicao, 2) },
  ];

  const scenarioCols: Column<ScenarioRow>[] = [
    { key: "cenario", header: "Cenário", render: (r) => <span className="font-medium text-foreground">{r.cenario}</span> },
    { key: "premissa", header: "Premissa", sortable: false, render: (r) => <span className="text-muted">{r.premissa}</span> },
    { key: "q2", header: "Q2 projetado", align: "right", bar: true, render: (r) => fmtInt(r.q2) },
    { key: "vsQ1Num", header: "vs. Q1", align: "right", render: (r) => <VarCell value={r.vsQ1} /> },
  ];

  const businessCols: Column<BusinessMetricRow>[] = [
    { key: "metrica", header: "Métrica", sortable: false, render: (r) => <span className="font-medium text-foreground">{r.metrica}</span> },
    { key: "meta", header: "Meta mensal", align: "right", sortable: false },
    { key: "fev", header: "Fev 2026", align: "right", sortable: false },
    { key: "mar", header: "Mar 2026", align: "right", sortable: false },
    { key: "maio", header: "Maio 2026", align: "right", sortable: false },
    { key: "status", header: "Status", sortable: false, render: (r) => <span className="text-muted">{r.status}</span> },
  ];

  const signupCols: Column<SignupRow>[] = [
    { key: "mes", header: "Mês" },
    { key: "signup", header: "sign_up GA4", align: "right", bar: true, render: (r) => fmtInt(r.signup) },
    {
      key: "status",
      header: "Status",
      render: (r) => <Badge tone={r.valido ? "green" : "rose"}>{r.status}</Badge>,
    },
  ];

  const funnelCols: Column<FunnelRow>[] = [
    { key: "relacao", header: "Relação", sortable: false },
    {
      key: "resultado",
      header: "Resultado",
      align: "right",
      sortable: false,
      render: (r) => <span className="font-semibold text-foreground">{r.resultado}</span>,
    },
  ];

  const eventCols: Column<Ga4EventRow>[] = [
    { key: "evento", header: "Evento", render: (r) => <span className="font-mono text-xs text-foreground">{r.evento}</span> },
    { key: "eventos", header: "Eventos", align: "right", bar: true, render: (r) => fmtInt(r.eventos) },
    { key: "usuarios", header: "Usuários", align: "right", render: (r) => fmtInt(r.usuarios) },
    { key: "leitura", header: "Leitura", sortable: false, render: (r) => <span className="text-muted">{r.leitura}</span> },
  ];

  const queryCols: Column<QueryRow>[] = [
    { key: "query", header: "Query", render: (r) => <span className="font-mono text-foreground">{r.query}</span> },
    { key: "cliques", header: "Cliques", align: "right", bar: true, render: (r) => fmtInt(r.cliques) },
    { key: "impressoes", header: "Impressões", align: "right", render: (r) => fmtInt(r.impressoes) },
    { key: "ctr", header: "CTR", align: "right", render: (r) => <span className={r.ctr < 50 ? "text-rose-300" : ""}>{pct(r.ctr, 2)}</span> },
    { key: "posicao", header: "Pos.", align: "right", render: (r) => fmtDecimal(r.posicao, 2) },
    { key: "diagnostico", header: "Diagnóstico", render: (r) => <Badge tone={diagTone(r.diagnostico)}>{r.diagnostico}</Badge> },
  ];

  const nonBrandedCols: Column<NonBrandedQueryRow>[] = [
    { key: "query", header: "Query", render: (r) => <span className="font-mono text-foreground">{r.query}</span> },
    { key: "cliques", header: "Cliques", align: "right", bar: true, render: (r) => fmtInt(r.cliques) },
    { key: "impressoes", header: "Impressões", align: "right", render: (r) => fmtInt(r.impressoes) },
    { key: "ctr", header: "CTR", align: "right", render: (r) => <span className={r.ctr < 1 ? "text-rose-300" : ""}>{pct(r.ctr, 2)}</span> },
    { key: "posicao", header: "Pos.", align: "right", render: (r) => fmtDecimal(r.posicao, 2) },
    {
      key: "diagnostico",
      header: "Diagnóstico",
      sortable: false,
      render: (r) => (
        <Badge tone={r.posicao <= 10 ? "green" : r.posicao > 40 || r.ctr === 0 ? "rose" : "amber"}>
          {r.diagnostico}
        </Badge>
      ),
    },
  ];

  const pageCols: Column<PageRow>[] = [
    { key: "pagina", header: "Página", render: (r) => <span className="font-mono text-xs text-foreground/90">{r.pagina}</span> },
    { key: "cliques", header: "Cliques", align: "right", render: (r) => fmtInt(r.cliques) },
    { key: "impressoes", header: "Impressões", align: "right", bar: true, render: (r) => fmtInt(r.impressoes) },
    { key: "ctr", header: "CTR", align: "right", render: (r) => <span className={r.ctr < 10 ? "text-rose-300" : "text-[#5fcdd5]"}>{pct(r.ctr, 2)}</span> },
    { key: "posicao", header: "Pos.", align: "right", render: (r) => fmtDecimal(r.posicao, 2) },
  ];

  const opportunityCols: Column<OpportunityMetricRow>[] = [
    { key: "metrica", header: "Métrica", sortable: false },
    { key: "atual", header: "Últimos 28 dias", align: "right", sortable: false, render: (r) => <span className="font-semibold text-[#5fcdd5]">{r.atual}</span> },
    { key: "anterior", header: "Período anterior", align: "right", sortable: false, render: (r) => <span className="text-muted">{r.anterior}</span> },
    { key: "variacao", header: "Variação", align: "right", sortable: false, render: (r) => <VarCell value={r.variacao} /> },
  ];

  const esporteCols: Column<EsporteRow>[] = [
    { key: "metrica", header: "Métrica", sortable: false },
    { key: "atual", header: "Últimos 28 dias", align: "right", sortable: false, render: (r) => <span className="font-semibold text-[#5fcdd5]">{r.atual}</span> },
    { key: "anterior", header: "Período anterior", align: "right", sortable: false, render: (r) => <span className="text-muted">{r.anterior}</span> },
    { key: "variacao", header: "Variação", align: "right", sortable: false, render: (r) => <VarCell value={r.variacao} /> },
  ];

  const indexCols: Column<IndexRow>[] = [
    { key: "data", header: "Data", sortable: false },
    { key: "indexadas", header: "Indexadas", align: "right", bar: true, render: (r) => fmtInt(r.indexadas) },
    { key: "naoIndexadas", header: "Não indexadas", align: "right", render: (r) => fmtInt(r.naoIndexadas) },
    { key: "pct", header: "% indexadas", align: "right", render: (r) => pct(r.pct, 1) },
  ];

  const compCols: Column<CompositionRow>[] = [
    { key: "motivo", header: "Motivo" },
    { key: "paginas", header: "Páginas", align: "right", bar: true, render: (r) => fmtInt(r.paginas) },
    { key: "tipo", header: "Tipo", render: (r) => <Badge tone={r.tipo.includes("Técnico") ? "amber" : r.tipo.includes("Google") ? "rose" : "slate"}>{r.tipo}</Badge> },
    { key: "pct", header: "% do total", align: "right", render: (r) => pct(r.pct, 1) },
  ];

  const prioCols: Column<PriorityRow>[] = [
    {
      key: "n",
      header: "#",
      align: "center",
      render: (r) => (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 font-mono text-sm font-semibold text-accent">
          {r.n}
        </span>
      ),
    },
    { key: "acao", header: "Ação", render: (r) => <span className="font-medium text-foreground">{r.acao}</span> },
    { key: "alvo", header: "Alvo", render: (r) => <span className="font-mono text-xs text-muted">{r.alvo}</span> },
    { key: "esforco", header: "Esforço", render: (r) => <Badge tone="sky">{r.esforco}</Badge> },
    { key: "impacto", header: "Impacto estimado", render: (r) => <span className="text-muted">{r.impacto}</span> },
  ];

  return (
    <div className="space-y-2">
      {/* ===== HERO ===== */}
      <div className="animate-fade-up pt-10">
        <div className="flex flex-wrap items-center gap-3">
          <SeoLabMark height={28} />
          <Badge tone="green">Atualização Pós-Q1 e do Q2 · 2026</Badge>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Análise de Desempenho SEO
          <span className="block bg-gradient-to-r from-[#5fcdd5] to-[#5fb0e6] bg-clip-text text-transparent">
            vera.bet.br
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          O Q1 2026 fechou em <strong className="text-foreground">6.349.557 cliques</strong>, um dos
          melhores trimestres da história. O Q2, em andamento até 16 de junho, acelerou nas
          últimas semanas e já se posiciona em patamar igual ou superior ao do Q1.
        </p>
      </div>

      {/* ===== 01 RESUMO ===== */}
      <Section id="resumo" num="01" title="Resumo Executivo">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {heroKpis.map((k) => (
            <KpiCard key={k.label} kpi={k} />
          ))}
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          <Callout tone="success">
            Ritmo diário do Q2 (~70 mil/dia) já supera a média do Q1 (~69,7 mil/dia), com CTR e
            posição média melhores.
          </Callout>
          <Callout tone="info">
            Indexação em forte alta: páginas indexadas quase triplicaram, de 702 (20/mar) para 2.022
            (11/jun), +188% — motor estrutural do crescimento.
          </Callout>
         
        </div>
        <div className="mt-6">
          <Card>
            <CardHeader
              title="Visão geral no Google Search Console"
              subtitle="Cliques, impressões, CTR e posição média — série diária"
            />
            <CardBody>
              <Figure
                src="/gsc-performance.png"
                alt="Captura do Google Search Console mostrando cliques, impressões, CTR e posição média ao longo do tempo"
                width={1458}
                height={468}
                caption="Fonte: Google Search Console · Total clicks 16,3M · Impressions 25,1M · CTR 64,9% · Position 1,9 (visão da janela exibida no painel)"
              />
            </CardBody>
          </Card>
        </div>
      </Section>

      {/* ===== 02 Q1 ===== */}
      <Section
        id="q1"
        num="02"
        title="Q1 2026 Consolidado"
        intro="A queda moderada de volume entre janeiro e março veio acompanhada de CTR crescente: o domínio passou a capturar tráfego mais qualificado e menos disperso."
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader title="Performance mensal" subtitle="Cliques e impressões (barras) · CTR (linha, eixo direito)" />
            <CardBody>
              <Q1MonthlyChart />
            </CardBody>
          </Card>
          <div className="lg:col-span-2 space-y-4">
            <DataTable columns={q1Cols} data={q1Monthly} initialSort={{ key: "cliques", dir: "desc" }} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Cliques Q1" value={fmtInt(q1Total.cliques)} />
              <Stat label="Impressões" value={fmtInt(q1Total.impressoes)} />
              <Stat label="CTR média" value={pct(q1Total.ctr, 1)} />
              <Stat label="Pos. média" value={fmtDecimal(q1Total.posicao, 2)} />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Card>
            <CardHeader title="Variação mês a mês no Q1" />
            <CardBody className="pt-0">
              <DataTable columns={momCols} data={q1MoM} />
            </CardBody>
          </Card>
        </div>
      </Section>

      {/* ===== 03 Q2 ===== */}
      <Section
        id="q2"
        num="03"
        title="Q2 2026 em Andamento"
        intro="Em 16 de junho já decorreram 77 dos 91 dias do Q2 (85% do período). Há volume suficiente para uma leitura sólida sem esperar o fechamento de junho."
      >
        {/* 3.1 acumulado vs Q1 */}
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader title="Q2 acumulado até 16/jun vs. Q1" subtitle="Comparação por ritmo diário, não por total absoluto" />
            <CardBody className="pt-0">
              <DataTable columns={compareCols} data={q2vsQ1} />
            </CardBody>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader title="Ritmo diário" subtitle="Q2 acumulado já acima do Q1" />
            <CardBody>
              <DailyRateChart />
            </CardBody>
          </Card>
        </div>

        {/* 3.2 reconstrução mensal */}
        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader title="Reconstrução mensal estimada do Q2" subtitle="Junho projetado em destaque (linha tracejada)" />
            <CardBody>
              <Q2MonthlyChart />
            </CardBody>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader title="Detalhe mensal" />
            <CardBody className="pt-0">
              <DataTable columns={q2MonthCols} data={q2Monthly} />
            </CardBody>
          </Card>
        </div>

        {/* 3.3 janelas móveis */}
        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader title="Janelas móveis (GSC)" subtitle="Cliques (barras) · posição média (linha)" />
            <CardBody>
              <RollingWindowsChart />
            </CardBody>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader title="Dados diretos do GSC" />
            <CardBody className="pt-0">
              <DataTable columns={windowCols} data={rollingWindows} />
            </CardBody>
          </Card>
        </div>

        {/* 3.4 projeção */}
        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader title="Projeção de fechamento" subtitle="Linha tracejada = Q1 fechado (6,35M)" />
            <CardBody>
              <ProjectionChart />
            </CardBody>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader title="Cenários de fechamento do Q2" />
            <CardBody className="pt-0">
              <DataTable columns={scenarioCols} data={projection} />
            </CardBody>
          </Card>
        </div>

        <div className="mt-6">
          <Callout tone="info">
            Os valores de Q2 marcados com <strong>~</strong> são reconstruídos a partir da janela móvel
            de 3 meses do GSC, subtraindo a porção de 17 a 31 de março. A leitura realista de
            fechamento fica entre <strong className="text-foreground">6,5 e 6,8 milhões</strong> de
            cliques — em qualquer cenário, igual ou acima do Q1.
          </Callout>
        </div>
      </Section>

      {/* ===== 04 GA4 ===== */}
      <Section
        id="ga4"
        num="04"
        title="Métrica de Negócio (GA4)"
        intro="A leitura de negócio precisa de cautela: os arquivos de eventos estão marcados como All Users, e não Organic Search. Os números descrevem a jornada de conversão, mas ainda não devem ser atribuídos exclusivamente ao SEO."
      >
        <Card>
          <CardHeader
            title="Métrica de negócio atualizada — vera.bet.br"
            subtitle="Meta mensal de sign-ups vs. fevereiro, março e maio de 2026"
          />
          <CardBody className="pt-0">
            <DataTable columns={businessCols} data={businessMetrics} />
          </CardBody>
        </Card>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          <Callout tone="success">
            Maio continua acima da meta mensal: <strong className="text-foreground">9.571 sign-ups</strong>, o
            equivalente a <strong className="text-foreground">112,3%</strong> da meta.
          </Callout>
          <Callout tone="info">
            Mesmo com queda de <strong className="text-foreground">23,5%</strong> vs. março, o acumulado
            Fev+Mar+Mai soma <strong className="text-foreground">30.851 sign-ups</strong>, 20,6% acima da meta acumulada.
          </Callout>
          
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader title="Sign-ups por mês" subtitle="Abril em vermelho = arquivo corrompido, não comparável" />
            <CardBody>
              <SignupsChart />
            </CardBody>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader title="Detalhe" />
            <CardBody className="pt-0">
              <DataTable columns={signupCols} data={signups} highlightRow={(r) => !r.valido} />
            </CardBody>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader title="Eventos GA4" subtitle="Período 16/03/2026 a 13/06/2026 · All Users" />
            <CardBody className="pt-0">
              <DataTable columns={eventCols} data={ga4EventsConsolidated} initialSort={{ key: "eventos", dir: "desc" }} />
            </CardBody>
          </Card>
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader title="Funil de conversão" subtitle="Leitura consolidada dos eventos disponíveis" />
              <CardBody className="pt-0">
                <DataTable columns={funnelCols} data={funnelConsolidado} />
              </CardBody>
            </Card>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Receita (purchase)" value={fmtBRL(38470.74)} accent />
              <Stat label="Sign-up → purchase" value="~54%" />
            </div>
            <Callout tone="warning">
              A principal oportunidade está antes do sign-up: view_modal_cadastro teve 47.098 usuários,
              enquanto sign_up registrou 9.607 usuários, uma conversão aproximada de 20,4%.
            </Callout>
          </div>
        </div>

        <div className="mt-6">
          <Callout tone="info">
            A leitura estratégica é que março foi um mês de aceleração excepcional, enquanto maio mostra
            uma estabilização saudável acima da meta. Melhorias em UX, copy, velocidade, clareza de bônus,
            etapas do formulário e mensagens de confiança podem aumentar a taxa até o cadastro.
          </Callout>
        </div>
      </Section>

      {/* ===== 05 QUERIES & PÁGINAS ===== */}
      <Section
        id="queries"
        num="05"
        title="Concentração por Query e Página"
        intro="A query verabet deixou de ser brecha técnica e opera em posição 1,00. A nova prioridade de marca é betvera: muitas impressões, mas CTR de apenas 29,31% e posição 2,22."
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader title="Queries de marca" subtitle="Cliques · vermelho = CTR baixa (betvera)" />
            <CardBody>
              <BrandQueriesChart />
            </CardBody>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader title="Queries de marca (últimos 28 dias)" />
            <CardBody className="pt-0">
              <DataTable
                columns={queryCols}
                data={brandQueries}
                initialSort={{ key: "cliques", dir: "desc" }}
                highlightRow={(r) => r.query === "betvera"}
              />
            </CardBody>
          </Card>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <Callout tone="success">
            A oportunidade antiga em “verabet” foi praticamente corrigida: passou de posição média 2,42
            para <strong className="text-foreground">1,00</strong>, com CTR de 74,60%.
          </Callout>
          <Callout tone="warning">
            “betvera” concentra a nova prioridade branded: 84.841 impressões, CTR de 29,31% e posição
            média 2,22.
          </Callout>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader title="Mapa de oportunidade" subtitle="Impressões × CTR · bolha = cliques" />
            <CardBody>
              <PagesScatterChart />
            </CardBody>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader title="Páginas com maior potencial" subtitle="Use a busca para filtrar URLs" />
            <CardBody className="pt-0">
              <DataTable
                columns={pageCols}
                data={pages}
                searchable
                searchPlaceholder="Filtrar páginas…"
                initialSort={{ key: "impressoes", dir: "desc" }}
              />
            </CardBody>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader
              title="Queries non-branded relevantes"
              subtitle="O domínio já aparece para jogos e categorias, mas muitas posições ainda estão fora da zona útil"
            />
            <CardBody className="pt-0">
              <DataTable
                columns={nonBrandedCols}
                data={nonBrandedQueries}
                searchable
                searchPlaceholder="Filtrar queries…"
                initialSort={{ key: "impressoes", dir: "desc" }}
              />
            </CardBody>
          </Card>
        </div>
        <div className="mt-6">
          <Callout tone="info">
            <strong className="text-foreground">/cassino/categoria/todos-os-jogos</strong> já opera em
            nível excelente e deve ser protegida. As maiores oportunidades estão em páginas com muitas
            impressões e CTR baixo: Blog, Esportes, Mines, Tigre da Sorte e Cassino ao Vivo.
          </Callout>
        </div>
      </Section>

      {/* ===== 06 BLOG ===== */}
      <Section
        id="blog"
        num="06"
        title="Blog como Motor de Aquisição"
        intro="O blog se tornou uma das principais oportunidades do domínio: o Google já exibe a seção em escala, mas o CTR ainda é baixo e pode ser trabalhado com snippets, títulos, FAQs e linkagem interna."
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader title="Blog — últimos 28 dias vs. período anterior" />
            <CardBody className="pt-0">
              <DataTable columns={opportunityCols} data={blogMetrics} />
            </CardBody>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader title="Ações recomendadas" subtitle="Transformar visibilidade em aquisição" />
            <CardBody>
              <ActionList items={actionPlan.find((p) => p.title === "Blog como Motor de Aquisição")?.actions ?? []} />
            </CardBody>
          </Card>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <Callout tone="info">
            O blog precisa distribuir autoridade para páginas de jogos, cassino ao vivo, promoções,
            esportes, guias de apostas e conteúdos de como jogar.
          </Callout>
          <Callout tone="warning">
            Com <strong className="text-foreground">937.792 impressões</strong> e CTR de 2,77%, há
            oportunidade clara de ganho sem depender apenas de novas páginas.
          </Callout>
        </div>
      </Section>

      {/* ===== 07 ESPORTES ===== */}
      <Section
        id="esportes"
        num="07"
        title="Oportunidade em Esportes"
        intro="A seção de esportes, antes apontada como limitação estrutural, mostra evolução relevante: +541% em cliques e +439% em impressões nos últimos 28 dias."
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader title="Esportes — últimos 28 dias vs. período anterior" />
            <CardBody className="pt-0">
              <DataTable columns={esporteCols} data={esportes} />
            </CardBody>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader title="Crescimento" subtitle="Período anterior vs. últimos 28 dias" />
            <CardBody>
              <EsportesChart />
            </CardBody>
          </Card>
        </div>
        <div className="mt-6">
          <Callout tone="success">
            Para escalar o cluster, é necessário criar conteúdos e URLs de suporte para apostas
            esportivas, futebol, MMA, apostas ao vivo, campeonatos, guias de como apostar, mercados e
            odds.
          </Callout>
        </div>
      </Section>

      {/* ===== 08 EVENTOS MAIO ===== */}
      <Section
        id="eventos-maio"
        num="08"
        title="Eventos de Maio 2026"
        intro="O recorte de 01/05/2026 a 31/05/2026 ajuda a entender o comportamento do mês dentro da jornada de navegação, cadastro, depósito e compra."
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader title="Principais eventos registrados em maio" subtitle="Período 01/05/2026 a 31/05/2026" />
            <CardBody className="pt-0">
              <DataTable columns={eventCols} data={ga4EventsMay} initialSort={{ key: "eventos", dir: "desc" }} />
            </CardBody>
          </Card>
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader title="Funil de maio 2026" subtitle="Leitura mensal do comportamento de conversão" />
              <CardBody className="pt-0">
                <DataTable columns={funnelCols} data={funnelMaio} />
              </CardBody>
            </Card>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Receita (purchase)" value={fmtBRL(38466.53)} accent />
              <Stat label="Sign-up → FTD" value="53,98%" />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <Callout tone="success">
            Maio reforça o mesmo padrão: quando o usuário chega ao cadastro, a taxa de avanço para
            primeiro depósito e purchase fica próxima de 54%.
          </Callout>
          
        </div>
      </Section>

      {/* ===== 09 INDEXAÇÃO ===== */}
      <Section
        id="indexacao"
        num="09"
        title="Indexação e Saúde Técnica"
        intro="Série diária de cobertura do GSC de 17/mar a 11/jun de 2026. As páginas indexadas saíram de 702 para 2.022 (+188%) e as não indexadas pararam de crescer."
      >
        <div className="mb-6">
          <Card>
            <CardHeader
              title="Cobertura de indexação no Google Search Console"
              subtitle="Indexed 2,02K · Not indexed 4,51K (11 motivos)"
            />
            <CardBody>
              <Figure
                src="/gsc-indexing.png"
                alt="Captura do Google Search Console mostrando páginas indexadas e não indexadas ao longo do tempo"
                width={1091}
                height={645}
                caption="Fonte: Google Search Console — páginas indexadas (verde) crescendo sobre as não indexadas (cinza) no Q2"
              />
            </CardBody>
          </Card>
        </div>
        <Card>
          <CardHeader title="Evolução da indexação no Q2" subtitle="Indexadas e não indexadas (áreas) · % indexadas (linha, eixo direito)" />
          <CardBody>
            <IndexingChart />
          </CardBody>
        </Card>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Série de cobertura" />
            <CardBody className="pt-0">
              <DataTable columns={indexCols} data={indexing} />
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Composição das não indexadas" subtitle="Em 11 de junho de 2026" />
            <CardBody>
              <div className="grid items-center gap-4 sm:grid-cols-2">
                <CompositionDonut />
                <CompositionLegend />
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader title="Detalhe da composição (não indexadas)" />
            <CardBody className="pt-0">
              <DataTable
                columns={compCols}
                data={nonIndexedComposition}
                initialSort={{ key: "paginas", dir: "desc" }}
              />
            </CardBody>
          </Card>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <Callout tone="warning">
            Bloco técnico (~1.176 URLs: redirect, 404, soft 404) dá ganho rápido via Cloudflare
            Redirect Rule e routeRules no nuxt.config.ts.
          </Callout>
          <Callout tone="info">
            68% das não indexadas (3.063 páginas) são <em>Crawled, currently not indexed</em>: não é
            bug, é decisão do Google. Resolve-se enriquecendo as páginas de jogo (texto, FAQ, linkagem
            interna), não com redirect.
          </Callout>
        </div>
      </Section>

      {/* ===== 10 PRIORIDADES ===== */}
      <Section
        id="prioridades"
        num="10"
        title="Mapa de Prioridades"
        intro="Ações ordenadas para o restante do ano, do ganho mais imediato (blindar marca, CTR) ao estrutural (conteúdo editorial, linkagem interna e medição GA4 por canal)."
      >
        <Card>
          <CardBody className="px-0 py-0">
            <DataTable columns={prioCols} data={priorities} />
          </CardBody>
        </Card>
      </Section>

      {/* ===== 11 PLANO ===== */}
      <Section
        id="plano"
        num="11"
        title="Plano de Ação Recomendado"
        intro="O plano organiza a execução por frente: branded SEO, blog, esportes, páginas de jogos e conversão/GA4."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {actionPlan.map((block) => (
            <ActionPlanCard key={block.title} block={block} />
          ))}
        </div>
      </Section>

      {/* ===== 12 CONCLUSÃO ===== */}
      <Section id="conclusao" num="12" title="Conclusão">
        <div className="grid gap-4 lg:grid-cols-3">
          <ConclusionCard
            title="Patamar consolidado"
            body="Com 77 dos 91 dias decorridos, o Q2 acumula ~5,39M de cliques, ritmo diário já acima do Q1 e CTR estimada de 72,9%. A projeção de fechamento fica entre 6,5 e 6,8 milhões — igual ou acima do Q1."
          />
          <ConclusionCard
            title="Base de tráfego em expansão"
            body="A cobertura do GSC confirma a direção: as indexadas quase triplicaram no Q2 (702 → 2.022). O próximo salto depende menos de correções técnicas e mais de enriquecer as 3.063 páginas que o Google rastreia mas não indexa."
          />
          <ConclusionCard
            title="Foco estratégico"
            body="verabet está em posição ideal; a nova prioridade de marca é betvera. O foco do Q2 é converter impressões em cliques (Blog, Esportes, jogos) e validar GA4 por canal para ligar SEO a sign-ups, depósitos e receita."
          />
        </div>
        <div className="mt-6">
          <Callout tone="success">
            Mantido o ritmo atual, o Q2 fecha acima de 6 milhões de cliques e consolida vera.bet.br
            como uma das principais referências de performance SEO no mercado iGaming brasileiro.
          </Callout>
        </div>
      </Section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted">
        <div className="mb-3 flex items-center justify-center gap-2">
          <span>Relatório produzido por</span>
          <SeoLabMark height={20} />
        </div>
        Relatório interativo gerado a partir da “Análise de Desempenho SEO 2026 — VeraBet”. Dados de
        GSC e GA4 · atualizado em 16 de junho de 2026.
      </footer>
    </div>
  );
}

// --- local sub-components ---------------------------------------------------
function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2/50 px-3 py-3">
      <p className="text-[11px] uppercase tracking-wider text-muted">{label}</p>
      <p className={`mt-1 text-lg font-bold tabular-nums ${accent ? "text-[#5fcdd5]" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function ConclusionCard({ title, body }: { title: string; body: string }) {
  return (
    <Card className="h-full">
      <CardBody className="pt-5">
        <h3 className="text-sm font-semibold text-accent">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      </CardBody>
    </Card>
  );
}

function ActionPlanCard({ block }: { block: ActionPlanBlock }) {
  return (
    <Card className="h-full">
      <CardHeader title={block.title} subtitle={block.summary} />
      <CardBody>
        <ActionList items={block.actions} />
      </CardBody>
    </Card>
  );
}

function ActionList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-muted">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
