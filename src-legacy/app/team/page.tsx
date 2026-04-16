import { SiteHeader } from "@/components/site-header";
import { TeamMembers } from "@/components/team-members";
import { DocPanel } from "@/components/doc-panel";
import { CONTENT_SOURCES } from "@/config/content";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand via-mist to-white">
      <SiteHeader />
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:py-16">
        <DocPanel
          docId={CONTENT_SOURCES.aboutDocId}
          title="הרקע לכתיבת הקוד האתי ומי אנחנו"
          variant="default"
          showBadge={true}
          badgeText="מי אנחנו"
        />

        <section className="section-shell">
          <div className="max-w-3xl space-y-2 mb-6 sm:pr-12">
            <p className="badge">צוות הפורום</p>
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
              השותפים בכתיבת ובעריכת הקוד האתי
            </h2>
          </div>
          <TeamMembers />
        </section>
      </main>
    </div>
  );
}
