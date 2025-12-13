# קוד אתי לפונדקאות - אתר רשמי

אתר מקצועי ופורמלי מבוסס [Next.js 15](https://nextjs.org/) + Tailwind CSS שמושך בזמן אמת את התוכן מ-Google Docs, Google Sheets ו-Google Drive:

- **מי אנחנו** – מסמך Google Docs + קישור לדף צוות
- **תמצית הקוד האתי** – מסמך Google Docs קצר
- **הקוד האתי** – מסמך Google Docs מלא
- **רשימת החותמות והחותמים** – Google Sheet (4 עמודות עם סינון מתקדם)
- **עדכונים** – מסמך Google Docs לתיבת הגלילה
- **צוות הפורום** – תמונות ותיאורים מ-Google Drive (נטען בזמן build)

הנתונים מנוהלים בקובץ ההגדרות `src/config/content.ts`.

## התקנה והרצה

```bash
npm install
npm run dev           # http://localhost:3000
npm run lint          # בדיקות ESLint
npm run build         # הפקת גרסת פרודקשן
```

### הגדרת Google API Key

צוות הפורום נטען מ-Google Drive בזמן ה-build. צור קובץ `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
```

**חשוב:** הוסף את המשתנה גם לסביבת הפרודקשן (Vercel/Netlify) כדי שהנתונים יטענו בזמן הבנייה.

למידע מפורט, ראה [SETUP.md](SETUP.md)

## פרסום המסמכים לציבור

כדי שהמשתמשים יראו את התוכן ללא התחברות חובה לפרסם כל מסמך/גיליון:

1. בתוך Google Docs/Sheets בחרו `File → Share → Publish to web`.
2. ודאו שהקישור ציבורי (`Anyone with the link`).
3. העתיקו את מזהה המסמך (החלק שבין `/d/` ל-`/edit`) והכניסו ל-`src/config/content.ts`.

> ללא פרסום, Google תחסום את בקשת ה-`fetch` מהדפדפן עקב חוסר הרשאות.

### מבנה הגיליון

הטבלה תומכת ב-4 עמודות עם כותרות דינמיות:

| עמודה | תוכן            |
| ----- | ---------------- |
| A     | שם החותם/ת      |
| B     | תחום מקצועי     |
| C     | עמודה 3         |
| D     | עמודה 4 (ניתן לסינון עם ערכים מופרדים בפסיק)|

**סינון מתקדם:** עמודה 4 תומכת בערכים מרובים מופרדים בפסיק (למשל: "תל אביב, ירושלים"). כל ערך הופך לאפשרות סינון נפרדת.

שורות ריקות יסוננו אוטומטית.

## דפים באתר

- `/` - דף הבית
- `/code` - הקוד האתי המלא
- `/signatories` - רשימת כל החותמים (עם סינון)
- `/team` - צוות הפורום

## צוות הפורום - טעינה בזמן Build

צוות הפורום נטען ישירות מ-Google Drive בזמן הבנייה:

1. **תמונות ותיאורים** נשמרים בתיקיית Google Drive
2. **בזמן build** - הנתונים נמשכים מ-Google Drive
3. **תיאורים מותאמים** - Google Docs עם שם זהה לשם התמונה
4. **מיון אוטומטי** - ממוין אלפביתית בעברית

### מבנה תיקיית Google Drive

```
תיקיית צוות הפורום/
├── אדם רינגל.jpg        # תמונת חבר צוות
├── אדם רינגל            # Google Doc עם תיאור
├── רבקה שגיא.jpg
└── רבקה שגיא
```

התיקייה חייבת להיות ציבורית (`Anyone with the link can view`)

## התאמות עיצוב ותוכן

- **עיצוב פורמלי** – ללא תמונת hero, layout מרכזי ומקצועי
- **שפה וכיוון** – `layout.tsx` מגדיר `lang="he"` ו-`dir="rtl"` מלא
- **פונט** – Google Fonts `Assistant` ו-`Secular One`
- **תיבת עדכונים** – נטענת מדוק ייעודי ונגללת לגובה 320px
- **צור קשר** – כפתור `mailto:` (החליפו ב-`src/config/content.ts`)
- **תמונות מ-Google Drive** – נטענות דרך Next.js Image Optimization

## פריסה

לפריסה ב-[Vercel](https://vercel.com/), [Netlify](https://netlify.com) או ספק דומה:

```bash
npm run build
npm start   # הרצה של גרסת הפרודקשן
```

### הגדרת משתני סביבה בפרודקשן

**Vercel:**
1. Project Settings → Environment Variables
2. הוסיפו: `NEXT_PUBLIC_GOOGLE_API_KEY`
3. סמנו: Production, Preview, Development
4. Redeploy

**Netlify:**
1. Site settings → Environment variables
2. הוסיפו: `NEXT_PUBLIC_GOOGLE_API_KEY`
3. Redeploy

### דרישות

- כל המסמכים ב-Google Docs/Sheets חייבים להיות ציבוריים (`Anyone with the link`)
- תיקיית Google Drive לצוות חייבת להיות ציבורית
- `NEXT_PUBLIC_GOOGLE_API_KEY` מוגדר בסביבת הפרודקשן

## תיעוד נוסף

- [SETUP.md](SETUP.md) - הוראות הגדרה מפורטות
