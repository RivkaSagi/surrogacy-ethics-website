"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { DocPanel } from "@/components/doc-panel";
import { UpdatesPanel } from "@/components/updates-panel";
import { ContactCard } from "@/components/contact-card";
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { CONTENT_SOURCES } from "@/config/content";

export default function Home() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const sections = [
    {
      id: "summary",
      component: (
        <DocPanel
          localPath="/docs/summary.html"
          title="תמצית הקוד האתי"
          showPdfButton={true}
          isPdfModalOpen={isPdfModalOpen}
          setIsPdfModalOpen={setIsPdfModalOpen}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand via-mist to-white">
      <HashScrollHandler />
      <SiteHeader onHeaderClick={() => setIsPdfModalOpen(false)} />
      <HeroSection />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:gap-12">
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              {section.component}
            </div>
          ))}
        </div>

        <UpdatesPanel docId={CONTENT_SOURCES.updatesDocId} />

        <ContactCard />
      </main>

      <footer className="mt-8 border-t border-border/50 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-center text-sm text-stone sm:flex-row sm:items-center sm:justify-between sm:text-right">
        </div>
      </footer>
    </div>
  );
}
