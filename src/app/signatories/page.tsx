import Link from "next/link";
import { Header } from "@/components/header";
import { Subtitle } from "@/components/subtitle";
import { SignatoriesTable } from "@/components/signatories-table";
import { ContactSection } from "@/components/contact-section";
import { CONTENT_SOURCES } from "@/config/content";

export default function SignatoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Page Title */}
        <section className="flex flex-col items-center py-16 px-4">
          <Subtitle text="אנשי המקצוע החתומים" />
        </section>

        {/* Description - disclaimer style */}
        <section className="flex justify-center px-4 pb-10" dir="rtl">
          <div className="max-w-3xl text-center flex flex-col gap-4">
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
            <p className="text-sm text-foreground/60 leading-loose italic">
              רשימה זו כוללת את אנשי ונשות מקצוע ונותני שירותים, שבחרו להצהיר בחתימתם על מחויבותם לעקרונות ולכללי הקוד האתי. פורום הקוד האתי רואה חשיבות בשמירה על אמון הציבור ברשימת החותמים וביישום ראוי של עקרונות הקוד. בכל שאלה, הערה או בקשה לבירור ניתן לפנות לפורום הקוד האתי במייל{" "}
              <Link
                href="mailto:surrogacy.ethics.il@gmail.com"
                className="text-primary underline hover:opacity-80"
              >
                surrogacy.ethics.il@gmail.com
              </Link>
              .
            </p>
            <p className="text-sm text-foreground/60 leading-loose italic">
              כמו כן, הקוד וההתחייבות מתייחסים להליכי פונדקאות המתקיימים בישראל. הפורום אינו עוסק בהליכים המתבצעים מחוץ לישראל ולא ניתן ללמוד מרשימה זו על אופי הליכים אלה.
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
