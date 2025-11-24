"use client";

import { useEffect, useState } from "react";
import { fetchGoogleSheetCsv, parseSignatories, Signatory } from "@/lib/google";

export function useSignatories(sheetId: string, gid?: string) {
  const [rows, setRows] = useState<Signatory[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);

    fetchGoogleSheetCsv(sheetId, gid)
      .then((csv) => {
        if (!active) return;
        setRows(parseSignatories(csv));
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

  return { rows, error, isLoading };
}

