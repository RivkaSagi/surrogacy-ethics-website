import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "אנשי מקצוע בפונדקאות בישראל",
  description: "אנשי המקצוע החתומים והמחוייבים לקוד האתי לפונדקאות",
  openGraph: {
    title: "אנשי מקצוע בפונדקאות בישראל",
    description: "אנשי המקצוע החתומים והמחוייבים לקוד האתי לפונדקאות",
    images: ["/Logo-new-w-text.png"],
  },
};

export default function SignatoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
