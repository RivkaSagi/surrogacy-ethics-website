"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSignatories } from "@/hooks/use-signatories";

type Props = {
  sheetId: string;
  gid?: string;
  limit?: number;
};

type SortField = "name" | "field" | "column3" | "column4" | "none";

export function SignatoriesTable({ sheetId, gid, limit }: Props) {
  const { rows, headers, error, isLoading } = useSignatories(sheetId, gid);
  const [sortField, setSortField] = useState<SortField>("none");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [column4Filters, setColumn4Filters] = useState<Set<string>>(new Set());

  const total = rows.length;
  const showFullPageLink = limit && total > limit;

  const uniqueColumn4Values = useMemo(() => {
    const values = new Set<string>();
    rows.forEach((row) => {
      if (row.column4) {
        // Split by comma and trim each value
        const splitValues = row.column4.split(',').map(v => v.trim());
        splitValues.forEach(v => {
          if (v) values.add(v);
        });
      }
    });
    return Array.from(values).sort((a, b) => a.localeCompare(b, "he"));
  }, [rows]);

  const filteredRows = useMemo(() => {
    if (column4Filters.size === 0) return rows;
    return rows.filter((row) => {
      if (!row.column4) return false;
      // Split by comma and check if any value matches the filter
      const splitValues = row.column4.split(',').map(v => v.trim());
      return splitValues.some(v => column4Filters.has(v));
    });
  }, [rows, column4Filters]);

  const sortedRows = useMemo(() => {
    if (sortField === "none") return filteredRows;

    const sorted = [...filteredRows].sort((a, b) => {
      let aVal = "";
      let bVal = "";

      if (sortField === "name") {
        aVal = a.name || "";
        bVal = b.name || "";
      } else if (sortField === "field") {
        aVal = a.field || "";
        bVal = b.field || "";
      } else if (sortField === "column3") {
        aVal = a.column3 || "";
        bVal = b.column3 || "";
      } else if (sortField === "column4") {
        aVal = a.column4 || "";
        bVal = b.column4 || "";
      }

      const comparison = aVal.localeCompare(bVal, "he");
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [filteredRows, sortField, sortDirection]);

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

  const toggleColumn4Filter = (value: string) => {
    const newFilters = new Set(column4Filters);
    if (newFilters.has(value)) {
      newFilters.delete(value);
    } else {
      newFilters.add(value);
    }
    setColumn4Filters(newFilters);
  };

  const clearFilters = () => {
    setColumn4Filters(new Set());
  };

  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  return (
    <section className="section-shell" id="signatories">
      <div className="flex flex-col gap-2">
        <p className="badge">רשימת אנשי המקצוע החתומים</p>
      </div>

      <div className="mt-6 space-y-4">
        {isLoading && <p className="text-stone">טוען רשימה...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!isLoading && !error && rows.length > 0 && (
          <>
            <div className={showFullPageLink ? "relative" : ""}>
              <div className="overflow-x-auto rounded-2xl border border-border/80 bg-white/70">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/60 bg-sand/30">
                    <th className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleSort("name")}
                        className="flex w-full items-center justify-between font-semibold text-ink transition hover:text-clay"
                      >
                        <span>{headers[0] || "שם"}</span>
                        <span className="text-xs">{getSortIcon("name")}</span>
                      </button>
                    </th>
                    <th className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleSort("field")}
                        className="flex w-full items-center justify-between font-semibold text-ink transition hover:text-clay"
                      >
                        <span>{headers[1] || "תחום מקצועי"}</span>
                        <span className="text-xs">{getSortIcon("field")}</span>
                      </button>
                    </th>
                    <th className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleSort("column3")}
                        className="flex w-full items-center justify-between font-semibold text-ink transition hover:text-clay"
                      >
                        <span>{headers[2] || "עמודה 3"}</span>
                        <span className="text-xs">{getSortIcon("column3")}</span>
                      </button>
                    </th>
                    <th className="px-4 py-3 text-right relative">
                      <div className="flex w-full items-center justify-between">
                        <span className="font-semibold text-ink">
                          {headers[3] || "עמודה 4"}
                        </span>
                        <div className="flex items-center gap-2">
                          {uniqueColumn4Values.length > 0 && (
                            <div className="relative">
                              <button
                                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                className="rounded p-1 text-ink transition hover:bg-clay/10"
                                title="סינון"
                              >
                                <span className="text-lg">⋮</span>
                              </button>
                              {showFilterDropdown && (
                                <>
                                  {/* Backdrop to close dropdown when clicking outside */}
                                  <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowFilterDropdown(false)}
                                  />
                                  <div className="fixed left-auto right-auto z-50 mt-1 w-64 rounded-lg border border-border bg-white p-3 shadow-xl">
                                    <div className="mb-2 flex items-center justify-between">
                                      <span className="text-sm font-semibold text-ink">סינון</span>
                                      <div className="flex gap-2">
                                        {column4Filters.size > 0 && (
                                          <button
                                            onClick={clearFilters}
                                            className="text-xs text-clay hover:underline"
                                          >
                                            נקה
                                          </button>
                                        )}
                                        <button
                                          onClick={() => setShowFilterDropdown(false)}
                                          className="text-xs text-stone hover:underline"
                                        >
                                          סגור
                                        </button>
                                      </div>
                                    </div>
                                    <div className="max-h-60 space-y-2 overflow-y-auto">
                                      {uniqueColumn4Values.map((value) => (
                                        <label
                                          key={value}
                                          className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 transition hover:bg-sand/30"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={column4Filters.has(value)}
                                            onChange={() => toggleColumn4Filter(value)}
                                            className="h-4 w-4 rounded border-border text-clay focus:ring-clay"
                                          />
                                          <span className="text-sm text-stone">{value}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
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
                      <td className="px-4 py-3 text-right text-stone">
                        {person.column3 || "—"}
                      </td>
                      <td className="px-4 py-3 text-right text-stone">
                        {person.column4 || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
              {showFullPageLink && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-sand/95 via-sand/50 to-transparent" />
              )}
            </div>
            {showFullPageLink && (
              <div className="flex justify-center">
                <Link
                  href="/signatories"
                  className="rounded-full border border-clay px-6 py-3 text-clay transition hover:bg-clay hover:text-white"
                >
                  צפייה בכל אנשי המקצוע החתומים   →
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
