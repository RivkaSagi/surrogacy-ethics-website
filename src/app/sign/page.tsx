import { Header } from "@/components/v2/header";
import { SignForm } from "@/components/sign-form";
import { BGHalfCircle } from "@/components/v2/bg-half-circle";
import { ContactSection } from "@/components/contact-section";

export default function SignPage() {
  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <BGHalfCircle />
      <Header />

      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 outline-none scroll-mt-24"
      >
        <section className="pt-12 md:pt-16 pb-6 md:pb-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-text mb-4">
              חתימה על הקוד האתי
            </h1>
            <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-6" />
            <p className="text-base md:text-lg text-text/80 leading-relaxed">
              קראו את ההצהרה במלואה, מלאו את פרטיכם, וחתמו בתחתית הטופס כדי להצטרף
              לרשימת החותמים על הקוד האתי לפונדקאות בישראל.
            </p>
          </div>
        </section>

        <section className="py-8 md:py-12 px-4">
          <SignForm />
        </section>

        <ContactSection compact />
      </main>
    </div>
  );
}
