import Image from "next/image";
import { fetchGoogleDriveFolder } from "@/lib/google";
import { CONTENT_SOURCES } from "@/config/content";

export async function TeamMembers() {
  const members = await fetchGoogleDriveFolder(
    CONTENT_SOURCES.teamDriveFolderId,
  );

  if (members.length === 0) {
    return (
      <div className="text-center">
        <p className="text-stone">לא נמצאו חברי צוות.</p>
        <p className="text-sm text-stone/70 mt-2">
          אנא בדוק את הגדרות תיקיית Google Drive
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div
            key={member.imageId}
            className="group flex flex-col gap-4 rounded-2xl border border-border/60 bg-white/50 p-6 transition hover:border-clay/40 hover:shadow-card"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-sand/30">
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                className="object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="space-y-2 text-right">
              <h3 className="text-xl font-semibold text-ink">{member.name}</h3>
              <p className="text-stone leading-relaxed">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
  );
}
