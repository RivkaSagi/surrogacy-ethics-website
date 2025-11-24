"use client";

import { useGoogleDoc } from "@/hooks/use-google-doc";

type Props = {
  docId: string;
};

export function UpdatesPanel({ docId }: Props) {
  const { html, error, isLoading } = useGoogleDoc(docId);

  return (
    <section className="section-shell" id="updates">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="badge">עדכונים</p>
        </div>
      </div>

      <div className="max-h-[320px] overflow-y-auto rounded-2xl border border-border/60 bg-mist/80 p-4">
        {isLoading && <p className="text-stone">טוען עדכונים...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!isLoading && !error && (
          <article
            className="prose-content rtl-list text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </section>
  );
}

