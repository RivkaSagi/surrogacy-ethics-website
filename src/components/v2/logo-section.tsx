"use client";

import { AnimatedLogo } from "./animated-logo";

export function LogoSection() {
  return (
    <section className="flex flex-col items-center gap-10 px-5 pt-[calc(25vh-100px)] md:pt-[calc(30vh-100px)]">
      {/* Animated logo with scroll-based balance scale */}
      <div className="w-80 h-40" id="animated-logo">
        <AnimatedLogo />
      </div>

      {/* Title */}
      <h1 className="font-bold text-2xl md:text-3xl text-text text-center">
        הקוד האתי לפונדקאות בישראל
      </h1>
    </section>
  );
}
