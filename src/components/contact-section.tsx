import Link from "next/link";
import { Subtitle } from "./subtitle";
import { PrimaryButton } from "./primary-button";

interface ContactSectionProps {
  compact?: boolean;
}

export function ContactSection({ compact = false }: ContactSectionProps) {
  return (
    <footer id="footer" className="bg-dark" dir="rtl">
      {/* Main footer content */}
      <div className={compact ? "py-5 md:py-8 px-5 md:px-20" : "py-10 md:py-16 px-5 md:px-20"}>
        {/* Two columns on desktop, single column on mobile */}
        <div className="flex flex-col md:flex-row md:items-stretch md:gap-[220px] gap-8">
          {/* Right column in RTL - Contact info */}
          <div className="flex flex-col gap-6 items-start md:justify-between">
            <div className="flex flex-col gap-6 items-start">
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
            </div>

            <PrimaryButton href="mailto:surrogacy.ethics.il@gmail.com">
              כתבו לנו
            </PrimaryButton>
          </div>

          {/* Left column in RTL - Navigation links */}
          <div className="flex flex-col gap-6 items-start">
            <Subtitle text="ניווט" light />
            <nav className="flex flex-col gap-2">
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
              <Link
                href="/accessibility"
                className="text-[14px] hover:opacity-80 transition-opacity"
                style={{ color: "#FFC5B2" }}
              >
                הצהרת נגישות
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
