"use client";

import { useGoogleDoc } from "@/hooks/use-google-doc";

type DocPanelProps = {
  docId: string;
  title: string;
  description?: string;
  variant?: "default" | "preview";
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
  const isPreview = variant === "preview";
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
      <div className={`min-h-[120px] ${isPreview ? "relative" : ""}`}>
        {isLoading && <p className="text-stone">טוען תוכן...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!isLoading && !error && (
          <>
            <article
              className={`prose-content rtl-list ${
                isPreview ? "max-h-72 overflow-hidden pr-2" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {isPreview && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-sand via-sand/70 to-transparent" />
            )}
          </>
        )}
      </div>
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

