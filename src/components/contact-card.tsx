"use client";

import { CONTACT } from "@/config/content";

export function ContactCard() {
  const mailto = `mailto:${CONTACT.email}?subject=${CONTACT.subject}`;

  return (
    <section className="section-shell scroll-mt-20" id="contact">
      <div className="max-w-3xl">
        <p className="badge">צרו קשר</p>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">נשמח לשמוע מכם</h2>
          <p className="text-stone leading-relaxed">
            לחתימה על הקוד, הערות או יצירת קשר מוזמנים ומוזמנות לפנות
          </p>
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white/70 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-stone">כתובת דוא״ל </p>
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
      </div>
    </section>
  );
}

