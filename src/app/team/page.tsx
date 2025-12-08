import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { TeamMembers } from "@/components/team-members";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand via-mist to-white">
      <SiteHeader />
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:py-16">
        <section className="glass-panel space-y-4 text-right">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="badge">מי אנחנו</p>
              <h1 className="text-3xl font-display text-ink">
                צוות הפורום להובלת הקוד האתי
              </h1>
              <p className="text-stone mt-2">
                היכרות עם חברי הצוות המוביל את היוזמה
              </p>
            </div>
            <Link
              href="/"
              className="text-sm text-clay underline-offset-4 hover:underline"
            >
              ← חזרה לעמוד הבית
            </Link>
          </div>
        </section>

        <TeamMembers />
      </main>
    </div>
  );
}
