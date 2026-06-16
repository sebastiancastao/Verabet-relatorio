// ============================================================================
// VeraBet — Análise de Desempenho SEO 2026
// Dados extraídos do relatório (Q1 consolidado + atualização de junho de 2026).
// ============================================================================

// --- KPIs do resumo executivo ---------------------------------------------
export type Kpi = {
  label: string;
  value: string;
  sub?: string;
  trend?: "up" | "down" | "neutral";
  accent?: "green" | "blue" | "amber" | "violet";
};

export const heroKpis: Kpi[] = [
  {
    label: "Cliques Q1 2026",
    value: "6.349.557",
    sub: "Um dos melhores trimestres da história",
    trend: "up",
    accent: "green",
  },
  {
    label: "Q2 acumulado (77 dias)",
    value: "~5,39 M",
    sub: "85% do total do Q1 já alcançado",
    trend: "up",
    accent: "blue",
  },
  {
    label: "Últimos 28 dias",
    value: "2.272.344",
    sub: "+29,2% vs. período anterior",
    trend: "up",
    accent: "green",
  },
  {
    label: "Posição média (28d)",
    value: "1,07",
    sub: "Melhora forte vs. 1,39 no Q1",
    trend: "up",
    accent: "violet",
  },
  {
    label: "CTR estimada Q2",
    value: "72,9%",
    sub: "Acima dos 70,4% do Q1",
    trend: "up",
    accent: "green",
  },
  {
    label: "Páginas indexadas",
    value: "2.022",
    sub: "+188% (de 702 em 20/mar)",
    trend: "up",
    accent: "blue",
  },
];

// --- 2.1 Performance mensal do Q1 ------------------------------------------
export type MonthRow = {
  mes: string;
  cliques: number;
  impressoes: number;
  ctr: number;
  posicao: number;
};

export const q1Monthly: MonthRow[] = [
  { mes: "Janeiro", cliques: 2216410, impressoes: 3241040, ctr: 68.4, posicao: 1.36 },
  { mes: "Fevereiro", cliques: 2083884, impressoes: 2961201, ctr: 70.4, posicao: 1.43 },
  { mes: "Março", cliques: 2049263, impressoes: 2823369, ctr: 72.6, posicao: 1.39 },
];

export const q1Total: MonthRow = {
  mes: "Q1 total",
  cliques: 6349557,
  impressoes: 9025610,
  ctr: 70.4,
  posicao: 1.39,
};

// --- 2.2 Variação mês a mês no Q1 ------------------------------------------
export type VariationRow = {
  metrica: string;
  fevJan: string;
  marFev: string;
};

export const q1MoM: VariationRow[] = [
  { metrica: "Cliques", fevJan: "-132.526 (-5,98%)", marFev: "-34.621 (-1,66%)" },
  { metrica: "Impressões", fevJan: "-279.839 (-8,63%)", marFev: "-137.832 (-4,65%)" },
  { metrica: "CTR", fevJan: "+2,0 p.p.", marFev: "+2,2 p.p." },
  { metrica: "Posição média", fevJan: "-0,07", marFev: "+0,04" },
];

// --- 3.1 Q2 acumulado vs Q1 ------------------------------------------------
export type CompareRow = {
  metrica: string;
  q1: string;
  q2: string;
  leitura: string;
};

export const q2vsQ1: CompareRow[] = [
  { metrica: "Cliques", q1: "6.349.557", q2: "~5.389.652", leitura: "Q2 a 85% do total do Q1" },
  { metrica: "Ritmo diário", q1: "69.775 / dia", q2: "69.995 / dia", leitura: "Q2 já acima do ritmo do Q1" },
  { metrica: "Impressões", q1: "9.025.610", q2: "~7.396.831", leitura: "Em linha proporcional" },
  { metrica: "CTR", q1: "70,4%", q2: "~72,9%", leitura: "Q2 superior ao Q1" },
  { metrica: "Posição média (28d)", q1: "1,39", q2: "1,07", leitura: "Melhora forte" },
];

