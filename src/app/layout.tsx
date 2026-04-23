import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "הקוד האתי לפונדקאות בישראל",
  description:
    "מידע, הקוד האתי ורשימת החותמות והחותמים על הקוד למען פונדקאות אתית בישראל.",
  icons: {
    icon: "/Logo-new-wo-text.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-sans`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
