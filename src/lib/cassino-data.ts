// ============================================================================
// Cassino Bet (cassino.bet.br) — Análise de Desempenho SEO
// Período: atual (6m) vs. anterior (6m) · GA4 de 1 jan a 23 jun de 2026.
// ============================================================================

import type { Kpi } from "@/lib/data";

// --- 1. Resumo executivo · KPIs --------------------------------------------
export const cbHeroKpis: Kpi[] = [
  {
    label: "Cliques orgânicos",
    value: "20,68 M",
    sub: "+52,3% vs. semestre anterior (13,58 M)",
    trend: "up",
    accent: "green",
  },
  {
    label: "Posição média (home)",
    value: "1,53",
    sub: "Melhora de 0,35 (era 1,88)",
    trend: "up",
    accent: "violet",
  },
  {
    label: "CTR de marca",
    value: "73,7%",
    sub: "Subiu de 60,1%",
    trend: "up",
    accent: "green",
  },
  {
    label: "Sign-ups orgânicos",
    value: "2,74 M",
    sub: "27,6% de visitante para cadastro",
    trend: "up",
    accent: "blue",
  },
  {
    label: "Pix confirmados",
    value: "1,30 M",
    sub: "47,4% dos sign-ups",
    trend: "up",
    accent: "blue",
  },
  {
    label: "Non-branded",
    value: "1,22 M",
    sub: "+126,3% (5,9% do total)",
    trend: "up",
    accent: "green",
  },
];

// --- 2. Tráfego orgânico: queries atual vs anterior ------------------------
export type CbQueryRow = {
  query: string;
  cliques: number;
  varCliques: string;
  varCliquesNum: number;
  impressoes: number;
  ctr: number;
  posicao: number;
};

export const cbQueries: CbQueryRow[] = [
  { query: "cassino pix", cliques: 7348229, varCliques: "-6,1%", varCliquesNum: -6.1, impressoes: 8694714, ctr: 84.5, posicao: 1.02 },
  { query: "cassino bet", cliques: 5221867, varCliques: "+171,5%", varCliquesNum: 171.5, impressoes: 6508247, ctr: 80.2, posicao: 1.04 },
  { query: "casino bet", cliques: 2259299, varCliques: "+203,6%", varCliquesNum: 203.6, impressoes: 2917252, ctr: 77.5, posicao: 1.42 },
  { query: "casino pix", cliques: 1244986, varCliques: "-6,9%", varCliquesNum: -6.9, impressoes: 1510064, ctr: 82.5, posicao: 1.06 },
  { query: "cassinopix", cliques: 934257, varCliques: "+128,8%", varCliquesNum: 128.8, impressoes: 1527555, ctr: 61.2, posicao: 1.12 },
  { query: "cassino", cliques: 845779, varCliques: "+95,2%", varCliquesNum: 95.2, impressoes: 1867014, ctr: 45.3, posicao: 3.02 },
  { query: "cassinobet", cliques: 811713, varCliques: "+493,9%", varCliquesNum: 493.9, impressoes: 1092206, ctr: 74.3, posicao: 1.26 },
  { query: "cassino bet br", cliques: 199855, varCliques: "+75,1%", varCliquesNum: 75.1, impressoes: 245264, ctr: 81.5, posicao: 1.01 },
  { query: "cassino pix bet", cliques: 152271, varCliques: "+24,9%", varCliquesNum: 24.9, impressoes: 189131, ctr: 80.5, posicao: 1.25 },
  { query: "casino", cliques: 114362, varCliques: "+760,6%", varCliquesNum: 760.6, impressoes: 451796, ctr: 25.3, posicao: 3.74 },
];

export type CbAggRow = {
  metrica: string;
  atual: string;
  anterior: string;
  variacao: string;
};

export const cbAggregate: CbAggRow[] = [
  { metrica: "Cliques totais", atual: "20.684.978", anterior: "13.578.712", variacao: "+52,3%" },
  { metrica: "Impressões totais", atual: "27.832.792", anterior: "21.781.409", variacao: "+27,8%" },
  { metrica: "Branded (cliques)", atual: "19.468.238", anterior: "13.040.955", variacao: "+49,3%" },
  { metrica: "Non-branded (cliques)", atual: "1.216.740", anterior: "537.757", variacao: "+126,3%" },
  { metrica: "Homepage (cliques)", atual: "19.197.667", anterior: "13.250.289", variacao: "+44,9%" },
  { metrica: "Homepage (posição média)", atual: "1,53", anterior: "1,88", variacao: "melhora 0,35" },
];

// Branded vs non-branded (gráfico)
export const cbBrandedSplit = [
  { tipo: "Branded", anterior: 13040955, atual: 19468238 },
  { tipo: "Non-branded", anterior: 537757, atual: 1216740 },
];

// --- 3. Engenharia reversa: 'cassino pix' ----------------------------------
export type CbReverseRow = {
  indicador: string;
  atual: string;
  anterior: string;
  variacao: string;
};

