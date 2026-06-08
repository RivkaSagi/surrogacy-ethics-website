"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const REGIONS = ["כל הארץ", "ירושלים", "מרכז", "דרום", "צפון", "אחר"] as const;
type Region = (typeof REGIONS)[number];

function todayIsoDate(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatHebrewDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export function SignForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [publicContact, setPublicContact] = useState("");
  const [regions, setRegions] = useState<Region[]>([]);
  const [regionOther, setRegionOther] = useState("");
  const [date, setDate] = useState(todayIsoDate());
  const [signature, setSignature] = useState("");
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  const printRef = useRef<HTMLDivElement>(null);

  const canSubmit =
    name.trim() &&
    role.trim() &&
    email.trim() &&
    phone.trim() &&
    regions.length > 0 &&
    (!regions.includes("אחר") || regionOther.trim()) &&
    date &&
    signature.trim() &&
    consent &&
    status !== "loading";

  function toggleRegion(r: Region) {
    setRegions((prev) => {
      // "כל הארץ" is mutually exclusive with the rest
      if (r === "כל הארץ") {
        return prev.includes("כל הארץ") ? [] : ["כל הארץ"];
      }
      // Selecting any specific region clears "כל הארץ"
      const without = prev.filter((x) => x !== "כל הארץ");
      return without.includes(r) ? without.filter((x) => x !== r) : [...without, r];
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    setError("");

    try {
      // 1. Render the printable area to PNG (data URL)
      if (!printRef.current) throw new Error("שגיאה פנימית");
      const screenshot = await toPng(printRef.current, {
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });

      // 2. POST to /api/sign
      const payload = {
        name: name.trim(),
        role: role.trim(),
        email: email.trim(),
        phone: phone.trim(),
        publicContact: publicContact.trim(),
        region: regions
          .map((r) => (r === "אחר" ? `אחר - ${regionOther.trim()}` : r))
          .join(", "),
        date: formatHebrewDate(date),
        signature: signature.trim(),
        screenshot,
      };
      const res = await fetch("/api/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "שגיאה בשליחת הטופס");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "שגיאה לא צפויה");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-text mb-3">תודה רבה {name}!</h2>
        <p className="text-text/70 leading-relaxed">
          הצטרפותך לרשימת החותמים על הקוד האתי התקבלה. שלחנו עותק של הטופס החתום לכתובת המייל שלך,
          ובקרוב נוסיף את שמך לרשימה הציבורית באתר.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-12 shadow-xl max-w-3xl mx-auto" dir="rtl">
      {/* Printable / screenshotted declaration */}
      <div ref={printRef} className="bg-white p-4 md:p-8" dir="rtl">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
          הצהרת הצטרפות וחתימה על כללי האתיקה לפונדקאות בישראל
        </h2>

        <div className="space-y-4 text-text/85 leading-relaxed text-sm md:text-base">
          <p>
            אני החתום/ה מטה מבקש/ת להצטרף לרשימת החותמים על כללי האתיקה לפונדקאות בישראל,
            מתוך הכרה בחשיבותם של סטנדרטים אתיים, מקצועיים ואנושיים בתחום הפונדקאות בישראל.
          </p>
          <p>
            ידוע לי כי כללי האתיקה גובשו כיוזמה אזרחית־מקצועית, במטרה לקדם אחריות, שקיפות, כבוד,
            שמירה על פרטיות ואוטונומיה, מניעת הסחרה והגנה על כלל השותפים להליכי פונדקאות.
          </p>
          <p>
            הצטרפותי וחתימתי על כללי האתיקה נעשית מרצוני באופן וולונטרי, ולאחר שניתנה לי האפשרות
            לעיין בכללים ולהכיר את תוכנם.
          </p>
          <p>
            אני מתחייב/ת לפעול, במסגרת עיסוקי המקצועי בשדה הפונדקאות, בהתאם לעקרונות ולכללים
            המפורטים בכללי האתיקה, ולשמור על רוחם ותכליתם.
          </p>
          <p>
            ידוע לי ואני מסכים/ה לכך כי שמי, תוארי ופרטי המקצועיים יפורסמו לציבור, לרבות באתר
            האינטרנט של הפורום וברשתות החברתיות, כחלק מרשימת החותמים על כללי האתיקה.
          </p>
          <p>
            ידוע לי כי פרסום שמי ברשימת החותמים מותנה בהמשך עמידתי בכללי האתיקה. ככל שפורום
            הקוד האתי לפונדקאות בישראל יחליט, בעקבות הפרה מהותית של כללי האתיקה ובהתאם
            למנגנון הבדיקה ובשים לב לנסיבות העניין, להסיר את שמי מרשימת החותמים, אני מאשר/ת כי
            עצם הסרת שמי מהרשימה או אי־הכללתי בה לא תהווה כשלעצמה פרסום לשון הרע, פגיעה בשם
            טוב או קביעה מקצועית, משמעתית או משפטית בענייני.
          </p>
          <p>
            אני מאשר/ת כי הצהרה זו מהווה חלק בלתי נפרד מהצטרפותי לרשימת החותמים על כללי
            האתיקה ומהתחייבותי לפעול בהתאם להם.
          </p>
        </div>

        {/* The signed values rendered inline (visible in the screenshot) */}
        <div className="mt-10 space-y-5">
          <p className="font-bold">ולראיה באתי על החתום:</p>
          <p className="text-sm text-text/65 leading-relaxed">
            השדות שלהלן מתעדכנים אוטומטית בהתאם לפרטים שתמלאו בטופס בהמשך העמוד.
          </p>
          <SignedField label="שם בעל המקצוע / חברה / מרפאה" value={name} />
          <SignedField label="עיסוק / תפקיד החותם" value={role} />
          <SignedField label="תאריך" value={formatHebrewDate(date)} />
          <SignedField
            label="חתימה"
            value={signature}
            valueClassName="font-signature text-2xl italic"
          />
        </div>
      </div>

      {/* The actual editable inputs */}
      <div className="mt-10 pt-8 border-t border-border space-y-5">
        <h3 className="text-lg md:text-xl font-bold text-text">פרטי החותם/ת</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FieldInput
            id="name"
            label="שם בעל המקצוע / חברה / מרפאה"
            value={name}
            onChange={setName}
            required
          />
          <FieldInput
            id="role"
            label="עיסוק / תפקיד החותם"
            value={role}
            onChange={setRole}
            placeholder="למשל: מלווה, סוכנות, עורך/ת דין, פסיכולוג/ית, רופא/ה"
            required
          />
          <FieldInput
            id="email"
            label="כתובת מייל"
            hint="לשימוש פנימי בלבד"
            type="email"
            value={email}
            onChange={setEmail}
            required
            dir="ltr"
          />
          <FieldInput
            id="phone"
            label="טלפון"
            hint="לשימוש פנימי בלבד"
            type="tel"
            value={phone}
            onChange={setPhone}
            required
            dir="ltr"
          />
        </div>

        <div>
          <label htmlFor="publicContact" className="block text-sm font-bold text-text mb-1">
            פרטי קשר לאתר <span className="text-text/40 font-normal">(יוצגו ברשימה הציבורית)</span>
          </label>
          <input
            id="publicContact"
            type="text"
            value={publicContact}
            onChange={(e) => setPublicContact(e.target.value)}
            placeholder="טלפון / אתר / מייל ליצירת קשר ציבורי"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <fieldset>
              <legend className="block text-sm font-bold text-text mb-1">
                אזור בארץ <span className="text-primary">*</span>
                <span className="text-text/40 font-normal mr-2">(ניתן לבחור יותר מאחד)</span>
              </legend>
              <div className="grid grid-cols-2 gap-2 bg-background/30 rounded-lg p-3">
                {REGIONS.map((r) => (
                  <label
                    key={r}
                    className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-white transition"
                  >
                    <input
                      type="checkbox"
                      checked={regions.includes(r)}
                      onChange={() => toggleRegion(r)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50"
                    />
                    <span className="text-sm text-text">{r}</span>
                  </label>
                ))}
              </div>
              {regions.includes("אחר") && (
                <input
                  type="text"
                  value={regionOther}
                  onChange={(e) => setRegionOther(e.target.value)}
                  placeholder="פרט/י אזור"
                  className="w-full mt-2 px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                  required
                />
              )}
            </fieldset>
          </div>
          <FieldInput
            id="date"
            label="תאריך"
            type="date"
            value={date}
            onChange={setDate}
            required
          />
        </div>

        <div>
          <label htmlFor="signature" className="block text-sm font-bold text-text mb-1">
            חתימה <span className="text-primary">*</span>
            <span className="text-text/40 font-normal mr-2">(הקלידו את שמכם המלא כחתימה)</span>
          </label>
          <input
            id="signature"
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition text-lg"
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary/50 shrink-0"
            required
          />
          <span className="text-sm text-text/80 leading-relaxed">
            קראתי את ההצהרה לעיל ואת{" "}
            <a
              href="/TheEthicsCode.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:opacity-80"
            >
              הקוד האתי המלא
            </a>
            , אני מסכים/ה לכל סעיפיה, וחתימתי על הטופס מהווה אישור להצטרפותי
            לרשימת החותמים על הקוד האתי לפונדקאות בישראל.
          </span>
        </label>

        {status === "error" && (
          <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full bg-primary text-white font-bold py-4 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              שולח...
            </>
          ) : (
            "חתימה ושליחה"
          )}
        </button>
      </div>
    </form>
  );
}

function SignedField({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-baseline gap-3 border-b border-text/30 pb-1">
      <span className="text-text/70 text-sm md:text-base shrink-0">{label}:</span>
      <span className={`flex-1 text-text font-medium ${valueClassName || ""}`}>
        {value || " "}
      </span>
    </div>
  );
}

function FieldInput({
  id,
  label,
  hint,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  dir,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-text mb-1">
        {label} {required && <span className="text-primary">*</span>}
        {hint && (
          <span className="text-text/40 font-normal mr-2">({hint})</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        dir={dir}
        className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
      />
    </div>
  );
}
