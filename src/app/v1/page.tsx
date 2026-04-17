import { Header } from "@/components/v1/header";
import { LogoSection } from "@/components/v1/logo-section";
import { BGHalfCircle } from "@/components/v1/bg-half-circle";
import { EthicCodeSection } from "@/components/v1/ethic-code-section";
import { PartnersSection } from "@/components/v1/partners-section";
import { UpdatesSection } from "@/components/v1/updates-section";
import { ContactSection } from "@/components/v1/contact-section";
import { CONTENT_SOURCES } from "@/config/content";

export default function V1Page() {
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
