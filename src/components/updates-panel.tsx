"use client";

import { useGoogleDoc } from "@/hooks/use-google-doc";
import { useEffect, useState } from "react";

type Props = {
  docId: string;
};

export function UpdatesPanel({ docId }: Props) {
  const { html, error, isLoading } = useGoogleDoc(docId);
  const [updates, setUpdates] = useState<string[]>([]);

  useEffect(() => {
    if (!html) return;

    // Parse HTML and split by paragraphs
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const paragraphs = Array.from(doc.querySelectorAll('p, li'));

    const updateTexts = paragraphs
      .map(p => p.innerHTML.trim())
      .filter(text => text.length > 0);

    setUpdates(updateTexts);
  }, [html]);

  return (
    <section className="section-shell" id="updates">
      <div className="max-w-3xl flex items-center justify-between gap-4 sm:pr-12">
        <div>
          <p className="badge">עדכונים</p>
        </div>
      </div>

      {isLoading && <p className="max-w-3xl text-stone sm:pr-12">טוען עדכונים...</p>}
      {error && <p className="max-w-3xl text-danger sm:pr-12">{error}</p>}

      {!isLoading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {updates.map((update, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border-2 border-clay/20 bg-gradient-to-br from-white via-sand/30 to-mist/50 p-5 shadow-md transition-all hover:border-clay/40 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-clay/10 to-transparent rounded-bl-full" />

              <div
                className="prose-content relative z-10 text-sm leading-relaxed text-ink sm:pr-12"
                dangerouslySetInnerHTML={{ __html: update }}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

