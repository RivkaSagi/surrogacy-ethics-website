import type { ReactNode } from "react";
import { Subtitle } from "./subtitle";
import { BulletItem } from "./bullet-item";
import { PrimaryButton } from "./primary-button";
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
      <Subtitle text="תמצית הקוד האתי" />

      {/* Principles */}
      <div className="flex flex-col gap-12 items-center w-full">
        {ethicalPrinciples.map((principle, index) => (
          <BulletItem
            key={index}
            title={principle.title}
            description={formatDescription(principle)}
          />
        ))}
      </div>

      {/* CTA Button - opens PDF in new tab */}
      <PrimaryButton href="/TheEthicsCode.pdf" target="_blank">
        לקריאת הקוד האתי המלא
      </PrimaryButton>
    </section>
  );
}