// Ritmo diário comparativo (para gráfico)
export const dailyRate = [
  { periodo: "Q1 (91 dias)", ritmo: 69775 },
  { periodo: "Q2 acum. (77 dias)", ritmo: 69995 },
];

// --- 3.2 Reconstrução mensal estimada do Q2 --------------------------------
export type Q2MonthRow = {
  mes: string;
  cliques: number;
  ritmo: number;
  leitura: string;
  projetado?: boolean;
};

export const q2Monthly: Q2MonthRow[] = [
  { mes: "Abril", cliques: 1901000, ritmo: 63400, leitura: "Vale do trimestre" },
  { mes: "Maio", cliques: 2190000, ritmo: 70600, leitura: "Recuperação" },
  { mes: "Junho (1–16)", cliques: 1298000, ritmo: 81200, leitura: "Parcial, melhor ritmo" },
  { mes: "Junho (proj.)", cliques: 2435000, ritmo: 81200, leitura: "Projeção do mês fechado", projetado: true },
];

// --- 3.3 Janelas móveis recentes -------------------------------------------
export type WindowRow = {
  periodo: string;
  cliques: number;
  vsAnterior: string;
  vsAnteriorNum: number;
  impressoes: number;
  ctr: number;
  posicao: number;
};

export const rollingWindows: WindowRow[] = [
  { periodo: "Últimos 28 dias", cliques: 2272344, vsAnterior: "+29,2%", vsAnteriorNum: 29.2, impressoes: 3127570, ctr: 72.66, posicao: 1.07 },
  { periodo: "Últimos 3 meses", cliques: 6381231, vsAnterior: "+5,4%", vsAnteriorNum: 5.4, impressoes: 8762977, ctr: 72.82, posicao: 1.17 },
  { periodo: "Últimos 6 meses", cliques: 12434646, vsAnterior: "+229,0%", vsAnteriorNum: 229.0, impressoes: 17465428, ctr: 71.2, posicao: 1.25 },
];

// --- 3.4 Projeção de fechamento do Q2 --------------------------------------
export type ScenarioRow = {
  cenario: string;
  premissa: string;
  q2: number;
  vsQ1: string;
  vsQ1Num: number;
};

export const projection: ScenarioRow[] = [
  {
    cenario: "Conservador",
    premissa: "77 dias reais + ritmo dos últimos 28 dias nos 14 dias restantes",
    q2: 6526000,
    vsQ1: "+2,8%",
    vsQ1Num: 2.8,
  },
  {
    cenario: "Aceleração sustentada",
    premissa: "Ritmo dos últimos 28 dias aplicado a todo o trimestre",
    q2: 7385000,
    vsQ1: "+16,3%",
    vsQ1Num: 16.3,
  },
];

export const q1Reference = 6349557;

// --- 4.1 Sign-ups por mês (GA4) --------------------------------------------
export type SignupRow = {
  mes: string;
  signup: number;
  status: string;
  valido: boolean;
};

export const signups: SignupRow[] = [
  { mes: "Fevereiro", signup: 8770, status: "Mês válido", valido: true },
  { mes: "Março", signup: 12510, status: "Mês válido, pico", valido: true },
  { mes: "Abril", signup: 2, status: "Arquivo corrompido, não comparável", valido: false },
  { mes: "Maio", signup: 9571, status: "Mês válido", valido: true },
];

export type BusinessMetricRow = {
  metrica: string;
  meta: string;
  fev: string;
  mar: string;
  maio: string;
  status: string;
};

export const businessMetrics: BusinessMetricRow[] = [
  {
    metrica: "Sign-Ups Orgânicos / sign_up GA4",
    meta: "8.525",
    fev: "8.770",
    mar: "12.510",
    maio: "9.571",
    status: "Acima da meta nos meses disponíveis",
  },
  {
    metrica: "% da Meta Mensal",
    meta: "100%",
    fev: "102,9%",
    mar: "146,7%",
    maio: "112,3%",
    status: "Maio segue acima da meta mensal",
  },
  {
    metrica: "Variação Mês a Mês",
    meta: "—",
    fev: "Base",
    mar: "+42,6%",
    maio: "-23,5% vs. março",
    status: "Ajuste após pico de março, mas ainda acima da meta",
  },
  {
    metrica: "Acumulado Fev+Mar+Mai",
    meta: "25.575",
    fev: "30.851",
    mar: "—",
    maio: "—",
    status: "+20,6% vs. meta acumulada",
  },
];

