"use client";

import Image from "next/image";
import { useState } from "react";

const connectionOptions = [
  "הורים מיועדים / הורים לילדים שנולדו בעזרת פונדקאית",
  "פונדקאית",
  "מחקר",
  "איש/אשת מקצוע / נותנ/ת שירות",
  "משרד הבריאות",
  "סגל וצוות המרכז האקדמי רופין",
  "אחר",
];

export default function ConferencePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    connection: "",
    otherConnection: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validate required fields
    if (!formData.name || !formData.email || !formData.connection) {
      setError("נא למלא את כל השדות הנדרשים");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("נא להזין כתובת מייל תקינה");
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to Google Forms
      const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeNvf_LzTdxB3qwXhnOR5osh2cNWIeBxWy2_5I6721-Nt4bHA/formResponse";

      const formBody = new URLSearchParams();
      formBody.append("entry.1234567890", formData.name); // Replace with actual entry IDs
      formBody.append("entry.1234567891", formData.email);
      formBody.append("entry.1234567892", formData.phone);
      formBody.append("entry.1234567893", formData.connection === "אחר" ? formData.otherConnection : formData.connection);

      // Note: Google Forms CORS may block this. Consider using a server action or API route.
      await fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });

      setIsSubmitted(true);
    } catch {
      setError("אירעה שגיאה בשליחת הטופס. נא לנסות שוב.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-6xl mb-4">&#10003;</div>
            <h1 className="text-2xl font-bold text-text mb-4">תודה על ההרשמה!</h1>
            <p className="text-text/70 mb-6">
              קיבלנו את פרטיך ונשלח אישור למייל שהזנת.
            </p>
            <p className="text-text/70">
              נתראה בכנס ב-04.06.2026 במרכז האקדמי רופין!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Invitation Image */}
        <div className="mb-8 md:mb-12">
          <div className="relative w-full max-w-lg mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/conference-invitation.jpg"
              alt="הזמנה לכנס השקה - הקוד האתי לפונדקאות בישראל"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-text mb-2 text-center">
            הרשמה לכנס ההשקה
          </h1>
          <p className="text-text/70 text-center mb-6">
            הקוד האתי וספרה של פרופ׳ תימן
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-text mb-1">
                שם <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-text mb-1">
                כתובת מייל <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                dir="ltr"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-text mb-1">
                טלפון
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                dir="ltr"
              />
            </div>

            {/* Connection to field */}
            <div>
              <label className="block text-sm font-bold text-text mb-2">
                הקשר שלי לתחום <span className="text-primary">*</span>
              </label>
              <div className="space-y-2">
                {connectionOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="connection"
                      value={option}
                      checked={formData.connection === option}
                      onChange={(e) => setFormData({ ...formData, connection: e.target.value })}
                      className="w-4 h-4 text-primary border-border focus:ring-primary/50"
                    />
                    <span className="text-text group-hover:text-primary transition">
                      {option}
                    </span>
                  </label>
                ))}
              </div>

              {/* Other input */}
              {formData.connection === "אחר" && (
                <input
                  type="text"
                  value={formData.otherConnection}
                  onChange={(e) => setFormData({ ...formData, otherConnection: e.target.value })}
                  placeholder="נא לפרט..."
                  className="w-full mt-3 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                />
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "שולח..." : "הרשמה לכנס"}
            </button>
          </form>

          <p className="text-xs text-text/50 text-center mt-4">
            * שדות חובה
          </p>
        </div>

        {/* Event details */}
        <div className="mt-8 text-center text-text/70">
          <p className="mb-1">04.06.2026 | 09:30-13:00</p>
          <p>המרכז האקדמי רופין, אולם הכנסים</p>
        </div>
      </div>
    </div>
  );
}
