import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "כנס השקה",
  description:
    "הרשמה לכנס ההשקה של הקוד האתי לפונדקאות וספרן של פרופ׳ אלי תימן וז׳וז׳ה ברנד ״מעשה בשתי פונדקאיות״ | 04.06.2026 | המרכז האקדמי רופין",
  openGraph: {
    title: "כנס השקה",
    description:
      "הרשמה לכנס ההשקה של הקוד האתי לפונדקאות וספרן של פרופ׳ אלי תימן וז׳וז׳ה ברנד ״מעשה בשתי פונדקאיות״ | 04.06.2026 | המרכז האקדמי רופין",
    images: ["/conference-invitation.jpg"],
  },
};

export default function ConferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
