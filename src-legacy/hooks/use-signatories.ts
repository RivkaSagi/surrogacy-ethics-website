"use client";

import { useEffect, useState } from "react";
import { fetchGoogleSheetCsv, parseSignatories, Signatory } from "@/lib/google";

export function useSignatories(sheetId: string, gid?: string) {
  const [rows, setRows] = useState<Signatory[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);

    fetchGoogleSheetCsv(sheetId, gid)
      .then((csv) => {
        if (!active) return;
        const data = parseSignatories(csv);
        setRows(data.rows);
        setHeaders(data.headers);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "שגיאה בלתי צפויה");
      })
      .finally(() => {
        if (!active) return;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [sheetId, gid]);

  return { rows, headers, error, isLoading };
}

