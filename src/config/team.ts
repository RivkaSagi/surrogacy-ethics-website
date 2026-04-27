export type TeamMember = {
  name: string;
  description: string;
  imageUrl: string;
};

// Team members sorted alphabetically in Hebrew by first name, ignoring prefixes like Dr., Prof.
export const teamMembers: TeamMember[] = [
  {
    name: "אדם רינגל",
    description: "דובר פוליטי, עבד במשרד הבריאות בועדה לאישור הסכמי פונדקאות, בנו ירמי נולד בתהליך פונדקאות בארץ",
    imageUrl: "/team/adam-ringel.png",
  },
  {
    name: "אורית הורוביץ בר-עם",
    description: "דוקטורנטית באוניברסיטת בן גוריון, חוקרת פונדקאות ופונדקאית",
    imageUrl: "/team/orit-horovitz-bar-am.jpg",
  },
  {
    name: "דוקטור אורית צ׳רני גולן",
    description: "ד״ר לביואתיקה, חברת סגל בכיר באקדמית עמק יזרעאל, חוקרת פוריות ומדיניות בריאות",
    imageUrl: "/team/orit-cherny-golan.png",
  },
  {
    name: "פרופסור אלי תימן",
    description: "פרופסור חבר ומרצה במרכז האקדמי רופין, חוקרת מעל שני עשורים תהליכי פונדקאות",
    imageUrl: "/team/eli-timan.png",
  },
  {
    name: "רבקה שגיא",
    description: "מתכנתת, ילדה בן בתהליך פונדקאות ב2016",
    imageUrl: "/team/rivka-sagi.jpg",
  },
  {
    name: "שחר ראובן",
    description: "פיזיותרפיסטית, אקטיביסטית בתחום בריאות האישה ופונדקאית.",
    imageUrl: "/team/shahar-reuven.jpeg",
  },
  {
    name: "שלומית ראונר",
    description: "מנהלת בית ספר, ילדה שתי בנות בתהליכי פונדקאות",
    imageUrl: "/team/shlomit-rauner.jpg",
  },
  {
    name: "שרה טנקמן",
    description: "מייסדת ומנכ״לית קרן בריאה, ביתה רעות נולדה בתהליך פונדקאות",
    imageUrl: "/team/sara-tankman.png",
  },
  {
    name: "דוקטור תמר עילם גינדין",
    description: "דוקטור לבלשנות, מומחית לפרסית ולאיראן, ילדה בן בתהליך פונדקאות בשנת 2006",
    imageUrl: "/team/tamar-ilam-gindin.png",
  },
];
