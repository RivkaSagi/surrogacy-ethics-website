"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * V2: Split screen - invitation on left (in RTL = visually right), form on dark right
 */

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

export default function ConferenceV2() {
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

  // Success screen
  if (submitStatus === "success") {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row" dir="rtl">
        <div
          className="lg:w-1/2 min-h-[50vh] lg:min-h-screen lg:sticky lg:top-0 flex items-center justify-center p-6 lg:p-12"
          style={{ backgroundColor: "#f8f0ed" }}
        >
          <div className="relative w-full max-w-xl aspect-[3/4]">
            <Image
              src="/conference-invitation.jpg"
              alt="הזמנה לכנס השקה"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="lg:w-1/2 bg-dark min-h-screen flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-highlight/20 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-highlight"
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
            <h2 className="text-3xl font-bold text-white mb-4">ההרשמה התקבלה!</h2>
            <p className="text-white/80 mb-6">
              תודה על הרשמתך לכנס. נשלח אלייך מייל אישור עם פרטי הכנס.
            </p>
            <div className="bg-white/10 rounded-xl p-6 text-right">
              <h3 className="text-highlight font-bold mb-3">פרטי הכנס:</h3>
              <p className="text-white/70">תאריך: 04.06.2026</p>
              <p className="text-white/70">שעות: 09:30-13:00</p>
              <p className="text-white/70">מיקום: המרכז האקדמי רופין, אולם הכנסים</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" dir="rtl">
      {/* Right side in RTL (visually) - Large invitation image */}
      <div
        className="lg:w-1/2 min-h-[50vh] lg:min-h-screen lg:sticky lg:top-0 flex items-center justify-center p-6 lg:p-12"
        style={{ backgroundColor: "#f8f0ed" }}
      >
        <div className="relative w-full max-w-xl aspect-[3/4]">
          <Image
            src="/conference-invitation.jpg"
            alt="הזמנה לכנס השקה"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Left side in RTL (visually) - Form on dark background */}
      <div className="lg:w-1/2 bg-dark min-h-screen flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-3">הרשמה לכנס ההשקה</h1>
            <p className="text-highlight mb-4">
              הקוד האתי לפונדקאות וספרה של פרופ׳ אלי תימן ״מעשה בשתי פונדקאיות״
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-white/60 text-sm">
              <span>04.06.2026</span>
              <span>|</span>
              <span>09:30-13:00</span>
              <span>|</span>
              <span>המרכז האקדמי רופין</span>
            </div>
            <p className="text-white/50 text-sm mt-4">
              לוח הזמנים המפורט יפורסם בדף זה בקרוב
            </p>
          </div>

          {/* Error message */}
          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-white/90 mb-1">
                שם מלא <span className="text-highlight">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-highlight transition"
                required
                disabled={submitStatus === "loading"}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-white/90 mb-1">
                כתובת מייל <span className="text-highlight">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-highlight transition"
                dir="ltr"
                required
                disabled={submitStatus === "loading"}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-white/90 mb-1">
                טלפון <span className="text-white/40 font-normal">(לא חובה)</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-highlight transition"
                dir="ltr"
                disabled={submitStatus === "loading"}
              />
            </div>

            {/* Connection - Chips */}
            <div>
              <label className="block text-sm font-bold text-white/90 mb-3">
                הקשר שלי לתחום <span className="text-highlight">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {connectionOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleConnectionToggle(option)}
                    disabled={submitStatus === "loading"}
                    className={`px-3 py-2 rounded-full text-sm transition-all ${
                      formData.connections.includes(option)
                        ? "bg-highlight text-dark font-bold"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    } ${submitStatus === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {formData.connections.includes("אחר") && (
                <input
                  type="text"
                  value={formData.otherConnection}
                  onChange={(e) => setFormData({ ...formData, otherConnection: e.target.value })}
                  placeholder="נא לפרט..."
                  className="w-full mt-3 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-highlight transition"
                  disabled={submitStatus === "loading"}
                />
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitStatus === "loading" || formData.connections.length === 0}
              className="w-full bg-highlight text-dark font-bold py-4 px-6 rounded-xl hover:bg-highlight/90 focus:outline-none focus:ring-2 focus:ring-highlight/50 focus:ring-offset-2 focus:ring-offset-dark transition-all text-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
  );
}
