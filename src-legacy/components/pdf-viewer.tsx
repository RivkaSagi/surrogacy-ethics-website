type PdfViewerProps = {
  pdfUrl: string;
  title: string;
  description?: string;
};

export function PdfViewer({ pdfUrl, title, description }: PdfViewerProps) {
  return (
    <section className="section-shell">
      <div className="space-y-2">
        <p className="badge">{title}</p>
        {description && (
          <p className="text-stone text-sm sm:text-base">{description}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="w-full overflow-hidden rounded-lg border border-border shadow-card">
          <iframe
            src={pdfUrl}
            className="h-[600px] w-full"
            title={title}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={pdfUrl}
            download="TheEthicsCode.pdf"
            className="inline-flex items-center justify-center rounded-full border border-clay px-6 py-3 text-clay shadow-card transition hover:bg-clay hover:text-white"
          >
            הורד את הקוד האתי
          </a>
        </div>
      </div>
    </section>
  );
}