// --- 4.2 Funil de maio 2026 ------------------------------------------------
export type FunnelRow = {
  relacao: string;
  resultado: string;
  pct?: number;
};

export const funnelConsolidado: FunnelRow[] = [
  { relacao: "Sign-ups / First visits", resultado: "2,66%", pct: 2.66 },
  { relacao: "First deposits / Sign-ups", resultado: "54,00%", pct: 54 },
  { relacao: "Purchases / Sign-ups", resultado: "54,00%", pct: 54 },
  { relacao: "Pix confirmado / Pix generated", resultado: "55,77%", pct: 55.77 },
  { relacao: "Sign-ups / View modal cadastro", resultado: "20,40%", pct: 20.4 },
  { relacao: "Login / View modal login", resultado: "73,28%", pct: 73.28 },
  { relacao: "Receita média por purchase", resultado: "R$ 6,96" },
  { relacao: "Receita média por usuário comprador", resultado: "R$ 7,42" },
];

export const funnelMaio: FunnelRow[] = [
  { relacao: "Sign-ups / First visits", resultado: "2,66%", pct: 2.66 },
  { relacao: "First deposits / Sign-ups", resultado: "53,98%", pct: 53.98 },
  { relacao: "Purchases / Sign-ups", resultado: "53,99%", pct: 53.99 },
  { relacao: "Pix confirmado / Pix generated", resultado: "55,78%", pct: 55.78 },
  { relacao: "Sign-ups / View modal cadastro", resultado: "20,40%", pct: 20.4 },
  { relacao: "Login / View modal login", resultado: "73,29%", pct: 73.29 },
  { relacao: "Receita média por purchase", resultado: "R$ 6,96" },
  { relacao: "Receita média por usuário comprador", resultado: "R$ 7,42" },
];

export type Ga4EventRow = {
  evento: string;
  eventos: number;
  usuarios: number;
  leitura: string;
};

export const ga4EventsConsolidated: Ga4EventRow[] = [
  { evento: "page_view", eventos: 9319545, usuarios: 551252, leitura: "Alto volume de navegação" },
  { evento: "view_item_list", eventos: 1598588, usuarios: 138112, leitura: "Forte interação com listas de jogos" },
  { evento: "session_start", eventos: 596602, usuarios: 408014, leitura: "Base ampla de sessões" },
  { evento: "view_game_page", eventos: 590323, usuarios: 144394, leitura: "Alta interação com páginas de jogos" },
  { evento: "view_modal_login", eventos: 562791, usuarios: 193255, leitura: "Login é um ponto recorrente da jornada" },
  { evento: "user_engagement", eventos: 484531, usuarios: 221807, leitura: "Boa base de usuários engajados" },
  { evento: "form_start", eventos: 382739, usuarios: 209181, leitura: "Forte intenção de cadastro/formulário" },
  { evento: "first_visit", eventos: 371946, usuarios: 360981, leitura: "Forte aquisição de novos usuários" },
  { evento: "view_promotion", eventos: 336928, usuarios: 144698, leitura: "Promoções têm peso relevante" },
  { evento: "login", eventos: 326657, usuarios: 141624, leitura: "Boa recorrência de usuários autenticados" },
  { evento: "pix_generated", eventos: 114103, usuarios: 50640, leitura: "Alta intenção de depósito via Pix" },
  { evento: "pix_confirmado", eventos: 53707, usuarios: 28242, leitura: "Conversão relevante após geração de Pix" },
  { evento: "sign_up", eventos: 9573, usuarios: 9607, leitura: "Cadastros efetivos registrados" },
  { evento: "first_deposit", eventos: 5554, usuarios: 5188, leitura: "Primeiros depósitos confirmados" },
  { evento: "pix_confirmado_ftd", eventos: 5553, usuarios: 5187, leitura: "Confirmação de Pix associada ao primeiro depósito" },
  { evento: "purchase", eventos: 5528, usuarios: 5188, leitura: "Receita registrada de R$ 38.470,74" },
];

