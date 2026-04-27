import Image from "next/image";
import { teamMembers } from "@/config/team";

export function TeamMembers() {
  if (teamMembers.length === 0) {
    return (
      <div className="text-center">
        <p className="text-text/60">לא נמצאו חברי צוות.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {teamMembers.map((member) => (
        <div
          key={member.imageUrl}
          className="group flex flex-col gap-4 rounded-2xl border border-border/60 bg-white/50 p-6 transition hover:border-primary/40 hover:shadow-lg"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-highlight/30">
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className="object-cover transition group-hover:scale-105"
            />
          </div>
          <div className="space-y-2 text-right">
            <h3 className="text-xl font-semibold text-text">{member.name}</h3>
            <p className="text-text/70 leading-relaxed">{member.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
