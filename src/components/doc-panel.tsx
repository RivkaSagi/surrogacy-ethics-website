"use client";

import { useState } from "react";
import { useGoogleDoc } from "@/hooks/use-google-doc";

type DocPanelProps = {
  docId: string;
  title: string;
  description?: string;
  variant?: "default" | "preview" | "expandable";
  ctaLabel?: string;
  ctaHref?: string;
  ctaExternal?: boolean;
};

export function DocPanel({
  docId,
  title,
  description,
  variant = "default",
  ctaHref,
  ctaLabel,
  ctaExternal,
}: DocPanelProps) {
  const { html, error, isLoading } = useGoogleDoc(docId);
  const [isExpanded, setIsExpanded] = useState(false);
  const isPreview = variant === "preview";
  const isExpandable = variant === "expandable";
  const labelId = `section-${docId}-title`;

  return (
    <section className="section-shell" aria-labelledby={labelId}>
      <div className="space-y-2">
        <p className="badge" id={labelId}>
          {title}
        </p>
        {description && (
          <p className="text-stone text-sm sm:text-base">{description}</p>
        )}
      </div>
      <div className={`min-h-[120px] ${isPreview || (isExpandable && !isExpanded) ? "relative" : ""}`}>
        {isLoading && <p className="text-stone">טוען תוכן...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!isLoading && !error && (
          <>
            <article
              className={`prose-content rtl-list ${
                isPreview || (isExpandable && !isExpanded) ? "max-h-72 overflow-hidden pr-2" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {(isPreview || (isExpandable && !isExpanded)) && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-sand/90 via-sand/40 to-transparent" />
            )}
          </>
        )}
      </div>
      {isExpandable && (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center justify-center rounded-full bg-clay px-6 py-3 text-white shadow-card transition hover:bg-clay/90"
          >
            {isExpanded ? "הצג פחות" : "קרא עוד"}
          </button>
          {ctaHref && ctaLabel && (
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full border border-clay px-6 py-3 text-clay shadow-card transition hover:bg-clay hover:text-white"
              {...(ctaExternal ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      )}
      {isPreview && ctaHref && ctaLabel && (
        <a
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-full bg-clay px-6 py-3 text-white shadow-card transition hover:bg-clay/90"
          {...(ctaExternal ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {ctaLabel}
        </a>
      )}
    </section>
  );
}