export const ga4EventsMay: Ga4EventRow[] = [
  { evento: "page_view", eventos: 9318898, usuarios: 551252, leitura: "Alto volume de navegação" },
  { evento: "view_item_list", eventos: 1598579, usuarios: 138112, leitura: "Forte interação com listas de jogos" },
  { evento: "session_start", eventos: 596467, usuarios: 407994, leitura: "Base ampla de sessões" },
  { evento: "view_game_page", eventos: 590293, usuarios: 144394, leitura: "Alta interação com páginas de jogos" },
  { evento: "view_modal_login", eventos: 562732, usuarios: 193237, leitura: "Login é um ponto recorrente da jornada" },
  { evento: "user_engagement", eventos: 484372, usuarios: 221760, leitura: "Boa base de usuários engajados" },
  { evento: "form_start", eventos: 382709, usuarios: 209181, leitura: "Forte intenção de cadastro/formulário" },
  { evento: "first_visit", eventos: 371908, usuarios: 360981, leitura: "Forte aquisição de novos usuários" },
  { evento: "view_promotion", eventos: 336871, usuarios: 144692, leitura: "Promoções seguem relevantes" },
  { evento: "login", eventos: 326633, usuarios: 141624, leitura: "Boa recorrência de usuários autenticados" },
  { evento: "pix_generated", eventos: 114097, usuarios: 50632, leitura: "Alta intenção de depósito via Pix" },
  { evento: "pix_confirmado", eventos: 53706, usuarios: 28242, leitura: "Conversão relevante após geração de Pix" },
  { evento: "sign_up", eventos: 9571, usuarios: 9606, leitura: "Cadastros efetivos registrados" },
  { evento: "first_deposit", eventos: 5551, usuarios: 5185, leitura: "Primeiros depósitos confirmados" },
  { evento: "pix_confirmado_ftd", eventos: 5551, usuarios: 5185, leitura: "Confirmação de Pix associada ao primeiro depósito" },
  { evento: "purchase", eventos: 5526, usuarios: 5186, leitura: "Receita registrada de R$ 38.466,53" },
];

// --- 5.1 Queries de marca (últimos 28 dias) --------------------------------
export type QueryRow = {
  query: string;
  cliques: number;
  impressoes: number;
  ctr: number;
  posicao: number;
  diagnostico: string;
};

export const brandQueries: QueryRow[] = [
  { query: "verabet", cliques: 1284971, impressoes: 1722499, ctr: 74.6, posicao: 1.0, diagnostico: "Posição ideal" },
  { query: "vera bet", cliques: 706427, impressoes: 931417, ctr: 75.84, posicao: 1.0, diagnostico: "Posição ideal" },
  { query: "vera bet br", cliques: 41354, impressoes: 50783, ctr: 81.43, posicao: 1.0, diagnostico: "Excelente" },
  { query: "vera bet login", cliques: 30168, impressoes: 37884, ctr: 79.63, posicao: 1.01, diagnostico: "Alta intenção" },
  { query: "verabet login", cliques: 18407, impressoes: 21712, ctr: 84.78, posicao: 1.01, diagnostico: "Máxima intenção" },
  { query: "vera bet casino", cliques: 16306, impressoes: 26540, ctr: 61.44, posicao: 1.02, diagnostico: "Forte" },
  { query: "bet vera", cliques: 13401, impressoes: 19721, ctr: 67.95, posicao: 1.22, diagnostico: "Boa, mas pode melhorar" },
  { query: "betvera", cliques: 24866, impressoes: 84841, ctr: 29.31, posicao: 2.22, diagnostico: "Variante fraca" },
];

export type NonBrandedQueryRow = {
  query: string;
  cliques: number;
  impressoes: number;
  ctr: number;
  posicao: number;
  diagnostico: string;
};

