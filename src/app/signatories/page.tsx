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
          <div className="space-y-3">
            <p className="badge">רשימת אנשי המקצוע</p>
            <h1 className="text-3xl font-bold text-ink sm:text-4xl">
              אנשי המקצוע בתחום הפונדקאות בישראל החתומים על הקוד האתי
            </h1>
            <p className="text-stone">
              כאן ניתן לראות את כל אנשי המקצוע החתומים, למיין לפי שם או תחום
              מקצועי, ולחפש בקלות.
            </p>
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

