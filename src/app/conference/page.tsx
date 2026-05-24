"use client";

import Image from "next/image";
import { useState } from "react";
import { ConferenceSchedule } from "@/components/conference-schedule";

const connectionOptions = [
  "הורים מיועדים / הורים לילדים שנולדו בעזרת פונדקאית",
  "פונדקאית",
  "מחקר",
  "איש/אשת מקצוע / נותנ/ת שירות",
  "משרד הבריאות",
  "סגל וצוות המרכז האקדמי רופין",
  "אחר",
];

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ConferencePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    connections: [] as string[],
    otherConnection: "",
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConnectionToggle = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      connections: prev.connections.includes(option)
        ? prev.connections.filter((c) => c !== option)
        : [...prev.connections, option],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/conference-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "שגיאה בשליחת הטופס");
      }

      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "שגיאה בשליחת הטופס");
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#f8f0ed" }} dir="rtl">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-text mb-4">ההרשמה התקבלה!</h2>
            <p className="text-text/70 mb-6">
              תודה על הרשמתך לכנס. נשלח אלייך מייל אישור עם פרטי הכנס.
            </p>
            <div className="bg-background rounded-xl p-6 text-right">
              <h3 className="text-primary font-bold mb-3">פרטי הכנס:</h3>
              <p className="text-text/70">תאריך: 04.06.2026</p>
              <p className="text-text/70">שעות: 09:30-13:00</p>
              <p className="text-text/70">מיקום: המרכז האקדמי רופין, אולם הכנסים</p>
            </div>
          </div>

          <div className="mt-12 md:mt-16">
            <ConferenceSchedule />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f0ed" }} dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* Top row: schedule (left) + invitation image (right, sticky) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* Right side - Invitation image (RTL, sticky on desktop) — narrower, pushed down to emphasize the site link */}
          <div className="w-full lg:w-[36%] lg:sticky lg:top-8 lg:mr-auto lg:mt-10">
            <p className="text-center mb-6 lg:mb-8">
              <a
                href="https://www.surrogacyethicsil.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-bold text-lg md:text-xl lg:text-2xl"
              >
                אתר הקוד האתי לפונדקאות בישראל
              </a>
            </p>
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: "#f8f0ed" }}>
              <Image
                src="/conference-invitation.jpg"
                alt="הזמנה לכנס השקה"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Left side - Schedule — wider */}
          <div className="w-full lg:w-[64%]">
            <ConferenceSchedule />
          </div>
        </div>

        {/* Registration form - full width below */}
        <div id="register" className="mt-12 md:mt-16 scroll-mt-8">
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
                הרשמה לכנס ההשקה
              </h1>
              <div className="h-1 w-16 bg-highlight rounded-full mx-auto mt-3" />
              <p className="text-text/60 mt-4">
                הקוד האתי לפונדקאות וספרן של פרופ׳ אלי תימן וז׳וז׳ה ברנד ״מעשה בשתי פונדקאיות״
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-sm text-text/70">
                <span>04.06.2026</span>
                <span>|</span>
                <span>09:30-13:00</span>
                <span>|</span>
                <span>המרכז האקדמי רופין</span>
              </div>
            </div>

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 text-center">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-text mb-1">
                    שם מלא <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    required
                    disabled={submitStatus === "loading"}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-text mb-1">
                    כתובת מייל <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    dir="ltr"
                    required
                    disabled={submitStatus === "loading"}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-text mb-1">
                  טלפון <span className="text-text/40 font-normal">(לא חובה)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                  dir="ltr"
                  disabled={submitStatus === "loading"}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text mb-3">
                  הקשר שלי לתחום <span className="text-primary">*</span>
                  <span className="text-text/40 font-normal mr-2">(ניתן לבחור יותר מאחד)</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-background/30 rounded-lg p-4">
                  {connectionOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white transition ${submitStatus === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.connections.includes(option)}
                        onChange={() => handleConnectionToggle(option)}
                        className="w-5 h-5 rounded border-border text-primary focus:ring-primary/50"
                        disabled={submitStatus === "loading"}
                      />
                      <span className="text-text group-hover:text-primary transition text-sm md:text-base">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>

                {formData.connections.includes("אחר") && (
                  <input
                    type="text"
                    value={formData.otherConnection}
                    onChange={(e) => setFormData({ ...formData, otherConnection: e.target.value })}
                    placeholder="נא לפרט..."
                    className="w-full mt-3 px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    disabled={submitStatus === "loading"}
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={submitStatus === "loading" || formData.connections.length === 0 || (formData.connections.includes("אחר") && !formData.otherConnection.trim())}
                className="w-full bg-primary text-white font-bold py-4 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitStatus === "loading" ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    שולח...
                  </>
                ) : (
                  "הרשמה לכנס"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
