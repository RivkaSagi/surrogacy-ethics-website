import Link from "next/link";
import { Subtitle } from "./subtitle";
import { PrimaryButton } from "./primary-button";

export function ContactSection() {
  return (
    <footer className="bg-dark" dir="rtl">
      {/* Main footer content */}
      <div className="py-10 md:py-16 px-5 md:px-20">
        {/* Two columns layout */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          {/* Contact column */}
          <div className="flex flex-col gap-6 items-start">
            <Subtitle text="צרו קשר" light />
            <div className="flex flex-col gap-2 items-start text-right">
              <h2 className="text-xl md:text-2xl text-highlight">
                נשמח לשמוע מכם
              </h2>
              <div className="text-white text-base leading-relaxed">
                <p>לחתימה על הקוד, הערות או יצירת קשר:</p>
                <p className="font-bold mt-1" dir="ltr" style={{ textAlign: "right" }}>
                  surrogacy.ethics.il@gmail.com
                </p>
              </div>
            </div>
            <PrimaryButton href="mailto:surrogacy.ethics.il@gmail.com">
              כתבו לנו
            </PrimaryButton>
          </div>

          {/* Quick links column */}
          <div className="flex flex-col gap-6 items-start">
            <Subtitle text="ניווט מהיר" light />
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-white hover:text-highlight transition-colors"
              >
                עמוד הבית
              </Link>
              <Link
                href="/team"
                className="text-white hover:text-highlight transition-colors"
              >
                מי אנחנו
              </Link>
              <Link
                href="/signatories"
                className="text-white hover:text-highlight transition-colors"
              >
                אנשי המקצוע החתומים
              </Link>
              <Link
                href="/TheEthicsCode.pdf"
                target="_blank"
                className="text-white hover:text-highlight transition-colors"
              >
                הקוד האתי המלא
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/20 py-4 px-5 md:px-20">
        <p className="text-white/60 text-sm text-center">
          © {new Date().getFullYear()} הקוד האתי לפונדקאות בישראל. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
