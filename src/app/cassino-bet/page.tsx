import type { Metadata } from "next";

import { CassinoReport } from "@/components/CassinoReport";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { cbSections } from "@/lib/cassino-data";

export const metadata: Metadata = {
  title: "Cassino Bet · Análise de Desempenho SEO",
  description:
    "Relatório interativo de performance SEO da cassino.bet.br — período atual vs. anterior e funil de conversão orgânica (GA4).",
};

export default function CassinoBetPage() {
  return (
    <div className="min-h-screen">
      <Topbar status="● cassino.bet.br · 1 jan – 23 jun" updated="Atualizado em 23/jun" />
      <div className="mx-auto flex max-w-[1500px]">
        <Sidebar sections={cbSections} />
        <main className="min-w-0 flex-1 px-4 pb-16 sm:px-6 lg:px-10">
          <CassinoReport />
        </main>
      </div>
    </div>
  );
}
