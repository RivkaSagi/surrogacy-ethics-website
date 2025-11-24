import Image from "next/image";

export function HeroSection() {
  return (
    <section className="glass-panel mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 text-center sm:px-10 sm:py-14 md:flex-row md:text-right">
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-display text-ink sm:text-4xl">
          קוד אתי לפונדקאות בישראל
        </h1>
        <p className="text-stone leading-relaxed">
          האתר מציג את הקוד האתי, רשימת אנשי המקצוע החתומים, 
          מידע נוסף על היוזמה ופרטי קשר לפורום ההובלה.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
          <a
            href="#about"
            className="rounded-full bg-clay px-6 py-3 text-white shadow-card transition hover:bg-clay/90"
          >
            היכרות מהירה
          </a>
          <a
            href="#signatories"
            className="rounded-full border border-border px-6 py-3 text-ink transition hover:border-clay hover:text-clay"
          >
            לרשימת החתומים
          </a>
        </div>
      </div>

      <div className="relative flex-1">
        <Image
          src="/hero.jpeg"
          alt="דיון סביב שולחן היוזמה"
          width={640}
          height={640}
          priority
          className="h-full w-full rounded-[32px] object-cover shadow-card"
        />
      </div>
    </section>
  );
}

