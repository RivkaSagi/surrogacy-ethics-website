"use client";

import Link from "next/link";
import {
  useMemo,
  useState,
  useRef,
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useSignatories } from "@/hooks/use-signatories";

type Props = {
  sheetId: string;
  gid?: string;
  limit?: number;
};

type SortField = "name" | "none";

export function SignatoriesTable({ sheetId, gid, limit }: Props) {
  const { rows, headers, error, isLoading } = useSignatories(sheetId, gid);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [column4Filters, setColumn4Filters] = useState<Set<string>>(new Set());
  const [fieldFilters, setFieldFilters] = useState<Set<string>>(new Set());

  const total = rows.length;
  const showFullPageLink = limit && total > limit;

  const COUNTRYWIDE = "כל הארץ";

  const uniqueColumn4Values = useMemo(() => {
    const values = new Set<string>();
    rows.forEach((row) => {
      if (row.column4) {
        const splitValues = row.column4.split(",").map((v) => v.trim());
        splitValues.forEach((v) => {
          if (v) values.add(v);
        });
      }
    });
    // "כל הארץ" is implicit — it always shows up when any region is filtered,
    // so it doesn't need its own filter checkbox.
    values.delete(COUNTRYWIDE);
    return Array.from(values).sort((a, b) => a.localeCompare(b, "he"));
  }, [rows]);

  // Field categories present in the current data, in the order defined by
  // FIELD_CATEGORIES (so the filter only offers categories that actually match
  // a signatory).
  const availableFieldCategories = useMemo(() => {
    const present = new Set(rows.map((row) => fieldCategory(row.field)));
    return FIELD_CATEGORIES.filter((c) => present.has(c.label));
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (fieldFilters.size > 0 && !fieldFilters.has(fieldCategory(row.field))) {
        return false;
      }
      if (column4Filters.size > 0) {
        if (!row.column4) return false;
        const splitValues = row.column4.split(",").map((v) => v.trim());
        if (
          !splitValues.some(
            (v) => v === COUNTRYWIDE || column4Filters.has(v)
          )
        ) {
          return false;
        }
      }
      return true;
    });
  }, [rows, column4Filters, fieldFilters]);

  const sortedRows = useMemo(() => {
    if (sortField === "none") return filteredRows;

    const sorted = [...filteredRows].sort((a, b) => {
      const comparison = nameSortKey(a.name).localeCompare(
        nameSortKey(b.name),
        "he",
      );
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

  const toggleFilterValue = (
    setFilters: Dispatch<SetStateAction<Set<string>>>,
    value: string,
  ) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  return (
    <section className="py-10 px-4 md:px-20" id="signatories">
      <div className="mt-6 space-y-4 max-w-4xl mx-auto">
        {isLoading && <p className="text-text/60">טוען רשימה...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!isLoading && !error && rows.length > 0 && (
          <>
            <div className={showFullPageLink ? "relative" : ""}>
              <div className="rounded-2xl border border-border bg-white/70 overflow-x-auto md:overflow-visible">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-border bg-background/50">
                      <th scope="col" className="px-3 md:px-4 py-3 text-right">
                        <button
                          onClick={() => handleSort("name")}
                          className="flex w-full items-center justify-between font-semibold text-text transition hover:text-primary"
                          aria-label={`מיין לפי ${headers[0] || "שם"}`}
                        >
                          <span>{headers[0] || "שם"}</span>
                          <span className="text-xs" aria-hidden="true">{getSortIcon("name")}</span>
                        </button>
                      </th>
                      <th scope="col" className="px-3 md:px-4 py-3 text-right relative">
                        <div className="flex w-full items-center justify-between">
                          <span className="font-semibold text-text">
                            {headers[1] || "תחום מקצועי"}
                          </span>
                          {availableFieldCategories.length > 0 && (
                            <FilterDropdown
                              options={availableFieldCategories.map((c) => c.label)}
                              selected={fieldFilters}
                              onToggle={(v) => toggleFilterValue(setFieldFilters, v)}
                              onClear={() => setFieldFilters(new Set())}
                            />
                          )}
                        </div>
                      </th>
                      <th scope="col" className="px-3 md:px-4 py-3 text-right">
                        <span className="font-semibold text-text">
                          {headers[2] || "עמודה 3"}
                        </span>
                      </th>
                      <th scope="col" className="px-3 md:px-4 py-3 text-right relative">
                        <div className="flex w-full items-center justify-between">
                          <span className="font-semibold text-text">
                            {headers[3] || "עמודה 4"}
                          </span>
                          <div className="flex items-center gap-2">
                            {uniqueColumn4Values.length > 0 && (
                              <FilterDropdown
                                options={uniqueColumn4Values}
                                selected={column4Filters}
                                onToggle={(v) =>
                                  toggleFilterValue(setColumn4Filters, v)
                                }
                                onClear={() => setColumn4Filters(new Set())}
                              />
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
                        className="border-b border-border/40 last:border-b-0 transition hover:bg-background/30"
                      >
                        <td className="px-3 md:px-4 py-3 text-right font-medium text-text">
                          {renderName(person.name)}
                        </td>
                        <td className="px-3 md:px-4 py-3 text-right text-text/80">
                          {person.field || "—"}
                        </td>
                        <td className="px-3 md:px-4 py-3 text-right text-text/80">
                          {renderContactDetails(person.column3)}
                        </td>
                        <td className="px-3 md:px-4 py-3 text-right text-text/80">
                          {person.column4 || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {showFullPageLink && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
              )}
            </div>
            {showFullPageLink && (
              <div className="flex justify-center">
                <Link
                  href="/signatories"
                  className="rounded-full border border-primary px-6 py-3 text-primary transition hover:bg-primary hover:text-white"
                >
                  צפייה בכל אנשי המקצוע החתומים →
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// A "⋮" button that opens a checkbox filter dropdown for a column. The dropdown
// flips to the other side when there isn't room on the left.
function FilterDropdown({
  options,
  selected,
  onToggle,
  onClear,
}: {
  options: string[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [flip, setFlip] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateFlip = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 256; // w-64 = 16rem = 256px
      setFlip(rect.left < dropdownWidth);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (!open) calculateFlip();
    setOpen((prev) => !prev);
  }, [open, calculateFlip]);

  // Recalculate flip on window resize when dropdown is open
  useEffect(() => {
    if (!open) return;
    const handleResize = () => calculateFlip();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open, calculateFlip]);

  // Close on a click/tap outside the dropdown. Using a document listener instead
  // of a full-screen overlay keeps the table scrollable (and swipeable on mobile)
  // while the dropdown is open.
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="rounded p-1 text-text transition hover:bg-primary/10"
        aria-label="סינון"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="text-lg">⋮</span>
      </button>
      {open && (
        <div
          className={`absolute w-64 z-[100] mt-1 rounded-lg border border-border bg-white p-3 shadow-xl top-auto ${flip ? "left-0 right-auto" : "right-0 left-auto"}`}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-text">סינון</span>
            <div className="flex gap-2">
              {selected.size > 0 && (
                <button
                  onClick={onClear}
                  className="text-xs text-primary hover:underline"
                >
                  נקה
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-text/60 hover:underline"
              >
                סגור
              </button>
            </div>
          </div>
          <div className="max-h-60 space-y-2 overflow-y-auto">
            {options.map((value) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 transition hover:bg-background/50"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={selected.has(value)}
                  onChange={() => onToggle(value)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text/80">{value}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Professional-field filter categories. Each groups the raw, often gendered,
// values from the sheet (e.g. פסיכולוג / פסיכולוגית) under one label. `match`
// values are compared case-insensitively against the trimmed sheet value.
const FIELD_CATEGORIES: { label: string; match: string[] }[] = [
  { label: "פסיכולוגיה", match: ["פסיכולוג", "פסיכולוגית"] },
  { label: "עריכת דין", match: ["עורך דין", "עורכת דין"] },
  {
    label: "מרכזים, סוכנויות וליווי",
    match: ["מלווה", "סוכנות", "מרכז", "ליווי"],
  },
  { label: "רפואה", match: ["רופא", "רופאה", "רפואה"] },
  { label: "סוכן ביטוח", match: ["סוכן ביטוח", "סוכנת ביטוח"] },
];

// Map a raw field value to its category label. Falls back to the raw value
// (trimmed) so unmapped fields still get their own filter option.
function fieldCategory(field: string | undefined): string {
  const value = (field || "").trim();
  const category = FIELD_CATEGORIES.find((c) =>
    c.match.some((m) => m === value),
  );
  return category ? category.label : value;
}

// Academic/professional title prefixes that should be ignored when sorting
// names alphabetically (ד״ר, דוקטור/ת, פרופ׳, פרופסור, and punctuation variants).
const NAME_TITLE_PREFIX =
  /^(?:ד(?:["״׳']?ר|וקטור(?:ית|ת)?)|פרופ(?:["״׳']?|סור)?)[\s.,־-]+/u;

// Sort key for a name: strip leading title prefixes (repeatedly, e.g. "פרופ׳ ד״ר")
// so sorting is by the actual name, not the title.
function nameSortKey(name: string | undefined): string {
  let key = (name || "").trim();
  let prev;
  do {
    prev = key;
    key = key.replace(NAME_TITLE_PREFIX, "").trim();
  } while (key !== prev);
  return key;
}

// Render a name; if it contains a comma, split it onto two lines.
function renderName(name: string | undefined): React.ReactNode {
  if (!name) return "—";
  const commaIndex = name.indexOf(",");
  if (commaIndex === -1) return name;
  const first = name.slice(0, commaIndex).trim();
  const second = name.slice(commaIndex + 1).trim();
  return (
    <>
      <span className="block">{first}</span>
      {second && <span className="block">{second}</span>}
    </>
  );
}

// Split contact details ("0501234567\nfoo@bar.com\nfoo.com") into separate
// auto-linked lines so they don't run together in the table cell.
function renderContactDetails(raw: string | undefined): React.ReactNode {
  if (!raw) return "—";
  const parts = raw
    .split(/[\n;|]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return "—";
  return (
    <ul className="space-y-0.5 list-none">
      {parts.map((part, i) => (
        <li key={i}>{linkifyContact(part)}</li>
      ))}
    </ul>
  );
}

function linkifyContact(rawValue: string): React.ReactNode {
  // Strip invisible Unicode bidi/directional control characters
  // (‎ LRM, ‏ RLM, ‪-‮, ⁦-⁩) — Google Sheets
  // sometimes inserts them around mixed-direction text and they break the
  // phone/URL regex matches below.
  const value = rawValue
    .replace(/[‎‏‪-‮⁦-⁩]/g, "")
    .trim();
  if (!value) return rawValue;

  // Email
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return (
      <a
        href={`mailto:${value}`}
        dir="ltr"
        className="text-primary hover:underline"
      >
        {value}
      </a>
    );
  }
  // Phone (Israeli format: digits, +, -, spaces; at least 7 digits)
  const phoneDigits = value.replace(/[^0-9]/g, "");
  if (/^[+\d\s\-()]+$/.test(value) && phoneDigits.length >= 7) {
    return (
      <a
        href={`tel:${phoneDigits}`}
        dir="ltr"
        className="text-primary hover:underline"
      >
        {value}
      </a>
    );
  }
  // Web URL (with or without protocol)
  if (/^(https?:\/\/|www\.|[\w-]+\.[a-z]{2,})/i.test(value)) {
    const href = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        dir="ltr"
        className="text-primary hover:underline"
      >
        {value}
      </a>
    );
  }
  return value;
}
