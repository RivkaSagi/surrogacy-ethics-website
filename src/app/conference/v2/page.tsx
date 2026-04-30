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

export default function ConferenceV2() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    connections: [] as string[],
    otherConnection: "",
  });

  const handleConnectionToggle = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      connections: prev.connections.includes(option)
        ? prev.connections.filter((c) => c !== option)
        : [...prev.connections, option],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("טופס נשלח בהצלחה!");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" dir="rtl">
      {/* Right side in RTL (visually) - Large invitation image */}
      <div
        className="lg:w-1/2 min-h-[50vh] lg:min-h-screen lg:sticky lg:top-0 flex items-center justify-center p-6 lg:p-12"
        style={{ backgroundColor: '#f8f0ed' }}
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
            <h1 className="text-3xl font-bold text-white mb-3">
              הרשמה לכנס ההשקה
            </h1>
            <p className="text-highlight mb-4">
              הקוד האתי לפונדקאות וספרה של פרופ׳ אלי תימן
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-white/60 text-sm">
              <span>04.06.2026</span>
              <span>|</span>
              <span>09:30-13:00</span>
              <span>|</span>
              <span>המרכז האקדמי רופין</span>
            </div>
          </div>

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
                    className={`px-3 py-2 rounded-full text-sm transition-all ${
                      formData.connections.includes(option)
                        ? "bg-highlight text-dark font-bold"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
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
                />
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-highlight text-dark font-bold py-4 px-6 rounded-xl hover:bg-highlight/90 focus:outline-none focus:ring-2 focus:ring-highlight/50 focus:ring-offset-2 focus:ring-offset-dark transition-all text-lg mt-6"
            >
              הרשמה לכנס
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
