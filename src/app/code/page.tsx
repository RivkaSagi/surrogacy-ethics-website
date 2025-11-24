import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { DocPanel } from "@/components/doc-panel";
import { CONTENT_SOURCES } from "@/config/content";

const ethicsDocUrl = `https://docs.google.com/document/d/${CONTENT_SOURCES.ethicsDocId}/view`;

export default function EthicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand via-mist to-white">
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:py-16">
        <section className="glass-panel space-y-4 text-right" id="ethics-full">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="badge">הקוד האתי</p>
              <h1 className="text-3xl font-display text-ink">
                גרסה מלאה לקריאה רציפה
              </h1>
              <p className="text-stone mt-2">
                כאן ניתן לעיין בכל 14 העמודים בנוחות, עם אפשרות לדפדוף ושמירה
                של התוכן המקורי.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <Link
                href="/"
                className="text-sm text-clay underline-offset-4 hover:underline"
              >
                ← חזרה לעמוד הבית
              </Link>
              <a
                href={ethicsDocUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-clay px-4 py-2 text-sm text-clay transition hover:bg-clay hover:text-white"
              >
                פתיחת המסמך המקורי
              </a>
            </div>
          </div>
        </section>

        <DocPanel
          docId={CONTENT_SOURCES.ethicsDocId}
          title="הקוד האתי המלא"
          />
      </main>
    </div>
  );
}