export const cbReverse: CbReverseRow[] = [
  { indicador: "Cliques 'cassino pix'", atual: "7.348.229", anterior: "7.828.200", variacao: "-6,1%" },
  { indicador: "Impressões 'cassino pix'", atual: "8.694.714", anterior: "10.737.611", variacao: "-19,0%" },
  { indicador: "CTR 'cassino pix'", atual: "84,5%", anterior: "72,9%", variacao: "+11,6 p.p." },
  { indicador: "Posição 'cassino pix'", atual: "1,02", anterior: "1,00", variacao: "estável" },
  { indicador: "Cliques 'cassino bet'", atual: "5.221.867", anterior: "1.923.086", variacao: "+171,5%" },
  { indicador: "Cliques 'cassinobet'", atual: "811.713", anterior: "136.658", variacao: "+493,9%" },
];

// Migração de token (gráfico): atual vs anterior por query
export const cbTokenMigration = [
  { query: "cassino pix", anterior: 7828200, atual: 7348229 },
  { query: "cassino bet", anterior: 1923086, atual: 5221867 },
  { query: "cassinobet", anterior: 136658, atual: 811713 },
];

// Comparação ano a ano (últimos 3 meses)
export const cbYoY = [
  { query: "cassino pix", anterior: 3680000, atual: 2730000 },
  { query: "cassino bet", anterior: 342000, atual: 2300000 },
];

export const cbReverseRecs = [
  "Liderar com 'Cassino Bet' nas title tags e na comunicação, mantendo 'pix' como termo secundário. O token vencedor deve ocupar a posição de maior peso.",
  "Não tratar a queda de 'cassino pix' como incidente — é comportamento esperado de uma marca composta por palavras genéricas. Comunicar isso ao cliente evita decisões de pânico.",
  "Monitorar a razão cliques 'cassino bet' / 'cassino pix' mês a mês. Quando estabilizar, a migração de token terá concluído.",
];

// --- 4. Migração /games → /cassino e vazamento de CTR ----------------------
export type CbMigrationRow = {
  pagina: string;
  cliques: number;
  impressoes: number | null;
  ctr: number | null;
  status: string;
};

export const cbMigration: CbMigrationRow[] = [
  { pagina: "/games/category/all (antiga)", cliques: 23461, impressoes: null, ctr: null, status: "-92,3%" },
  { pagina: "/cassino/categoria/todos-os-jogos", cliques: 8993, impressoes: 508399, ctr: 1.77, status: "nova" },
  { pagina: "/cassino/categoria/cassino-ao-vivo", cliques: 15804, impressoes: 502855, ctr: 3.14, status: "nova" },
  { pagina: "/cassino/provedores", cliques: 15654, impressoes: 603394, ctr: 2.59, status: "nova" },
  { pagina: "/cassino (hub)", cliques: 347381, impressoes: 856994, ctr: 40.5, status: "nova" },
  { pagina: "/games/category/compre-rodadas", cliques: 186042, impressoes: 2386643, ctr: 7.8, status: "ativa" },
  { pagina: "/games/pragmaticplay/speed-auto-roulette", cliques: 7594, impressoes: 1217930, ctr: 0.62, status: "ativa" },
];

export const cbMigrationRecs = [
  "Reescrever title e meta das três categorias novas em português, carregando o termo de busca exato no início do título (ex.: abrir com 'Jogos de Cassino' e incluir 'pix').",
  "Confirmar que H1 e conteúdo principal das páginas /cassino/categoria/* são renderizados via SSR antes da hidratação do Nuxt, e que links internos saem como <a href> estáticos no HTML inicial.",
  "Completar o mapa de redirecionamento /games → /cassino para eliminar 404 residuais. Validar com curl: 301 na origem, 200 no destino.",
  "Priorizar /games/pragmaticplay/speed-auto-roulette e /games/category/compre-rodadas na reescrita de snippet pelo volume de impressões já existente.",
];

// --- 5. Non-branded e a query-ponte 'cassino' ------------------------------
export const cbNonBrandedStats = [
  { label: "Non-branded (atual)", value: "1,22 M", sub: "de 537 mil (+126,3%)" },
  { label: "% do total", value: "5,9%", sub: "ainda dependente da marca" },
  { label: "Query 'cassino'", value: "845 mil", sub: "1,87 M impressões · CTR 45,3%" },
  { label: "Posição 'cassino'", value: "3,02", sub: "piorou de 2,67" },
];

export const cbNonBrandedRecs = [
  "Verificar na SERP, em modo anônimo, qual resultado ocupa a posição 2 para 'cassino' e se há canibalização interna ou avanço de concorrente.",
  "Reforçar a linkagem interna da homepage para o hub /cassino com âncora 'cassino online', consolidando o sinal de página transacional prioritária.",
  "Construir conteúdo editorial nas páginas de jogos de maior tração orgânica (fortune-rabbit, fortune-tiger, fortune-dragon, tigre-sortudo), que já recebem sessões mas não rankeiam para as queries genéricas do jogo.",
];

// --- 6. Funil de conversão orgânica (GA4) ----------------------------------
export type CbFunnelRow = {
  etapa: string;
  usuarios: number;
  conversao: string;
};