export const nonBrandedQueries: NonBrandedQueryRow[] = [
  { query: "roleta brasileira", cliques: 3, impressoes: 250, ctr: 1.2, posicao: 22.07, diagnostico: "Melhorou, mas ainda fora da zona útil" },
  { query: "spribe mines", cliques: 0, impressoes: 448, ctr: 0, posicao: 73.87, diagnostico: "Fora da zona competitiva" },
  { query: "master joker", cliques: 1, impressoes: 664, ctr: 0.15, posicao: 20.77, diagnostico: "Oportunidade editorial clara" },
  { query: "jogo do aviãozinho", cliques: 0, impressoes: 844, ctr: 0, posicao: 46.56, diagnostico: "Demanda existe, mas sem captura" },
  { query: "como jogar sweet bonanza", cliques: 0, impressoes: 298, ctr: 0, posicao: 61.37, diagnostico: "Precisa de guia otimizado" },
  { query: "super 7s pragmatic play", cliques: 1, impressoes: 119, ctr: 0.84, posicao: 5.67, diagnostico: "Boa posição, mas pouco volume capturado" },
  { query: "jogapix", cliques: 4, impressoes: 112, ctr: 3.57, posicao: 9.48, diagnostico: "Já aparece em zona útil" },
];

// --- 5.2 Páginas com maior potencial ---------------------------------------
export type PageRow = {
  pagina: string;
  cliques: number;
  impressoes: number;
  ctr: number;
  posicao: number;
};

export const pages: PageRow[] = [
  { pagina: "/cassino/categoria/todos-os-jogos", cliques: 2166274, impressoes: 3046403, ctr: 71.11, posicao: 1.07 },
  { pagina: "/blog", cliques: 25962, impressoes: 937792, ctr: 2.77, posicao: 3.49 },
  { pagina: "/esportes", cliques: 14784, impressoes: 256825, ctr: 5.76, posicao: 3.28 },
  { pagina: "/cassino/jogar/spribe/mines", cliques: 3138, impressoes: 234016, ctr: 1.34, posicao: 3.42 },
  { pagina: "/promocoes", cliques: 6813, impressoes: 215789, ctr: 3.16, posicao: 3.57 },
  { pagina: "/cassino/jogar/banana/tigre-da-sorte", cliques: 654, impressoes: 190751, ctr: 0.34, posicao: 6.31 },
  { pagina: "/cassino/jogar/pragmaticplay/master-joker", cliques: 430, impressoes: 171024, ctr: 0.25, posicao: 6.44 },
  { pagina: "/cassino/categoria/cassino-ao-vivo", cliques: 1136, impressoes: 162380, ctr: 0.7, posicao: 6.08 },
];

export type OpportunityMetricRow = {
  metrica: string;
  atual: string;
  anterior: string;
  variacao: string;
};

export const blogMetrics: OpportunityMetricRow[] = [
  { metrica: "Cliques", atual: "25.962", anterior: "3.859", variacao: "+572,8%" },
  { metrica: "Impressões", atual: "937.792", anterior: "165.135", variacao: "+467,9%" },
  { metrica: "CTR", atual: "2,77%", anterior: "2,34%", variacao: "+0,43 p.p." },
  { metrica: "Posição média", atual: "3,49", anterior: "4,15", variacao: "Melhora" },
];

export const blogActions = [
  "Revisar os posts com maior volume de impressões.",
  "Reescrever titles e meta descriptions com intenção mais direta.",
  "Adicionar FAQs e blocos de como jogar.",
  "Inserir links internos para páginas transacionais.",
  "Criar clusters por jogo, categoria e intenção de busca.",
  "Usar CTAs claros para cadastro e jogo.",
];

// --- 6. Oportunidade em Esportes -------------------------------------------
export type EsporteRow = {
  metrica: string;
  atual: string;
  anterior: string;
  variacao: string;
};

export const esportes: EsporteRow[] = [
  { metrica: "Cliques", atual: "14.784", anterior: "2.306", variacao: "+541,1%" },
  { metrica: "Impressões", atual: "256.825", anterior: "47.618", variacao: "+439,3%" },
  { metrica: "CTR", atual: "5,76%", anterior: "4,84%", variacao: "+0,92 p.p." },
  { metrica: "Posição média", atual: "3,28", anterior: "4,56", variacao: "Melhora" },
];

