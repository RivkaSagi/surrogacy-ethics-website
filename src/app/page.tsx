import { Header } from "@/components/v2/header";
import { LogoSection } from "@/components/v2/logo-section";
import { BGHalfCircle } from "@/components/v2/bg-half-circle";
import { EthicCodeSection } from "@/components/v2/ethic-code-section";
import { PartnersSection } from "@/components/v2/partners-section";
import { UpdatesSection } from "@/components/v2/updates-section";
import { ContactSection } from "@/components/v2/contact-section";
import { CONTENT_SOURCES } from "@/config/content";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <BGHalfCircle />
      <Header />

      <main id="main-content" className="relative z-10">
        <LogoSection />
        <EthicCodeSection />
        <PartnersSection />
        <UpdatesSection docId={CONTENT_SOURCES.updatesDocId} />
        <ContactSection />
      </main>
    </div>
  );
}
