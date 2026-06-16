import { ReactNode } from "react";

export function Section({
  id,
  num,
  title,
  intro,
  children,
}: {
  id: string;
  num: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-10 lg:py-14">
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-sm font-semibold text-accent">{num}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {intro && (
        <div className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          {intro}
        </div>
      )}
      <div className="mt-7">{children}</div>
    </section>
  );
}

export function Callout({
  children,
  tone = "info",
}: {
  children: ReactNode;
  tone?: "info" | "warning" | "success";
}) {
  const tones = {
    info: "border-[#2a93cf]/30 bg-[#2a93cf]/8 text-[#d4e8f6]",
    warning: "border-amber-500/30 bg-amber-500/5 text-amber-100",
    success: "border-[#4cc2cc]/30 bg-[#4cc2cc]/8 text-[#d6f1f3]",
  };
  const dot = {
    info: "bg-[#2a93cf]",
    warning: "bg-amber-400",
    success: "bg-[#4cc2cc]",
  };
  return (
    <div className={`flex gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed ${tones[tone]}`}>
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot[tone]}`} />
      <p>{children}</p>
    </div>
  );
}
