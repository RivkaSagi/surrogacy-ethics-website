"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * V3: Minimalist, centered design
 * Clean and simple with subtle accent colors
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

export default function ConferenceV3() {
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
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Top accent bar */}
      <div className="h-2 bg-gradient-to-l from-primary via-highlight to-primary" />

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* Logo/brand could go here */}

        {/* Title */}
        <div className="text-center mb-10">
          <p className="text-primary font-bold tracking-wide mb-2">04.06.2026 | המרכז האקדמי רופין</p>
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">
            כנס השקה
          </h1>
          <p className="text-lg text-text/70">
            הקוד האתי לפונדקאות בישראל | ספרה של פרופ׳ אלי תימן
          </p>
        </div>

        {/* Invitation image - LARGE, full width */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-2xl aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: '#f8f0ed' }}>
            <Image
              src="/conference-invitation.jpg"
              alt="הזמנה לכנס השקה"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-border" />
          <span className="text-text/50 text-sm">טופס הרשמה</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm text-text/70 mb-2">
                שם מלא <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-0 py-3 border-0 border-b-2 border-border bg-transparent focus:outline-none focus:border-primary transition"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-text/70 mb-2">
                כתובת מייל <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-0 py-3 border-0 border-b-2 border-border bg-transparent focus:outline-none focus:border-primary transition"
                dir="ltr"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="max-w-xs">
            <label htmlFor="phone" className="block text-sm text-text/70 mb-2">
              טלפון <span className="text-text/40">(לא חובה)</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-0 py-3 border-0 border-b-2 border-border bg-transparent focus:outline-none focus:border-primary transition"
              dir="ltr"
            />
          </div>

          {/* Connection - Simple list with checkboxes */}
          <div className="pt-4">
            <label className="block text-sm text-text/70 mb-4">
              הקשר שלי לתחום <span className="text-primary">*</span>
              <span className="text-text/40 mr-2">(ניתן לסמן מספר אפשרויות)</span>
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {connectionOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.connections.includes(option)
                      ? "border-primary bg-primary/5"
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                    formData.connections.includes(option)
                      ? "border-primary bg-primary"
                      : "border-border"
                  }`}>
                    {formData.connections.includes(option) && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.connections.includes(option)}
                    onChange={() => handleConnectionToggle(option)}
                    className="sr-only"
                  />
                  <span className="text-sm text-text">{option}</span>
                </label>
              ))}
            </div>

            {formData.connections.includes("אחר") && (
              <input
                type="text"
                value={formData.otherConnection}
                onChange={(e) => setFormData({ ...formData, otherConnection: e.target.value })}
                placeholder="נא לפרט..."
                className="w-full mt-4 px-0 py-3 border-0 border-b-2 border-border bg-transparent focus:outline-none focus:border-primary transition"
              />
            )}
          </div>

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full md:w-auto md:min-w-[200px] bg-text text-white font-bold py-4 px-8 rounded-lg hover:bg-text/90 focus:outline-none focus:ring-2 focus:ring-text/50 focus:ring-offset-2 transition"
            >
              שליחת הרשמה
            </button>
          </div>
        </form>

        {/* Footer note */}
        <p className="text-center text-sm text-text/40 mt-12">
          לשאלות ופרטים נוספים: surrogacy.ethics.il@gmail.com
        </p>
      </div>
    </div>
  );
}
