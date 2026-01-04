"use client";

import { useState, useEffect } from "react";
import { useGoogleDoc } from "@/hooks/use-google-doc";
import { PdfModal } from "@/components/pdf-modal";

type DocPanelProps = {
  docId?: string;
  localPath?: string;
  title: string;
  description?: string;
  variant?: "default" | "preview" | "expandable";
  ctaLabel?: string;
  ctaHref?: string;
  ctaExternal?: boolean;
  showPdfButton?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  isPdfModalOpen?: boolean;
  setIsPdfModalOpen?: (open: boolean) => void;
};

export function DocPanel({
  docId,
  localPath,
  title,
  description,
  variant = "default",
  ctaHref,
  ctaLabel,
  ctaExternal,
  showPdfButton = false,
  showBadge = false,
  badgeText,
  isPdfModalOpen: externalIsPdfModalOpen,
  setIsPdfModalOpen: externalSetIsPdfModalOpen,
}: DocPanelProps) {
  // Fetch from local file if localPath is provided, otherwise use Google Docs
  const [localHtml, setLocalHtml] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (localPath) {
      setLocalLoading(true);
      fetch(localPath)
        .then((res) => res.text())
        .then((html) => {
          setLocalHtml(html);
          setLocalLoading(false);
        })
        .catch((err) => {
          setLocalError("שגיאה בטעינת תוכן");
          setLocalLoading(false);
        });
    }
  }, [localPath]);

  const googleDoc = useGoogleDoc(docId || "");

  const html = localPath ? localHtml : googleDoc.html;
  const error = localPath ? localError : googleDoc.error;
  const isLoading = localPath ? localLoading : googleDoc.isLoading;
  const [isExpanded, setIsExpanded] = useState(false);
  const [internalIsPdfModalOpen, setInternalIsPdfModalOpen] = useState(false);

  // Use external state if provided, otherwise use internal state
  const isPdfModalOpen = externalIsPdfModalOpen ?? internalIsPdfModalOpen;
  const setIsPdfModalOpen = externalSetIsPdfModalOpen ?? setInternalIsPdfModalOpen;
  const isPreview = variant === "preview";
  const isExpandable = variant === "expandable";
  const labelId = `section-${docId}-title`;

  return (
    <section className="section-shell" aria-labelledby={labelId}>
      <div className="max-w-3xl space-y-3 sm:pr-12">
        {showBadge && badgeText && (
          <p className="badge">{badgeText}</p>
        )}
        <h1 className="text-3xl font-bold text-ink sm:text-4xl" id={labelId}>
          {title}
        </h1>
        {description && (
          <p className="text-stone text-sm sm:text-base">{description}</p>
        )}
      </div>
      <div className={`max-w-3xl min-h-[120px] sm:pr-12 ${isPreview || (isExpandable && !isExpanded) ? "relative" : ""}`}>
        {isLoading && <p className="text-stone">טוען תוכן...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!isLoading && !error && (
          <>
            <article
              className={`prose-content rtl-list ${
                isPreview || (isExpandable && !isExpanded) ? "max-h-72 overflow-hidden" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {(isPreview || (isExpandable && !isExpanded)) && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-sand/90 via-sand/40 to-transparent" />
            )}
          </>
        )}
      </div>
      <div className="max-w-3xl sm:pr-12">
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
        {showPdfButton && (
          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="inline-flex items-center justify-center rounded-full bg-clay px-6 py-3 text-white shadow-card transition hover:bg-clay/90"
          >
            צפו בקוד האתי המלא
          </button>
        )}
      </div>
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl="/TheEthicsCode.pdf"
        title="הקוד האתי המלא"
      />
    </section>
  );
}