export const esportesChart = [
  { metrica: "Cliques", anterior: 2306, atual: 14784 },
  { metrica: "Impressões", anterior: 47618, atual: 256825 },
];

// --- 7.1 Evolução da indexação no Q2 ---------------------------------------
export type IndexRow = {
  data: string;
  indexadas: number;
  naoIndexadas: number;
  pct: number;
};

export const indexing: IndexRow[] = [
  { data: "20 mar", indexadas: 702, naoIndexadas: 4640, pct: 13.1 },
  { data: "1 abr", indexadas: 762, naoIndexadas: 4307, pct: 15.0 },
  { data: "20 abr", indexadas: 658, naoIndexadas: 4896, pct: 11.8 },
  { data: "1 mai", indexadas: 864, naoIndexadas: 4818, pct: 15.2 },
  { data: "15 mai", indexadas: 1494, naoIndexadas: 4481, pct: 25.0 },
  { data: "1 jun", indexadas: 1903, naoIndexadas: 4486, pct: 29.8 },
  { data: "11 jun", indexadas: 2022, naoIndexadas: 4506, pct: 31.0 },
];

// --- 7.2 Composição das páginas não indexadas (11 jun) ---------------------
export type CompositionRow = {
  motivo: string;
  paginas: number;
  tipo: string;
  pct: number;
};

export const nonIndexedComposition: CompositionRow[] = [
  { motivo: "Crawled, currently not indexed", paginas: 3063, tipo: "Decisão do Google", pct: 68.0 },
  { motivo: "Page with redirect", paginas: 679, tipo: "Técnico, ajustável", pct: 15.1 },
  { motivo: "Not found (404)", paginas: 436, tipo: "Técnico, ajustável", pct: 9.7 },
  { motivo: "Duplicate, Google chose canonical", paginas: 116, tipo: "Canonical", pct: 2.6 },
  { motivo: "Alternate page w/ proper canonical", paginas: 95, tipo: "Esperado", pct: 2.1 },
  { motivo: "Soft 404", paginas: 61, tipo: "Técnico, ajustável", pct: 1.4 },
  { motivo: "Excluded by noindex", paginas: 26, tipo: "Intencional", pct: 0.6 },
  { motivo: "Blocked by robots.txt", paginas: 17, tipo: "Intencional", pct: 0.4 },
  { motivo: "Outros (5xx, redirect error, dup.)", paginas: 13, tipo: "Misto", pct: 0.3 },
];

// --- 8. Mapa de prioridades ------------------------------------------------
export type PriorityRow = {
  n: number;
  acao: string;
  alvo: string;
  esforco: string;
  impacto: string;
};

export const priorities: PriorityRow[] = [
  { n: 1, acao: "Blindar posição 1 de “verabet” e “vera bet”", alvo: "Queries principais de marca", esforco: "Baixo", impacto: "Preservar maior fonte de tráfego orgânico" },
  { n: 2, acao: "Corrigir variante “betvera”", alvo: "betvera", esforco: "Baixo-médio", impacto: "Aumentar CTR e recuperar tráfego de marca subutilizado" },
  { n: 3, acao: "Otimizar CTR do Blog", alvo: "/blog", esforco: "Médio", impacto: "Capturar parte das 937k impressões recentes" },
  { n: 4, acao: "Expandir arquitetura de Esportes", alvo: "/esportes e subclusters", esforco: "Médio-alto", impacto: "Escalar aquisição em apostas esportivas" },
  { n: 5, acao: "Reescrever titles e metas de páginas com alta impressão e CTR baixo", alvo: "Mines, Master Joker, Tigre da Sorte, Cassino ao Vivo", esforco: "Baixo-médio", impacto: "Ganho rápido sem depender de novas páginas" },
  { n: 6, acao: "Criar conteúdo editorial nas páginas de jogos", alvo: "Roleta Brasileira, Mines, Master Joker, Sweet Bonanza, Aviator", esforco: "Médio", impacto: "Melhorar posições non-branded" },
  { n: 7, acao: "Fortalecer linkagem interna entre Blog, Cassino, Jogos e Promoções", alvo: "Hubs e páginas de jogo", esforco: "Médio", impacto: "Distribuir autoridade" },
  { n: 8, acao: "Validar eventos GA4 por canal", alvo: "Organic Search / All Users", esforco: "Baixo", impacto: "Medir impacto real do SEO em sign-up, FTD e purchase" },
  { n: 9, acao: "Melhorar conversão entre modal de cadastro e sign-up", alvo: "view_modal_cadastro → sign_up", esforco: "Médio", impacto: "Aumentar cadastros sem depender de mais tráfego" },
];

