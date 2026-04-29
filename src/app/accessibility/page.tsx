import { Metadata } from "next";
import { Header } from "@/components/v2/header";
import { ContactSection } from "@/components/v2/contact-section";

export const metadata: Metadata = {
  title: "הצהרת נגישות | הקוד האתי לפונדקאות בישראל",
  description: "הצהרת נגישות אתר הקוד האתי לפונדקאות בישראל בהתאם לתקן IS 5568",
};

export default function AccessibilityPage() {
  const lastUpdated = new Date().toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <main id="main-content" className="py-12 px-5 md:px-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">הצהרת נגישות</h1>

        <div className="space-y-8 text-text leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-4">מחויבותנו לנגישות</h2>
            <p>
              אתר הקוד האתי לפונדקאות בישראל מחויב להנגשת התכנים שלו לכלל הציבור,
              לרבות אנשים עם מוגבלויות, בהתאם לחוק שוויון זכויות לאנשים עם
              מוגבלות (התשנ&quot;ח - 1998) ותקנותיו, ובהתאם לתקן הישראלי IS 5568
              המבוסס על הנחיות WCAG 2.0 ברמה AA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">התאמות הנגישות באתר</h2>
            <p className="mb-4">האתר כולל את התאמות הנגישות הבאות:</p>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>ניווט באמצעות מקלדת בלבד</li>
              <li>קישור &quot;דלג לתוכן הראשי&quot; בתחילת כל עמוד</li>
              <li>תיאור טקסטואלי (alt) לתמונות</li>
              <li>מבנה כותרות היררכי ונכון</li>
              <li>ניגודיות צבעים מספקת</li>
              <li>שפת העמוד מוגדרת בקוד (עברית)</li>
              <li>טפסים עם תוויות מתאימות</li>
              <li>טבלאות עם כותרות מוגדרות</li>
              <li>אינדיקציה ברורה לפוקוס במעבר בין אלמנטים</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">דפדפנים וטכנולוגיות נתמכות</h2>
            <p>
              האתר נבנה לתמיכה בדפדפנים המודרניים (Chrome, Firefox, Safari, Edge)
              ובטכנולוגיות מסייעות כגון קוראי מסך.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">יצירת קשר בנושא נגישות</h2>
            <p className="mb-4">
              אם נתקלתם בבעיית נגישות באתר, או שיש לכם הצעות לשיפור הנגישות,
              נשמח לשמוע מכם:
            </p>
            <div className="bg-background/50 p-4 rounded-lg border border-border">
              <p className="font-bold mb-2">רכז/ת נגישות:</p>
              <p>דוא&quot;ל: surrogacy.ethics.il@gmail.com</p>
            </div>
            <p className="mt-4">
              אנו מתחייבים לטפל בכל פנייה בנושא נגישות.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">עדכון הצהרת הנגישות</h2>
            <p>הצהרה זו עודכנה לאחרונה בתאריך: {lastUpdated}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">מידע נוסף</h2>
            <p>
              הנגשת האתר בוצעה בהתאם לתקן הישראלי IS 5568 ולהנחיות WCAG 2.0 ברמת
              AA. אנו ממשיכים לעבוד על שיפור הנגישות באתר באופן שוטף.
            </p>
          </section>
        </div>
      </main>
      <ContactSection />
    </div>
  );
}
