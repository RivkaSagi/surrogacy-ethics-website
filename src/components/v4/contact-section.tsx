import Link from "next/link";
import { Subtitle } from "./subtitle";
import { PrimaryButton } from "./primary-button";
import { FooterStoryAnimation } from "./footer-story-animation";

export function ContactSection() {
  return (
    <footer className="relative bg-dark overflow-x-clip" dir="rtl">
      {/* Animation overlay - spans entire footer, above content */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Animation container - positioned at bottom, above copyright */}
        {/* Multiple clipping methods to ensure elements cannot go below ground */}
        <div
          className="absolute left-0 right-0 bottom-12 h-40 md:h-52 overflow-hidden"
          style={{
            clipPath: "inset(0 0 0 0)",
            contain: "paint",
          }}
        >
          <FooterStoryAnimation />
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative py-10 md:py-16 px-5 md:px-20">
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

      {/* Ground line - visual separator */}
      <div className="border-b border-white/20" />

      {/* Copyright bar */}
      <div className="py-4 px-5 md:px-20">
        <p className="text-white/60 text-sm text-center">
          © {new Date().getFullYear()} הקוד האתי לפונדקאות בישראל. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
