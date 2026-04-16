import { Header } from "@/components/header";
import { LogoSection } from "@/components/logo-section";
import { BGHalfCircle } from "@/components/bg-half-circle";
import { EthicCodeSection } from "@/components/ethic-code-section";
import { PartnersSection } from "@/components/partners-section";
import { UpdatesSection } from "@/components/updates-section";
import { ContactSection } from "@/components/contact-section";
import { CONTENT_SOURCES } from "@/config/content";

export default function Home() {
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
