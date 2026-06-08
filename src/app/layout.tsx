import type { Metadata } from "next";
import { Heebo, Caveat } from "next/font/google";
import Script from "next/script";
import { SkipLink } from "@/components/skip-link";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
  variable: "--font-heebo",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
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
  openGraph: {
    title: "הקוד האתי לפונדקאות בישראל",
    description:
      "מידע, הקוד האתי ורשימת החותמות והחותמים על הקוד למען פונדקאות אתית בישראל.",
    images: ["/Logo-new-wo-text.png"],
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
      <body className={`${heebo.variable} ${caveat.variable} font-sans`} suppressHydrationWarning>
        {/* Skip to main content link for keyboard navigation - IS 5568 / WCAG 2.0 AA */}
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
