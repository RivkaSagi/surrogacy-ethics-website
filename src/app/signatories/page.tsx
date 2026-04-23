import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Subtitle } from "@/components/subtitle";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignatoriesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Title */}
        <section className="flex flex-col items-center py-16 px-4">
          <Subtitle text="אנשי המקצוע החתומים" />
        </section>

        {/* Description */}
        <section className="flex justify-center px-4 pb-8" dir="rtl">
          <div className="max-w-4xl text-center">
            <div className="text-lg text-foreground/80 leading-relaxed space-y-4">
              <p>
                תהליך הפונדקאות בישראל מפוקח על ידי משרד הבריאות וכולל דרישות שונות המפורטות{" "}
                <Link
                  href="https://www.gov.il/he/service/embryo-carrying"
                  target="_blank"
                  className="text-primary underline hover:opacity-80"
                >
                  באתר הממשלתי
                </Link>
                .
              </p>
              <p>
                חלק מהדרישות בתהליך כגון הערכה פסיכולוגית או ייצוג משפטי מחייבות היעזרות באיש מקצוע,
                <br />
                לחלופין אנשי מקצוע אחרים מציעים שירותים כמו ליווי או תכלול התהליך (סוכנויות) לטובת השותפים על אף ששירותים אלו לא נדרשים על פי החוק.
              </p>
              <p>
                בפרויקט זה אנחנו מזמינים כל איש מקצוע שמשיק לתחום ורואה את עצמו מחויב לקוד האתי לחתום על מחויבות להתנהל על פיו ואנו מרכזים כאן את רשימת החותמים.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Note */}
        <section className="flex justify-center px-4 pb-16">
          <div className="max-w-4xl text-center">
            <p className="text-lg text-foreground/80 leading-relaxed font-bold">
              אנשי המקצוע החתומים על הקוד האתי ופרטי הקשר שלהם יופיעו בדף הזה החל מה-20 במאי 2026,
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
