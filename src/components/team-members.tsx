"use client";

import Image from "next/image";
import { useState } from "react";
import { TeamMember } from "@/lib/google";
import teamCache from "@/data/team-members.json";

export function TeamMembers() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const members: TeamMember[] = teamCache.members;
  const lastUpdated = teamCache.lastUpdated;

  const handleImageError = (imageId: string) => {
    setImageErrors((prev) => new Set(prev).add(imageId));
  };

  if (members.length === 0) {
    return (
      <section className="section-shell text-center">
        <p className="text-stone">
          לא נמצאו חברי צוות.
        </p>
        <p className="text-sm text-stone/70 mt-2">
          להוספת חברי צוות, הרץ: <code className="bg-sand px-2 py-1 rounded">npm run update-team</code>
        </p>
      </section>
    );
  }

  return (
    <section className="section-shell">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div
            key={member.imageId}
            className="group flex flex-col gap-4 rounded-2xl border border-border/60 bg-white/50 p-6 transition hover:border-clay/40 hover:shadow-card"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-sand/30">
              {!imageErrors.has(member.imageId) ? (
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  onError={() => handleImageError(member.imageId)}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-stone/50">
                  <span>תמונה לא זמינה</span>
                </div>
              )}
            </div>
            <div className="space-y-2 text-right">
              <h3 className="text-xl font-display text-ink">{member.name}</h3>
              <p className="text-stone leading-relaxed">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
