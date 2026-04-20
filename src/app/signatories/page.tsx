import type { Metadata } from "next";
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

        {/* Placeholder Note */}
        <section className="flex justify-center px-4 pb-16">
          <div className="max-w-4xl text-center">
            <p className="text-lg text-foreground/80 leading-relaxed">
              אנשי המקצוע החתומים על הקוד האתי ופרטי הקשר שלהם יופיעו בדף הזה החל מה-20 במאי.
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
