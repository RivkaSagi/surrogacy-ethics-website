"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSignatories } from "@/hooks/use-signatories";

type Props = {
  sheetId: string;
  gid?: string;
  limit?: number;
};

type SortField = "name" | "field" | "none";

export function SignatoriesTable({ sheetId, gid, limit }: Props) {
  const { rows, error, isLoading } = useSignatories(sheetId, gid);
  const [sortField, setSortField] = useState<SortField>("none");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const total = rows.length;
  const showFullPageLink = limit && total > limit;

  const sortedRows = useMemo(() => {
    if (sortField === "none") return rows;

    const sorted = [...rows].sort((a, b) => {
      let aVal = "";
      let bVal = "";

      if (sortField === "name") {
        aVal = a.name || "";
        bVal = b.name || "";
      } else if (sortField === "field") {
        aVal = a.field || "";
        bVal = b.field || "";
      }

      const comparison = aVal.localeCompare(bVal, "he");
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [rows, sortField, sortDirection]);

  const displayedRows = limit ? sortedRows.slice(0, limit) : sortedRows;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <section className="section-shell" id="signatories">
      <div className="flex flex-col gap-2">
        <p className="badge">רשימת החתומים</p>
      </div>

      <div className="mt-6 space-y-4">
        {isLoading && <p className="text-stone">טוען רשימה...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!isLoading && !error && rows.length > 0 && (
          <>
            <div className="overflow-x-auto rounded-2xl border border-border/80 bg-white/70">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/60 bg-sand/30">
                    <th className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleSort("name")}
                        className="flex w-full items-center justify-end gap-2 font-semibold text-ink transition hover:text-clay"
                      >
                        <span>שם</span>
                        <span className="text-xs">{getSortIcon("name")}</span>
                      </button>
                    </th>
                    <th className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleSort("field")}
                        className="flex w-full items-center justify-end gap-2 font-semibold text-ink transition hover:text-clay"
                      >
                        <span>תחום מקצועי</span>
                        <span className="text-xs">{getSortIcon("field")}</span>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedRows.map((person, index) => (
                    <tr
                      key={`${person.name}-${person.field}-${index}`}
                      className="border-b border-border/40 last:border-b-0 transition hover:bg-sand/20"
                    >
                      <td className="px-4 py-3 text-right font-medium text-ink">
                        {person.name}
                      </td>
                      <td className="px-4 py-3 text-right text-stone">
                        {person.field || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {showFullPageLink && (
              <div className="flex justify-center">
                <Link
                  href="/signatories"
                  className="rounded-full border border-clay px-6 py-3 text-clay transition hover:bg-clay hover:text-white"
                >
                  צפייה בכל {total} החותמות והחותמים →
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
