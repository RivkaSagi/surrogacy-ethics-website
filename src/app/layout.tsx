import type { Metadata } from "next";
import { Assistant, Secular_One } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-assistant",
  display: "swap",
});

const secular = Secular_One({
  subsets: ["hebrew", "latin"],
  weight: "400",
  variable: "--font-secular",
  display: "swap",
});

export const metadata: Metadata = {
  title: "קוד אתי לפונדקאות",
  description:
    "מידע, הקוד האתי ורשימת החותמות והחותמים על הקוד למען פונדקאות אתית בישראל.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${assistant.variable} ${secular.variable}`}>
        {children}
      </body>
    </html>
  );
}
