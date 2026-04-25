import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://www.surrogacyethicsil.org"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5XJH08PVE5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5XJH08PVE5');
          `}
        </Script>
      </head>
      <body className={`${heebo.variable} font-sans`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
