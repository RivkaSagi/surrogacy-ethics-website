"use client";

import { Subtitle } from "./subtitle";
import { BulletItem } from "./bullet-item";
import { PrimaryButton } from "./primary-button";
import { FadeInOnScroll } from "./fade-in-on-scroll";
import { ethicalPrinciples } from "@/data/ethical-principles";

export function EthicCodeSection() {
  return (
    <section className="flex flex-col gap-10 md:gap-16 items-center py-12 md:py-20 px-5 md:px-20 border-b border-border">
      {/* Subtitle */}
      <FadeInOnScroll>
        <Subtitle text="תמצית הקוד האתי" />
      </FadeInOnScroll>

      {/* Principles - each fades in with staggered delay, 64px gap between items */}
      <div className="flex flex-col gap-16 items-center w-full">
        {ethicalPrinciples.map((principle, index) => (
          <FadeInOnScroll key={index} delay={index * 100}>
            <BulletItem
              title={principle.title}
              description={principle.description}
            />
          </FadeInOnScroll>
        ))}
      </div>

      {/* CTA Button - opens PDF in new tab */}
      <FadeInOnScroll delay={ethicalPrinciples.length * 100}>
        <PrimaryButton href="/TheEthicsCode.pdf" target="_blank">
          לקריאת הקוד האתי המלא
        </PrimaryButton>
      </FadeInOnScroll>
    </section>
  );
}
