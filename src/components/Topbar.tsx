import { BrandSwitcher } from "@/components/BrandSwitcher";
import { SeoLabMark } from "@/components/ui/Brand";

export function Topbar({
  status,
  updated,
}: {
  status?: string;
  updated?: string;
}) {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <SeoLabMark height={26} />
          <span className="hidden h-8 w-px bg-border sm:block" />
          <BrandSwitcher />
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          {status && (
            <span className="rounded-full border border-[#4cc2cc]/30 bg-[#4cc2cc]/10 px-3 py-1 text-xs font-medium text-[#7fd6dd]">
              {status}
            </span>
          )}
          {updated && (
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
              {updated}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
