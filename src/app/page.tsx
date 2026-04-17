import Image from "next/image";
import { BGHalfCircle } from "@/components/bg-half-circle";

export default function Home() {
  return (
    <div className="min-h-screen relative flex items-center justify-center" dir="rtl">
      <BGHalfCircle />

      <main className="relative z-10 flex flex-col items-center gap-8 px-5 text-center">
        {/* Logo */}
        <Image
          src="/Logo-new-w-text.png"
          alt="הקוד האתי לפונדקאות"
          width={200}
          height={65}
          className="h-16 md:h-20 w-auto"
        />

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-text">
          הקוד האתי לפונדקאות בישראל
        </h1>

        {/* Coming soon message */}
        <p className="text-lg md:text-xl text-text/70">
          האתר לקראת השקה במאי 2026
        </p>

        {/* Contact */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <p className="text-base text-text/60">ליצירת קשר:</p>
          <a
            href="mailto:surrogacy.ethics.il@gmail.com"
            className="text-primary hover:text-primary/80 transition-colors font-medium"
            dir="ltr"
          >
            surrogacy.ethics.il@gmail.com
          </a>
        </div>
      </main>
    </div>
  );
}
