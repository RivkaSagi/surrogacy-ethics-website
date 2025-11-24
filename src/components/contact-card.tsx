"use client";

import { CONTACT } from "@/config/content";

export function ContactCard() {
  const mailto = `mailto:${CONTACT.email}?subject=${CONTACT.subject}`;

  return (
    <section className="section-shell" id="contact">
      <p className="badge">צור קשר</p>
      <div className="space-y-4">
        <p className="text-2xl font-display">נשמח לשמוע מכם</p>
        <p className="text-stone leading-relaxed">
          מוזמנות ומוזמנים לשתף ציטוטים, להציע תיקונים לקוד האתי, או להוסיף
          חתימות חדשות. השאירו לנו הודעה ונחזור אליכם במהירות האפשרית.
        </p>
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-stone">כתובת דוא״ל רשמית</p>
            <p className="text-lg font-semibold">{CONTACT.email}</p>
          </div>
          <a
            href={mailto}
            className="inline-flex items-center justify-center rounded-full bg-clay px-6 py-3 text-white shadow-card transition hover:bg-clay/90"
          >
            כתבו לנו
          </a>
        </div>
      </div>
    </section>
  );
}

