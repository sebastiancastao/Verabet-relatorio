"use client";

import { ReactNode, useMemo, useState } from "react";

export type Column<T> = {
  key: keyof T & string;
  header: string;
  align?: "left" | "right" | "center";
  /** custom cell render */
  render?: (row: T) => ReactNode;
  /** value used for sorting/searching (defaults to row[key]) */
  accessor?: (row: T) => string | number;
  sortable?: boolean;
  /** subtle bar based on value vs max in column (numeric only) */
  bar?: boolean;
  barColor?: string;
};

type SortState = { key: string; dir: "asc" | "desc" } | null;

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchable = false,
  searchPlaceholder = "Filtrar…",
  highlightRow,
  initialSort,
}: {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  highlightRow?: (row: T) => boolean;
  initialSort?: { key: string; dir: "asc" | "desc" };
}) {
  const [sort, setSort] = useState<SortState>(initialSort ?? null);
  const [query, setQuery] = useState("");

  const accessorOf = (col: Column<T>, row: T) =>
    col.accessor ? col.accessor(row) : (row[col.key] as string | number);

  const maxByKey = useMemo(() => {
    const m: Record<string, number> = {};
    columns.forEach((c) => {
      if (c.bar) {
        m[c.key] = Math.max(
          ...data.map((r) => Number(accessorOf(c, r)) || 0),
          0
        );
      }
    });
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, data]);

  const processed = useMemo(() => {
    let rows = data;
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((row) =>
        columns.some((c) =>
          String(accessorOf(c, row)).toLowerCase().includes(q)
        )
      );
    }
    if (sort) {
      const col = columns.find((c) => c.key === sort.key);
      if (col) {
        rows = [...rows].sort((a, b) => {
          const av = accessorOf(col, a);
          const bv = accessorOf(col, b);
          let cmp: number;
          if (typeof av === "number" && typeof bv === "number") {
            cmp = av - bv;
          } else {
            cmp = String(av).localeCompare(String(bv), "pt-BR", {
              numeric: true,
            });
          }
          return sort.dir === "asc" ? cmp : -cmp;
        });
      }
    }
    return rows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, columns, sort, query]);

  const toggleSort = (col: Column<T>) => {
    if (col.sortable === false) return;
    setSort((prev) => {
      if (!prev || prev.key !== col.key) return { key: col.key, dir: "desc" };
      if (prev.dir === "desc") return { key: col.key, dir: "asc" };
      return null;
    });
  };

  const alignClass = (a?: Column<T>["align"]) =>
    a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface/70">
      {searchable && (
        <div className="border-b border-border p-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted/70 outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/40"
          />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2/60">
              {columns.map((col) => {
                const active = sort?.key === col.key;
                const sortable = col.sortable !== false;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    onClick={() => toggleSort(col)}
                    className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted ${alignClass(
                      col.align
                    )} ${sortable ? "cursor-pointer select-none hover:text-foreground" : ""}`}
                  >
                    <span
                      className={`inline-flex items-center gap-1 ${
                        col.align === "right" ? "flex-row-reverse" : ""
                      }`}
                    >
                      {col.header}
                      {sortable && (
                        <span
                          className={`text-[10px] transition-colors ${
                            active ? "text-accent" : "text-muted/40"
                          }`}
                        >
                          {active ? (sort?.dir === "asc" ? "▲" : "▼") : "↕"}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {processed.map((row, i) => {
              const hl = highlightRow?.(row);
              return (
                <tr
                  key={i}
                  className={`border-b border-border/60 transition-colors last:border-0 hover:bg-surface-2/50 ${
                    hl ? "bg-accent/[0.06]" : ""
                  }`}
                >
                  {columns.map((col) => {
                    const raw = accessorOf(col, row);
                    const pct =
                      col.bar && maxByKey[col.key]
                        ? (Number(raw) / maxByKey[col.key]) * 100
                        : 0;
                    return (
                      <td
                        key={col.key}
                        className={`relative px-4 py-3 tabular-nums text-foreground/90 ${alignClass(
                          col.align
                        )}`}
                      >
                        {col.bar && (
                          <span
                            className="pointer-events-none absolute inset-y-1.5 left-1 right-1 -z-0 rounded-md opacity-25"
                            style={{
                              width: `calc(${pct}% - 8px)`,
                              background: col.barColor ?? "var(--accent)",
                            }}
                          />
                        )}
                        <span className="relative z-10">
                          {col.render ? col.render(row) : String(raw)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {processed.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-muted"
                >
                  Nenhum resultado para “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
