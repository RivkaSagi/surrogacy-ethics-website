"use client";

import Image from "next/image";

export function LogoSection() {
  return (
    <section className="flex flex-col items-center gap-10 px-5 pt-8">
      {/* Logo placeholder for scroll animation - will be implemented later */}
      <div className="relative w-64 h-52" id="animated-logo">
        <Image
          src="/Logo-new-wo-text.png"
          alt="לוגו הקוד האתי לפונדקאות"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Title */}
      <h1 className="font-bold text-2xl md:text-3xl text-text text-center">
        הקוד האתי לפונדקאות בישראל
      </h1>
    </section>
  );
}
