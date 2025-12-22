import Image from "next/image";

export function HeroSection() {
  return (
    <section className="glass-panel mx-auto max-w-4xl px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center">
        <div className="flex-shrink-0">
          <Image
            src="/Logo2.png"
            alt="לוגו קוד אתי לפונדקאות"
            width={200}
            height={154}
            className="object-contain"
            priority
          />
        </div>
        <div className="space-y-5 text-center sm:text-right">
          <h1 className="text-4xl font-display text-ink sm:text-5xl lg:text-6xl">
            הקוד האתי לפונדקאות בישראל
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
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

