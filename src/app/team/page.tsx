import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { Subtitle } from "@/components/subtitle";
import { ContactSection } from "@/components/contact-section";
import { TeamMembers } from "@/components/team-members";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

// About content from ~/my/about.md
const aboutContent = {
  paragraph1:
    "הקוד האתי לפונדקאות בישראל הוא יוזמה אזרחית שנולדה מהשטח על ידי פונדקאיות והורים מיועדים, בשיתוף מומחים מהאקדמיה ואנשי מקצוע מהשטח. מטרתו היא להבטיח כי הליך הפונדקאות המאופיין במורכבות רגשית, רפואית ובירוקרטית יוצאת דופן – יתנהל בצורה מוסרית, מכבדת ואוטונומית. הקוד נועד להגן על כל השותפים להליך מפני פגיעה, ניצול או חוסר ודאות, ולשמור על אופייה האלטרואיסטי של הפונדקאות בישראל.",
  paragraph2:
    "אנשי המקצוע החתומים על הקוד מתחייבים לפעול ברגישות יתרה ובמחויבות אתית מחמירה, תוך שמירה על זכויות המשתתפים ופרטיותם. הקוד מגדיר סטנדרט מקצועי המונע פונדקאות מסחרית או כפייה, ומקדם את עקרונות היסוד של צדק, שוויון ועזרה הדדית. בכך, הוא מעניק רשת ביטחון ערכית להורים ולפונדקאיות הנמצאים באחד הצמתים הרגישים והמשמעותיים בחייהם.",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Page Title */}
        <section className="flex flex-col items-center py-16 px-4">
          <Subtitle text="מי אנחנו" />
        </section>

        {/* About Section */}
        <section className="py-10 px-4 md:px-20 max-w-4xl mx-auto">
          <div className="flex flex-col gap-6 text-right text-lg leading-relaxed text-text">
            <p>{aboutContent.paragraph1}</p>
            <p>{aboutContent.paragraph2}</p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-10 px-4 md:px-20 max-w-6xl mx-auto">
          <Suspense
            fallback={
              <div className="text-center text-text/60">טוען חברי צוות...</div>
            }
          >
            <TeamMembers />
          </Suspense>
        </section>

        <ContactSection />
      </main>
    </div>
  );
}
