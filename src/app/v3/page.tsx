import type { Metadata } from "next";
import { Header } from "@/components/v3/header";
import { LogoSection } from "@/components/v3/logo-section";
import { BGHalfCircle } from "@/components/v3/bg-half-circle";
import { EthicCodeSection } from "@/components/v3/ethic-code-section";
import { PartnersSection } from "@/components/v3/partners-section";
import { UpdatesSection } from "@/components/v3/updates-section";
import { ContactSection } from "@/components/v3/contact-section";
import { CONTENT_SOURCES } from "@/config/content";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function V3Page() {
  return (
    <div className="min-h-screen relative">
      <BGHalfCircle />
      <Header />

      <main className="relative z-10">
        <LogoSection />
        <EthicCodeSection />
        <PartnersSection />
        <UpdatesSection docId={CONTENT_SOURCES.updatesDocId} />
        <ContactSection />
      </main>
    </div>
  );
}
