"use client";

import { ReactNode } from "react";

import { SeoLabMark } from "@/components/ui/Brand";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { KpiCard } from "@/components/ui/KpiCard";
import { Callout, Section } from "@/components/ui/Section";
import { Column, DataTable } from "@/components/DataTable";
import {
  CbBrandedSplitChart,
  CbFunnelChart,
  CbMigrationScatter,
  CbQueriesChart,
  CbTokenMigrationChart,
} from "@/components/charts/CassinoCharts";
import {
  CbActionRow,
  cbActions,
  CbAggRow,
  cbAggregate,
  CbFunnelRow,
  cbFunnel,
  cbHeroKpis,
  CbMigrationRow,
  cbMigration,
  cbMigrationRecs,
  cbNonBrandedRecs,
  cbNonBrandedStats,
  CbQueryRow,
  cbQueries,
  CbReverseRow,
  cbReverse,
  cbReverseRecs,
  cbTech,
} from "@/lib/cassino-data";
import { fmtDecimal, fmtInt } from "@/lib/format";

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
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${toneClass[tone]}`}>
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

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2/50 px-4 py-4">
      <p className="text-[11px] uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  );
}

function RecList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2.5">
      {items.map((rec, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-[11px] font-semibold text-accent">
            {i + 1}
          </span>
          <span>{rec}</span>
        </li>
      ))}
    </ol>
  );
}

const pct = (v: number, d = 2) => `${fmtDecimal(v, d)}%`;

function prioTone(p: string): Tone {
  if (p === "Alta") return "amber";
  if (p === "Média") return "sky";
  if (p === "Acompanhamento") return "violet";
  return "slate";
}

function statusTone(s: string): Tone {
  if (s.includes("-")) return "rose";
  if (s === "nova") return "sky";
  return "slate";
}

// ===========================================================================
export function CassinoReport() {
  const queryCols: Column<CbQueryRow>[] = [
    { key: "query", header: "Query", render: (r) => <span className="font-mono text-foreground">{r.query}</span> },
    { key: "cliques", header: "Cliques", align: "right", bar: true, render: (r) => fmtInt(r.cliques) },
    { key: "varCliquesNum", header: "Var.", align: "right", render: (r) => <VarCell value={r.varCliques} /> },
    { key: "impressoes", header: "Impressões", align: "right", render: (r) => fmtInt(r.impressoes) },
    { key: "ctr", header: "CTR", align: "right", render: (r) => <span className={r.ctr < 50 ? "text-amber-300" : ""}>{pct(r.ctr, 1)}</span> },
    { key: "posicao", header: "Pos.", align: "right", render: (r) => fmtDecimal(r.posicao, 2) },
  ];

  const aggCols: Column<CbAggRow>[] = [
    { key: "metrica", header: "Métrica", sortable: false },
    { key: "atual", header: "Atual", align: "right", sortable: false, render: (r) => <span className="font-semibold text-foreground">{r.atual}</span> },
    { key: "anterior", header: "Anterior", align: "right", sortable: false, render: (r) => <span className="text-muted">{r.anterior}</span> },
    { key: "variacao", header: "Variação", align: "right", sortable: false, render: (r) => <VarCell value={r.variacao} /> },
  ];

  const reverseCols: Column<CbReverseRow>[] = [
    { key: "indicador", header: "Indicador", sortable: false },
    { key: "atual", header: "Atual (6m)", align: "right", sortable: false, render: (r) => <span className="font-semibold text-foreground">{r.atual}</span> },
    { key: "anterior", header: "Anterior (6m)", align: "right", sortable: false, render: (r) => <span className="text-muted">{r.anterior}</span> },
    { key: "variacao", header: "Var.", align: "right", sortable: false, render: (r) => <VarCell value={r.variacao} /> },
  ];

  const migrationCols: Column<CbMigrationRow>[] = [
    { key: "pagina", header: "Página", render: (r) => <span className="font-mono text-xs text-foreground/90">{r.pagina}</span> },
    { key: "cliques", header: "Cliques", align: "right", render: (r) => fmtInt(r.cliques) },
    {
      key: "impressoes",
      header: "Impressões",
      align: "right",
      bar: true,
      accessor: (r) => r.impressoes ?? 0,
      render: (r) => (r.impressoes === null ? "—" : fmtInt(r.impressoes)),
    },
    {
      key: "ctr",
      header: "CTR",
      align: "right",
      accessor: (r) => r.ctr ?? -1,
      render: (r) =>
        r.ctr === null ? "—" : <span className={r.ctr < 10 ? "text-rose-300" : "text-[#5fcdd5]"}>{pct(r.ctr, 2)}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge>,
    },
  ];

  const funnelCols: Column<CbFunnelRow>[] = [
    { key: "etapa", header: "Etapa", sortable: false, render: (r) => <span className="font-mono text-foreground">{r.etapa}</span> },
    { key: "usuarios", header: "Usuários", align: "right", bar: true, render: (r) => fmtInt(r.usuarios) },
    { key: "conversao", header: "Conversão", align: "right", sortable: false, render: (r) => <span className="text-muted">{r.conversao}</span> },
  ];

  const actionCols: Column<CbActionRow>[] = [
    { key: "acao", header: "Ação", render: (r) => <span className="font-medium text-foreground">{r.acao}</span> },
    { key: "responsavel", header: "Responsável", render: (r) => <span className="text-muted">{r.responsavel}</span> },
    { key: "prazo", header: "Prazo", render: (r) => <span className="text-muted">{r.prazo}</span> },
    { key: "prioridade", header: "Prioridade", render: (r) => <Badge tone={prioTone(r.prioridade)}>{r.prioridade}</Badge> },
  ];

  return (
    <div className="space-y-2">
      {/* ===== HERO ===== */}
      <div className="animate-fade-up pt-10">
        <div className="flex flex-wrap items-center gap-3">
          <SeoLabMark height={28} />
          <Badge tone="green">Atual vs. semestre anterior · 2026</Badge>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Análise de Desempenho SEO
          <span className="block bg-gradient-to-r from-[#5fcdd5] to-[#5fb0e6] bg-clip-text text-transparent">
            cassino.bet.br
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Os cliques orgânicos das principais queries passaram de{" "}
          <strong className="text-foreground">13,58 M para 20,68 M (+52,3%)</strong>, com a posição
          média da homepage melhorando de 1,88 para 1,53 e o CTR subindo de 60,1 para 73,7%. O canal
          orgânico não está em queda; está mais forte do que no semestre anterior.
        </p>
      </div>

      {/* ===== 01 RESUMO ===== */}
      <Section id="cb-resumo" num="01" title="Resumo Executivo">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cbHeroKpis.map((k) => (
            <KpiCard key={k.label} kpi={k} />
          ))}
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          <Callout tone="success">
            Tendência geral positiva: cliques +52,3% e posição média da home de 1,88 para 1,53,
            enquanto as impressões crescem.
          </Callout>
          <Callout tone="info">
            “cassino pix” caiu 6,1%, mas a marca cresceu 49,3% no agregado. A queda é{" "}
            <strong className="text-foreground">troca de token</strong>, não perda de ranking: a
            demanda migrou para “cassino bet”.
          </Callout>
          <Callout tone="warning">
            Migração /games → /cassino: impressões transferidas, CTR não. Cerca de{" "}
            <strong className="text-foreground">1,6 M de impressões</strong> em categorias novas
            convertendo a menos de 3,1%.
          </Callout>
        </div>
      </Section>

      {/* ===== 02 TRÁFEGO ===== */}
      <Section
        id="cb-trafego"
        num="02"
        title="Tráfego Orgânico: atual vs. anterior"
        intro="O dado mais saudável é a posição média da homepage caindo de 1,88 para 1,53 enquanto as impressões crescem. O Google passou a ranquear a página principal de forma mais consistente no primeiro resultado, e o CTR acompanhou (60,1 → 73,7%)."
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader title="Top queries por cliques" subtitle="Vermelho = queda no período (token em migração)" />
            <CardBody>
              <CbQueriesChart />
            </CardBody>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader title="Principais queries — período atual" subtitle="Use a busca para filtrar" />
            <CardBody className="pt-0">
              <DataTable
                columns={queryCols}
                data={cbQueries}
                searchable
                searchPlaceholder="Filtrar queries…"
                initialSort={{ key: "cliques", dir: "desc" }}
              />
            </CardBody>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader title="Métricas agregadas (top queries)" />
            <CardBody className="pt-0">
              <DataTable columns={aggCols} data={cbAggregate} />
            </CardBody>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader title="Branded vs. Non-branded" subtitle="Cliques — anterior vs. atual" />
            <CardBody>
              <CbBrandedSplitChart />
            </CardBody>
          </Card>
        </div>
      </Section>

      {/* ===== 03 CASSINO PIX ===== */}
      <Section
        id="cb-cassino-pix"
        num="03"
        title="Engenharia reversa: o caso “cassino pix”"
        intro="Três sinais aparecem juntos: as impressões de “cassino pix” caem 19%, o CTR sobe quase 12 pontos e a posição fica parada em 1,0. Se fosse perda de ranking, a posição teria piorado e o CTR cairia. O que ocorreu é o oposto."
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader title="O que os dados mostram" subtitle="Atual (6m) vs. anterior (6m)" />
            <CardBody className="pt-0">
              <DataTable columns={reverseCols} data={cbReverse} />
            </CardBody>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader title="Migração de token" subtitle="Cliques — anterior vs. atual" />
            <CardBody>
              <CbTokenMigrationChart />
            </CardBody>
          </Card>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <Callout tone="info">
            <strong className="text-foreground">Migração de token.</strong> O ganho de 3,3 M de cliques
            em “cassino bet” é maior que a perda em “cassino pix”. A marca não encolheu; trocou de
            palavra de entrada. No recorte ano a ano, “cassino pix” foi de 3,68 M para 2,73 M e
            “cassino bet” saltou de 342 mil para 2,30 M.
          </Callout>
          <Callout tone="success">
            <strong className="text-foreground">Terreno mais defensável.</strong> “Cassino pix” junta
            dois termos genéricos de altíssimo volume — o Google é obrigado a diversificar a SERP.
            “Cassino bet” é um par distintivo de marca: resultado único dominante, posição 1,04 e 80%
            de CTR. Acompanhar a migração, não resistir a ela.
          </Callout>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader title="Recomendações" />
            <CardBody>
              <RecList items={cbReverseRecs} />
            </CardBody>
          </Card>
        </div>
      </Section>

      {/* ===== 04 MIGRAÇÃO ===== */}
      <Section
        id="cb-migracao"
        num="04"
        title="Migração /games → /cassino e o vazamento de CTR"
        intro="O sistema moveu impressões de um nó para outro sem carregar junto a camada que converte impressão em clique. O hub /cassino converte bem (40,5%), o que prova que o problema não é a arquitetura em português, e sim title, meta e renderização das categorias específicas."
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader title="Estado da transição" subtitle="Páginas antigas, novas e ativas" />
            <CardBody className="pt-0">
              <DataTable
                columns={migrationCols}
                data={cbMigration}
                initialSort={{ key: "impressoes", dir: "desc" }}
              />
            </CardBody>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader title="Impressões × CTR" subtitle="Bolha = cliques · vermelho = CTR < 10%" />
            <CardBody>
              <CbMigrationScatter />
            </CardBody>
          </Card>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <Callout tone="warning">
            As três categorias novas somam ~1,6 M de impressões com CTR entre 1,7 e 3,1%. A nova
            /cassino/categoria/todos-os-jogos herdou +500 mil impressões convertendo a 1,77%.
          </Callout>
          <Callout tone="warning">
            Desperdício fora da migração: speed-auto-roulette aparece 1,22 M de vezes a 0,62%, e
            compre-rodadas recebe 2,39 M de impressões a 7,8%. Falta o snippet comunicar valor.
          </Callout>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader title="Recomendações" />
            <CardBody>
              <RecList items={cbMigrationRecs} />
            </CardBody>
          </Card>
        </div>
      </Section>

      {/* ===== 05 NON-BRANDED ===== */}
      <Section
        id="cb-non-branded"
        num="05"
        title="Non-branded e a query-ponte “cassino”"
        intro="O tráfego non-branded dobrou (537 mil → 1,22 M), mas ainda é só 5,9% do total. A query genérica “cassino” funciona como ponte entre o universo de marca e o genérico — mas a posição piorou de 2,67 para 3,02."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cbNonBrandedStats.map((s) => (
            <Stat key={s.label} label={s.label} value={s.value} sub={s.sub} />
          ))}
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <Callout tone="info">
            A posição 1 da SERP de “cassino” pertence a um resultado informativo (Wikipédia); a
            intenção comercial pula para o primeiro resultado transacional. Ocupar a posição 2 é o
            teto realista — cair para 3,02 indica que outro resultado tomou a segunda posição.
          </Callout>
          <Callout tone="warning">
            As buscas genuinamente genéricas de jogos seguem sub-representadas, o que mantém o domínio
            dependente da marca. É aí que está o espaço de crescimento estrutural.
          </Callout>
        </div>
        <div className="mt-6">
          <Card>
            <CardHeader title="Recomendações" />
            <CardBody>
              <RecList items={cbNonBrandedRecs} />
            </CardBody>
          </Card>
        </div>
      </Section>

      {/* ===== 06 FUNIL ===== */}
      <Section
        id="cb-funil"
        num="06"
        title="Funil de conversão orgânica (GA4)"
        intro="Dados de 1 de janeiro a 23 de junho de 2026. A taxa de 27,6% de visitante orgânico para sign-up é o número que justifica o investimento no canal: para cada 100 pessoas que chegam pela busca, ~28 se cadastram, e quase metade dos cadastros chega a um Pix confirmado."
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader title="Funil completo" subtitle="Usuários por etapa e conversão da etapa anterior" />
            <CardBody className="pt-0">
              <DataTable columns={funnelCols} data={cbFunnel} />
            </CardBody>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader title="Etapas principais" subtitle="Usuários por etapa da jornada" />
            <CardBody>
              <CbFunnelChart />
            </CardBody>
          </Card>
        </div>
        <div className="mt-6">
          <Callout tone="info">
            O gargalo está mais abaixo, na conversão de Pix confirmado para primeiro depósito, mas isso
            é tema de produto e de promoção, fora do escopo de SEO. Por landing page, o tráfego se
            concentra na homepage (15,6 M de sessões), seguida de /usuario/premios, /cassino, /sports e
            das páginas da PG Soft — todas com session key event rate de 1,0.
          </Callout>
        </div>
      </Section>

      {/* ===== 07 TÉCNICA ===== */}
      <Section
        id="cb-tecnica"
        num="07"
        title="Saúde Técnica e Subdomínios"
        intro="A foto técnica é positiva: a homepage melhorou posição e CTR, as páginas novas estão sendo indexadas, e o volume de impressões cresceu 27,8% sem sinal de penalização. Dois pontos merecem atenção."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {cbTech.map((t) => (
            <Card key={t.title} className="h-full">
              <CardBody className="pt-5">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      t.tone === "warning" ? "bg-amber-400" : t.tone === "success" ? "bg-[#4cc2cc]" : "bg-[#2a93cf]"
                    }`}
                  />
                  <h3 className="text-sm font-semibold text-foreground">{t.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted">{t.body}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* ===== 08 AÇÕES ===== */}
      <Section
        id="cb-acoes"
        num="08"
        title="Ações e Próximos Passos"
        intro="A estratégia para o próximo trimestre cabe em uma frase: parar o vazamento de CTR nas categorias migradas, alinhar a marca com o token “bet” que está vencendo na busca, e começar a construir presença non-branded nas páginas de jogos que já recebem impressões."
      >
        <Card>
          <CardBody className="px-0 py-0">
            <DataTable columns={actionCols} data={cbActions} />
          </CardBody>
        </Card>
        <div className="mt-6">
          <Callout tone="success">
            O canal está saudável e convertendo; o trabalho é não desperdiçar a demanda que já chega.
          </Callout>
        </div>
      </Section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted">
        <div className="mb-3 flex items-center justify-center gap-2">
          <span>Relatório produzido por</span>
          <SeoLabMark height={20} />
        </div>
        Análise de Desempenho SEO — cassino.bet.br · período atual vs. anterior · GA4 de 1 jan a 23 jun
        de 2026.
      </footer>
    </div>
  );
}
