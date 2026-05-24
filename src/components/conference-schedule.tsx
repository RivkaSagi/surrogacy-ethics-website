import React from "react";

type ScheduleItem = {
  time: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  highlight?: boolean;
};

type ScheduleSection = {
  partLabel?: string;
  partTitle?: string;
  items: ScheduleItem[];
};

const schedule: ScheduleSection[] = [
  {
    items: [
      { time: "9:30", title: "התכנסות, קפה ומאפה" },
      {
        time: "10:00",
        title: "דברי פתיחה וברכות",
        description: (
          <ul className="list-disc pr-5 space-y-1">
            <li><span className="font-bold">פרופ׳ מימי אייזנשטדט</span>, נשיאת המרכז האקדמי רופין</li>
            <li><span className="font-bold">ד״ר מיכל מורג</span>, ראש המחלקה למדעי ההתנהגות, המרכז האקדמי רופין</li>
            <li><span className="font-bold">גב׳ רבקה שגיא</span>, פונדקאית, פורום הקוד האתי לפונדקאות בישראל</li>
          </ul>
        ),
      },
    ],
  },
  {
    partLabel: "חלק א׳",
    partTitle: "״מעשה בשתי פונדקאיות״",
    items: [
      {
        time: "10:20",
        highlight: true,
        title: "מושב תגובות להשקת הרומן הגרפי של פרופ׳ אלי תימן וז׳וז׳ה ברנד",
        description: (
          <>
            <p>
              <span className="font-bold">יושבת ראש המושב:</span> <span className="font-bold">ד״ר תמר עילם גינדין</span>, בלשנית ומומחית לפרסית ולאיראן, פונדקאית
            </p>
            <p>
              <span className="font-bold">פתיחה:</span> <span className="font-bold">פרופ׳ אלי תימן</span>, פרופ׳ חבר במחלקה למדעי ההתנהגות, המרכז האקדמי רופין
            </p>
            <div>
              <p className="font-bold">מגיבים:</p>
              <ul className="list-disc pr-5 space-y-1 mt-1">
                <li><span className="font-bold">גב׳ אורית הורוביץ בר-עם</span>, דוקטורנטית במחלקה לסוציולוגיה ואנתרופולוגיה, אוניברסיטת בן גוריון, פונדקאית</li>
                <li><span className="font-bold">פרופ׳ חגי בועז</span>, מכון ון ליר בירושלים, המחלקה לפוליטיקה וממשל באוניברסיטת בן גוריון</li>
                <li><span className="font-bold">פרופ׳ אפרת בן זאב</span>, פרופ׳ חבר במחלקה למדעי ההתנהגות, המרכז האקדמי רופין</li>
              </ul>
            </div>
          </>
        ),
      },
      { time: "11:10", title: "הפסקה, כיבוד" },
    ],
  },
  {
    partLabel: "חלק ב׳",
    partTitle: "הקוד האתי לפונדקאות בישראל",
    items: [
      {
        time: "11:30",
        title: "דברי שר הבריאות לשעבר, מר ניצן הורוביץ",
      },
      {
        time: "11:40",
        title: "דברי מנהלת המחלקה לפריון והולדה במשרד הבריאות, פרופ׳ טליה אלדר גבע",
      },
      {
        time: "11:55",
        highlight: true,
        title: "פאנל: אתיקה בפונדקאות בישראל — מבט על הקונפליקטים בתהליך",
        description: (
          <>
            <p>
              <span className="font-bold">מנחה:</span> <span className="font-bold">מר אדם רינגל</span>, דובר פוליטי, אב לילד שנולד בהליך פונדקאות
            </p>
            <div>
              <p className="font-bold">משתתפות:</p>
              <ul className="list-disc pr-5 space-y-1 mt-1">
                <li><span className="font-bold">ד״ר אורית צ׳רני גולן</span>, ביואתיקאית, חוקרת פוריות ומדיניות בריאות, המכללה האקדמית עמק יזרעאל</li>
                <li><span className="font-bold">גב׳ רבקה שגיא</span>, מהנדסת תוכנה, פונדקאית</li>
                <li><span className="font-bold">גב׳ שרה טנקמן</span>, מייסדת ומנהלת קרן בריאה, אמא לילדה שנולדה בהליך פונדקאות</li>
              </ul>
            </div>
          </>
        ),
      },
    ],
  },
  {
    items: [
      {
        time: "12:50",
        title: "דברי סיכום: גב׳ שלי דקל, פסיכולוגית קלינית, פונדקאית",
      },
    ],
  },
];

export function ConferenceSchedule() {
  return (
    <section className="bg-white rounded-2xl p-6 md:p-10 shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-2">סדר יום</h2>
        <div className="inline-block">
          <div className="h-1 w-16 bg-highlight rounded-full mx-auto" />
        </div>
        <p className="mt-4 text-text/60">04.06.2026 · המרכז האקדמי רופין</p>
      </div>

      <div className="space-y-10">
        {schedule.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            {section.partTitle && (
              <div className="mb-6 pb-3 border-b border-border/40 sm:pr-[7.5rem]">
                {section.partLabel && (
                  <div className="text-primary font-bold text-sm tracking-wide uppercase mb-1">
                    {section.partLabel}
                  </div>
                )}
                <h3 className="text-xl md:text-2xl font-bold text-text">
                  {section.partTitle}
                </h3>
              </div>
            )}

            <ol className="space-y-5">
              {section.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
                >
                  <div className="shrink-0 sm:w-24">
                    <span className="inline-block bg-background text-primary font-bold text-base px-3 py-1 rounded-md">
                      {item.time}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p
                      className={
                        "font-bold text-base md:text-lg leading-relaxed " +
                        (item.highlight
                          ? "inline-block bg-highlight/40 text-text px-3 py-1.5 rounded-md"
                          : "text-text")
                      }
                    >
                      {item.title}
                    </p>
                    {item.description && (
                      <div className="mt-2 text-text/70 text-sm md:text-base space-y-1 leading-relaxed">
                        {item.description}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
