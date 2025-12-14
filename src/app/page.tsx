import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { DocPanel } from "@/components/doc-panel";
import { SignatoriesTable } from "@/components/signatories-table";
import { UpdatesPanel } from "@/components/updates-panel";
import { ContactCard } from "@/components/contact-card";
import { CONTENT_SOURCES } from "@/config/content";

const sections = [
  {
    id: "about",
    component: (
      <DocPanel
        docId={CONTENT_SOURCES.aboutDocId}
        title="מי אנחנו"
        description="היכרות עם היוזמה, הצוות והחזון שמוביל את כתיבת הקוד האתי."
        variant="preview"
        ctaHref="/team"
        ctaLabel="היכרות עם צוות הפורום"
      />
    ),
  },
  {
    id: "summary",
    component: (
      <DocPanel
        docId={CONTENT_SOURCES.summaryDocId}
        title="תמצית הקוד האתי"
          description="תמצית העקרונות המרכזיים של הקוד."
      />
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand via-mist to-white">
      <SiteHeader />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:gap-12">
        <HeroSection />

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              {section.component}
            </div>
          ))}
        </div>

        <div id="ethics">
          <DocPanel
            docId={CONTENT_SOURCES.ethicsDocId}
            title="הקוד האתי המלא"
            description="המסמך המלא כולל 14 עמודים ומוצג גם בעמוד ייעודי לקריאה נוחה."
            variant="preview"
            ctaHref="/code"
            ctaLabel="לקריאת הקוד המלא"
          />
        </div>

        <SignatoriesTable
          sheetId={CONTENT_SOURCES.signatoriesSheetId}
          gid={CONTENT_SOURCES.signatoriesGid}
          limit={4}
        />

        <UpdatesPanel docId={CONTENT_SOURCES.updatesDocId} />

        <ContactCard />
      </main>

      <footer className="mt-8 border-t border-border/50 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-center text-sm text-stone sm:flex-row sm:items-center sm:justify-between sm:text-right">
        </div>
      </footer>
    </div>
  );
}
