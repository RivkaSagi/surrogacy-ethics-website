import { Header } from "@/components/v4/header";
import { LogoSection } from "@/components/v4/logo-section";
import { BGHalfCircle } from "@/components/v4/bg-half-circle";
import { EthicCodeSection } from "@/components/v4/ethic-code-section";
import { PartnersSection } from "@/components/v4/partners-section";
import { UpdatesSection } from "@/components/v4/updates-section";
import { ContactSection } from "@/components/v4/contact-section";
import { CONTENT_SOURCES } from "@/config/content";

export default function V4Page() {
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
