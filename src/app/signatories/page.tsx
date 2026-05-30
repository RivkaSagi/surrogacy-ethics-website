import Link from "next/link";
import { Header } from "@/components/header";
import { Subtitle } from "@/components/subtitle";
import { ContactSection } from "@/components/contact-section";

export default function SignatoriesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Title */}
        <section className="flex flex-col items-center py-16 px-4">
          <Subtitle text="אנשי המקצוע החתומים" />
        </section>

        {/* Description - disclaimer style */}
        <section className="flex justify-center px-4 pb-8" dir="rtl">
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

        {/* Coming Soon Note */}
        <section className="flex justify-center px-4 pb-16">
          <div className="max-w-4xl text-center">
            <p className="text-lg text-foreground/80 leading-relaxed font-bold">
              אנשי המקצוע החתומים על הקוד האתי ופרטי הקשר שלהם יופיעו בדף הזה החל מאמצע יוני 2026,
              <br />
              עד אז מוזמנים לקרוא את הקוד וליצור קשר לחתימה או לשאלות.
            </p>
          </div>
        </section>
      </main>

      <ContactSection compact />
    </div>
  );
}