export type ActionPlanBlock = {
  title: string;
  summary: string;
  actions: string[];
};

export const actionPlan: ActionPlanBlock[] = [
  {
    title: "Branded SEO",
    summary: "A marca está forte, mas precisa ser protegida.",
    actions: [
      "Monitorar semanalmente “verabet”, “vera bet”, “betvera”, “bet vera”, “vera bet login” e “vera bet casino”.",
      "Revisar snippets das páginas que aparecem para “betvera”.",
      "Usar variações de marca em links internos.",
      "Ajustar textos institucionais para incluir variações naturais da marca.",
      "Garantir que a home continue sendo o principal resultado para as buscas mais amplas de marca.",
    ],
  },
  {
    title: "Blog como Motor de Aquisição",
    summary: "O blog tem quase 1 milhão de impressões nos últimos 28 dias, mas CTR inferior a 3%.",
    actions: blogActions,
  },
  {
    title: "Esportes",
    summary: "A página /esportes já mostrou tração e precisa evoluir para um hub mais robusto.",
    actions: [
      "Criar conteúdos de apoio sobre como apostar em futebol, MMA e eventos ao vivo.",
      "Trabalhar páginas ou blocos específicos para “apostas esportivas”, “apostas ao vivo” e “palpites”.",
      "Adicionar conteúdo textual indexável, FAQs e marcação schema.",
      "Criar links internos entre Blog, Esportes e Promoções.",
      "Monitorar se o tráfego vem de termos genéricos ou de marca.",
    ],
  },
  {
    title: "Páginas de Jogos",
    summary: "Mines, Master Joker, Tigre da Sorte e Roleta Brasileira precisam de reforço editorial.",
    actions: [
      "Adicionar descrição clara do jogo, regras principais e recursos.",
      "Criar blocos de como jogar e perguntas frequentes.",
      "Incluir termos relacionados e links internos para jogos semelhantes.",
      "Usar CTAs claros para jogar.",
    ],
  },
  {
    title: "Conversão e Eventos GA4",
    summary: "O avanço de sign-up para first deposit é forte; a oportunidade está antes do cadastro.",
    actions: [
      "Revisar experiência do modal de cadastro.",
      "Testar mensagens de bônus, segurança e facilidade de depósito.",
      "Medir abandono entre view_modal_cadastro, form_start e sign_up.",
      "Criar relatório mensal separado por canal: Organic Search, Paid, Direct e Referral.",
      "Validar se purchase, first_deposit e pix_confirmado_ftd estão corretamente configurados.",
      "Criar uma visualização específica para SEO com eventos de conversão.",
    ],
  },
];

// --- Navegação -------------------------------------------------------------
export const sections = [
  { id: "resumo", label: "Resumo Executivo", num: "01" },
  { id: "q1", label: "Q1 Consolidado", num: "02" },
  { id: "q2", label: "Q2 em Andamento", num: "03" },
  { id: "ga4", label: "Métrica de Negócio", num: "04" },
  { id: "queries", label: "Queries & Páginas", num: "05" },
  { id: "blog", label: "Blog & Conteúdo", num: "06" },
  { id: "esportes", label: "Oportunidade Esportes", num: "07" },
  { id: "eventos-maio", label: "Eventos de Maio", num: "08" },
  { id: "indexacao", label: "Indexação & Técnica", num: "09" },
  { id: "prioridades", label: "Mapa de Prioridades", num: "10" },
  { id: "plano", label: "Plano de Ação", num: "11" },
  { id: "conclusao", label: "Conclusão", num: "12" },
];
