import Link from "next/link";
import { Subtitle } from "./subtitle";
import { PrimaryButton } from "./primary-button";
import { FooterAnimation } from "../footer-animation";

export function ContactSection() {
  return (
    <footer id="footer" className="bg-dark" dir="rtl">
      {/* Main footer content with animation background */}
      <div className="relative py-10 md:py-16 px-5 md:px-20">
        {/* Background animation - positioned above the copyright line */}
        <FooterAnimation />
        {/* Single column - contact info with links */}
        <div className="relative z-10 flex flex-col gap-6 items-start">
          <Subtitle text="צרו קשר" light />

          {/* Contact info - 14px text, 8px gap, #FFC5B2 color */}
          <div className="flex flex-col gap-2 items-start">
            <p className="text-[14px] leading-relaxed" style={{ color: "#FFC5B2" }}>
              לחתימה על הקוד, הערות או יצירת קשר:
            </p>
            <p className="text-[14px] font-bold" dir="ltr" style={{ color: "#FFC5B2", textAlign: "right" }}>
              surrogacy.ethics.il@gmail.com
            </p>
          </div>

          <PrimaryButton href="mailto:surrogacy.ethics.il@gmail.com">
            כתבו לנו
          </PrimaryButton>

          {/* Navigation links - 14px text, 8px gap, #FFC5B2 color */}
          <nav className="flex flex-col gap-2 mt-4">
            <Link
              href="/"
              className="text-[14px] hover:opacity-80 transition-opacity"
              style={{ color: "#FFC5B2" }}
            >
              עמוד הבית
            </Link>
            <Link
              href="/team"
              className="text-[14px] hover:opacity-80 transition-opacity"
              style={{ color: "#FFC5B2" }}
            >
              מי אנחנו
            </Link>
            <Link
              href="/signatories"
              className="text-[14px] hover:opacity-80 transition-opacity"
              style={{ color: "#FFC5B2" }}
            >
              אנשי המקצוע החתומים
            </Link>
            <Link
              href="/TheEthicsCode.pdf"
              target="_blank"
              className="text-[14px] hover:opacity-80 transition-opacity"
              style={{ color: "#FFC5B2" }}
            >
              הקוד האתי המלא
            </Link>
          </nav>
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
