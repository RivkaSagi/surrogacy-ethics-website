"use client";

type PdfModalProps = {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
};

export function PdfModal({ isOpen, onClose, pdfUrl, title }: PdfModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-4 z-50 flex items-center justify-center sm:inset-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 -m-4 bg-black/60 backdrop-blur-sm sm:-m-8"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 flex h-full w-full max-w-4xl flex-col rounded-xl border-4 border-clay/50 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b-2 border-clay/30 bg-sand/50 px-4 py-3 sm:px-6 sm:py-4">
          <h2 className="text-lg font-display text-ink sm:text-xl">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-white p-2 text-stone shadow-sm transition hover:bg-mist hover:text-ink"
            aria-label="סגור"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden bg-gray-100 p-2">
          <iframe
            src={pdfUrl}
            className="h-full w-full rounded border border-border bg-white"
            title={title}
          />
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t-2 border-clay/30 bg-sand/50 px-4 py-3 sm:px-6 sm:py-4">
          <a
            href={pdfUrl}
            download="TheEthicsCode.pdf"
            className="inline-flex items-center justify-center rounded-full bg-clay px-4 py-2 text-sm text-white shadow-card transition hover:bg-clay/90 sm:px-6 sm:py-3 sm:text-base"
          >
            הורד את הקוד האתי
          </a>
        </div>
      </div>
    </div>
  );
}
