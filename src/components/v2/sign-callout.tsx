import Link from "next/link";

export function SignCallout() {
  return (
    <section
      id="sign"
      dir="rtl"
      className="bg-highlight/40 py-12 md:py-20 px-5 md:px-20 border-t border-border/40"
    >
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="text-2xl md:text-3xl font-bold text-text">
          חתימה על הקוד
        </h2>
        <div className="h-1 w-16 bg-primary rounded-full" />
        <p className="text-base md:text-lg text-text/80 leading-relaxed">
          אנשי מקצוע בתחום הפונדקאות בישראל: מלוות, סוכנויות, עורכי דין,
          פסיכולוגיות, רופאים ועוד, מוזמנים להצטרף לרשימת החותמים על הקוד האתי
          ולהתחייב לפעול ברוחו.
        </p>
        <Link
          href="/sign"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold text-lg px-8 py-3 rounded-2xl border-b-4 border-transparent hover:bg-[#be4b2f] hover:border-highlight hover:-translate-y-0.5 transition-all duration-200"
        >
          לחתימה על הקוד
          <span aria-hidden="true">←</span>
        </Link>
      </div>
    </section>
  );
}
