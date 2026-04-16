import { Header } from "@/components/header";
import { Subtitle } from "@/components/subtitle";
import { SignatoriesTable } from "@/components/signatories-table";
import { ContactSection } from "@/components/contact-section";
import { CONTENT_SOURCES } from "@/config/content";

export default function SignatoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Page Title */}
        <section className="flex flex-col items-center py-16 px-4">
          <Subtitle text="אנשי המקצוע החתומים" />
        </section>

        {/* Signatories Table */}
        <SignatoriesTable
          sheetId={CONTENT_SOURCES.signatoriesSheetId}
          gid={CONTENT_SOURCES.signatoriesGid}
        />

        <ContactSection />
      </main>
    </div>
  );
}
