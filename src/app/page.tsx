import { Report } from "@/components/Report";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { sections } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Topbar status="● vera.bet.br · Q2 2026" updated="Atualizado em 16/jun" />
      <div className="mx-auto flex max-w-[1500px]">
        <Sidebar sections={sections} />
        <main className="min-w-0 flex-1 px-4 pb-16 sm:px-6 lg:px-10">
          <Report />
        </main>
      </div>
    </div>
  );
}
