"use client";

import Image from "next/image";

export function LogoSection() {
  return (
    <section className="flex flex-col items-center gap-10 px-5 pt-8">
      {/* Logo from Figma design */}
      <div className="relative w-64 h-32" id="animated-logo">
        <Image
          src="/logo-main.svg"
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
