import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Subtitle } from "@/components/subtitle";
import { SignatoriesTable } from "@/components/signatories-table";
import { ContactSection } from "@/components/contact-section";
import { CONTENT_SOURCES } from "@/config/content";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function InternalSignatoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Page Title */}
        <section className="flex flex-col items-center py-16 px-4">
          <Subtitle text="אנשי המקצוע החתומים" />
        </section>

        {/* Description - disclaimer style */}
        <section className="flex justify-center px-4 pb-10" dir="rtl">
          <div className="max-w-3xl text-center">
            <p className="text-base text-foreground/70 leading-loose">
              הליכי פונדקאות בישראל מפוקחים על ידי משרד הבריאות, ודרישות החוק והנחיות הוועדה מפורטות{" "}
              <Link
                href="https://www.gov.il/he/service/embryo-carrying"
                target="_blank"
                className="text-primary underline hover:opacity-80"
              >
                באתר הממשלתי
              </Link>
              . אישור ההליך מחייב התקשרות עם גורמי מקצוע כגון רופא/ה, פסיכולוג/ית ועורך/ת דין, אך ליווי ותיווך אינם מתחייבים לפי חוק. במסגרת הקוד האתי לפונדקאות, כלל אנשי המקצוע הרלוונטיים מוזמנים להתחייב לקוד האתי ולהיכלל ברשימת החותמים.
            </p>
          </div>
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
