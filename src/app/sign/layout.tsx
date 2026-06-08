import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "חתימה על הקוד האתי לפונדקאות",
  description:
    "הצטרפות לרשימת החותמים על הקוד האתי לפונדקאות בישראל — הצהרה ופרטי קשר.",
  openGraph: {
    title: "חתימה על הקוד האתי לפונדקאות",
    description:
      "הצטרפות לרשימת החותמים על הקוד האתי לפונדקאות בישראל — הצהרה ופרטי קשר.",
    images: ["/Logo-new-w-text.png"],
  },
};

export default function SignLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
