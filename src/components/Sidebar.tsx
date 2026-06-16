"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/data";

export function Sidebar() {
  const [active, setActive] = useState(sections[0].id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 rounded-full border border-border bg-surface-2 px-4 py-3 text-sm font-medium text-foreground shadow-2xl lg:hidden"
        aria-label="Abrir índice"
      >
        {open ? "✕ Fechar" : "☰ Índice"}
      </button>

      <nav
        className={`fixed top-16 z-40 h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-surface/80 px-4 py-6 backdrop-blur-md transition-transform lg:sticky lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Seções
        </p>
        <ul className="space-y-1">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-accent/10 text-foreground"
                      : "text-muted hover:bg-surface-2/60 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] ${
                      isActive ? "text-accent" : "text-muted/60"
                    }`}
                  >
                    {s.num}
                  </span>
                  <span className="flex-1 leading-tight">{s.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {open && (
        <div
          className="fixed inset-0 top-16 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
