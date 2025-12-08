export function HeroSection() {
  return (
    <section className="glass-panel mx-auto max-w-4xl space-y-6 px-8 py-12 text-center sm:px-12 sm:py-16 lg:px-16 lg:py-20">
      <div className="space-y-5">
        <h1 className="text-4xl font-display text-ink sm:text-5xl lg:text-6xl">
          קוד אתי לפונדקאות בישראל
        </h1>
        <p className="text-lg text-stone leading-relaxed sm:text-xl">
          האתר מציג את הקוד האתי, רשימת אנשי המקצוע החתומים,
          מידע נוסף על היוזמה ופרטי קשר לפורום ההובלה.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <a
          href="#about"
          className="rounded-full bg-clay px-8 py-4 text-white shadow-card transition hover:bg-clay/90"
        >
          היכרות מהירה
        </a>
        <a
          href="#signatories"
          className="rounded-full border border-border px-8 py-4 text-ink transition hover:border-clay hover:text-clay"
        >
          לרשימת החתומים
        </a>
      </div>
    </section>
  );
}

