import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SignatoriesTable } from "@/components/signatories-table";
import { CONTENT_SOURCES } from "@/config/content";

export default function SignatoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand via-mist to-white">
      <SiteHeader />
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:py-16">
        <section className="glass-panel p-6 sm:p-8 lg:p-10 space-y-4 text-right">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="badge">רשימת החותמות והחותמים</p>
              <h1 className="text-3xl font-display text-ink">
                כל החותמות והחותמים על הקוד האתי
              </h1>
              <p className="text-stone mt-2">
                כאן ניתן לראות את כל החותמות והחותמים, למיין לפי שם או תחום
                מקצועי, ולחפש בקלות.
              </p>
            </div>
            <Link
              href="/"
              className="text-sm text-clay underline-offset-4 hover:underline"
            >
              ← חזרה לעמוד הבית
            </Link>
          </div>
        </section>

        <SignatoriesTable
          sheetId={CONTENT_SOURCES.signatoriesSheetId}
          gid={CONTENT_SOURCES.signatoriesGid}
        />
      </main>
    </div>
  );
}

