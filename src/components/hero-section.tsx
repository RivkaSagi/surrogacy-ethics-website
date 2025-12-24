import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center py-16 sm:py-20">
      {/* Full-width background frame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-full bg-gradient-to-r from-clay/20 via-clay/30 to-clay/20 shadow-lg" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-8 sm:flex-row sm:items-center sm:justify-center sm:px-12 lg:px-16">
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
    </section>
  );
}