export const cbFunnel: CbFunnelRow[] = [
  { etapa: "page_view", usuarios: 9943889, conversao: "—" },
  { etapa: "view_item", usuarios: 1930964, conversao: "19,4%" },
  { etapa: "cadastro", usuarios: 3001069, conversao: "—" },
  { etapa: "sign_up", usuarios: 2741722, conversao: "27,6% do total de visitantes" },
  { etapa: "JF-pix-confirmado", usuarios: 1300417, conversao: "47,4% dos sign-ups" },
  { etapa: "JF-pix-confirmado-ftd", usuarios: 27377, conversao: "primeiro depósito" },
  { etapa: "purchase", usuarios: 12259, conversao: "receita: R$ 780.691" },
];

// Funil para gráfico (etapas principais, em ordem de jornada)
export const cbFunnelChart = [
  { etapa: "page_view", usuarios: 9943889 },
  { etapa: "view_item", usuarios: 1930964 },
  { etapa: "sign_up", usuarios: 2741722 },
  { etapa: "Pix confirmado", usuarios: 1300417 },
  { etapa: "purchase", usuarios: 12259 },
];

export const cbLandingNote =
  "Por landing page, o tráfego orgânico se concentra na homepage (15,6 M de sessões), seguida de /usuario/premios, /cassino, /sports e das páginas de jogos da PG Soft — todas com session key event rate de 1,0.";

// --- 7. Saúde técnica e subdomínios ----------------------------------------
export const cbTech = [
  {
    title: "Subdomínio jogoresponsavel",
    tone: "warning" as const,
    body: "jogoresponsavel.cassino.bet.br passou de zero para 120.402 cliques no período, em posição média 2,6. É obrigatório por lei, então não se trata de removê-lo — mas ele intercepta espaço de SERP em buscas de marca que poderiam rotear para a homepage, que converte melhor. Garantir que cumpra a função legal sem competir por queries puramente transacionais.",
  },
  {
    title: "Migração de blog",
    tone: "info" as const,
    body: "O blog ainda aparece distribuído entre /blog no domínio principal (66 mil cliques, já indexando bem) e o subdomínio blog.cassino.bet.br (resíduo de 124 cliques). Concluir a consolidação em cassino.bet.br/blog mantém a transferência de autoridade para o domínio principal.",
  },
  {
    title: "Foto técnica geral",
    tone: "success" as const,
    body: "Positiva: a homepage melhorou posição e CTR, as páginas novas estão sendo indexadas, e o volume de impressões cresceu 27,8% sem sinal de penalização.",
  },
];

// --- 8. Ações e próximos passos --------------------------------------------
export type CbActionRow = {
  acao: string;
  responsavel: string;
  prazo: string;
  prioridade: string;
};

export const cbActions: CbActionRow[] = [
  { acao: "Reescrever title/meta das 3 categorias novas /cassino/categoria/*", responsavel: "SEO + Cactus", prazo: "Próximo sprint", prioridade: "Alta" },
  { acao: "Confirmar SSR de H1 e links <a href> estáticos nas categorias novas", responsavel: "Cactus", prazo: "Próximo deploy", prioridade: "Alta" },
  { acao: "Liderar com 'Cassino Bet' nos títulos da home e categorias", responsavel: "SEO + Cactus", prazo: "Próximo sprint", prioridade: "Alta" },
  { acao: "Completar mapa de redirecionamento /games → /cassino (301)", responsavel: "Cactus", prazo: "Próximo deploy", prioridade: "Alta" },
  { acao: "Reescrever snippet de speed-auto-roulette e compre-rodadas", responsavel: "SEO", prazo: "2 semanas", prioridade: "Média" },
  { acao: "Verificar SERP de 'cassino' (posição 2) e canibalização interna", responsavel: "SEO", prazo: "1 semana", prioridade: "Média" },
  { acao: "Conteúdo editorial nas páginas de jogos de maior tração orgânica", responsavel: "SEO", prazo: "Q3", prioridade: "Média" },
  { acao: "Consolidar blog em cassino.bet.br/blog", responsavel: "Cactus", prazo: "Q3", prioridade: "Baixa" },
  { acao: "Monitorar razão cliques 'cassino bet' / 'cassino pix' mensal", responsavel: "SEO", prazo: "Contínuo", prioridade: "Acompanhamento" },
];

// --- Navegação -------------------------------------------------------------
export const cbSections = [
  { id: "cb-resumo", label: "Resumo Executivo", num: "01" },
  { id: "cb-trafego", label: "Tráfego Orgânico", num: "02" },
  { id: "cb-cassino-pix", label: "Caso 'cassino pix'", num: "03" },
  { id: "cb-migracao", label: "Migração /games → /cassino", num: "04" },
  { id: "cb-non-branded", label: "Non-branded & 'cassino'", num: "05" },
  { id: "cb-funil", label: "Funil GA4", num: "06" },
  { id: "cb-tecnica", label: "Saúde Técnica", num: "07" },
  { id: "cb-acoes", label: "Ações & Próximos Passos", num: "08" },
];
