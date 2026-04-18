"use client";

import type { ReactNode } from "react";
import { Subtitle } from "./subtitle";
import { BulletItem } from "./bullet-item";
import { PrimaryButton } from "./primary-button";
import { FadeInOnScroll } from "./fade-in-on-scroll";
import {
  ethicalPrinciples,
  type EthicalPrinciple,
} from "@/data/ethical-principles";

function formatDescription(principle: EthicalPrinciple): ReactNode {
  const description = principle.description;

  if (principle.boldParts.length === 0) {
    return description;
  }

  const parts: ReactNode[] = [];
  let remaining = description;

  principle.boldParts.forEach((boldPart, index) => {
    const splitIndex = remaining.indexOf(boldPart);
    if (splitIndex !== -1) {
      if (splitIndex > 0) {
        parts.push(remaining.substring(0, splitIndex));
      }
      parts.push(
        <strong key={index} className="font-bold">
          {boldPart}
        </strong>
      );
      remaining = remaining.substring(splitIndex + boldPart.length);
    }
  });

  if (remaining) {
    parts.push(remaining);
  }

  return <>{parts}</>;
}

export function EthicCodeSection() {
  return (
    <section className="flex flex-col gap-10 md:gap-16 items-center py-12 md:py-20 px-5 md:px-20 border-b border-border">
      {/* Subtitle */}
      <FadeInOnScroll>
        <Subtitle text="תמצית הקוד האתי" />
      </FadeInOnScroll>

      {/* Principles - each fades in with staggered delay */}
      <div className="flex flex-col gap-12 items-center w-full">
        {ethicalPrinciples.map((principle, index) => (
          <FadeInOnScroll key={index} delay={index * 100}>
            <BulletItem
              title={principle.title}
              description={formatDescription(principle)}
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
