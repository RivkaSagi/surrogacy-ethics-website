import React from "react";

type ScheduleItem = {
  time: string;
  title: string;
  description?: React.ReactNode;
};

type ScheduleSection = {
  partLabel?: string;
  partTitle?: string;
  items: ScheduleItem[];
};

const schedule: ScheduleSection[] = [
  {
    items: [
      { time: "9:30", title: "התכנסות וכיבוד" },
      { time: "10:00", title: "דברי פתיחה וברכות" },
    ],
  },
  {
    partLabel: "חלק א׳",
    partTitle: "״מעשה בשתי פונדקאיות״",
    items: [
      {
        time: "10:20",
        title: "מושב תגובות להשקת הרומן הגרפי של פרופ׳ אלי תימן וז׳וז׳ה ברנד",
        description: (
          <>
            <p>
              <span className="font-bold">מנהלת המושב:</span> ד״ר תמר עילם גינדין
            </p>
            <p>
              <span className="font-bold">מגיבים:</span> פרופ׳ אלי תימן, אורית הורביץ בר-עם, פרופ׳ חגי בועז ופרופ׳ אפרת בן זאב
            </p>
          </>
        ),
      },
      { time: "11:10", title: "הפסקה" },
    ],
  },
  {
    partLabel: "חלק ב׳",
    partTitle: "הקוד האתי לפונדקאות בישראל",
    items: [
      {
        time: "11:30",
        title: "דברי שר הבריאות לשעבר, ניצן הורוביץ",
      },
      {
        time: "11:40",
        title: "דברי מנהלת המחלקה לפריון והולדה במשרד הבריאות, פרופ׳ טליה גבע אלדר",
      },
      {
        time: "11:55",
        title: "פאנל: אתיקה בפונדקאות בישראל — מבט על הקונפליקטים בתהליך",
        description: (
          <>
            <p>
              <span className="font-bold">מנחה:</span> אדם רינגל
            </p>
            <p>
              <span className="font-bold">משתתפות:</span> ד״ר אורית צ׳רני גולן, רבקה שגיא ושרה טנקמן
            </p>
          </>
        ),
      },
      { time: "12:50", title: "דברי סיכום" },
    ],
  },
];

export function ConferenceSchedule() {
  return (
    <section className="bg-white rounded-2xl p-6 md:p-10 shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-2">לוח הזמנים</h2>
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
                    <p className="text-text font-bold text-base md:text-lg leading-relaxed">
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
