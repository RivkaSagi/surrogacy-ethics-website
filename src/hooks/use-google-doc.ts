"use client";

import { useEffect, useState } from "react";
import { fetchGoogleDocHtml } from "@/lib/google";

export function useGoogleDoc(docId: string) {
  const [html, setHtml] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);

    fetchGoogleDocHtml(docId)
      .then((docHtml) => {
        if (!active) return;
        setHtml(docHtml);
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
  }, [docId]);

  return { html, error, isLoading };
}

