# קוד אתי לפונדקאות - אתר רשמי

אתר מקצועי ופורמלי מבוסס [Next.js 15](https://nextjs.org/) + Tailwind CSS שמושך בזמן אמת את התוכן מ-Google Docs, Google Sheets ו-Google Drive:

- **מי אנחנו** – מסמך Google Docs + קישור לדף צוות
- **תמצית הקוד האתי** – מסמך Google Docs קצר
- **הקוד האתי** – מסמך Google Docs מלא
- **רשימת החותמות והחותמים** – Google Sheet (4 עמודות עם סינון מתקדם)
- **עדכונים** – מסמך Google Docs לתיבת הגלילה
- **צוות הפורום** – תמונות ותיאורים מ-Google Drive (עם cache מקומי)

הנתונים מנוהלים בקובץ ההגדרות `src/config/content.ts`.

## התקנה והרצה

```bash
npm install
npm run dev           # http://localhost:3000
npm run lint          # בדיקות ESLint
npm run build         # הפקת גרסת פרודקשן
npm run update-team   # עדכון cache של צוות הפורום
```

### הגדרת Google API Key

לעדכון אוטומטי של צוות הפורום, צור קובץ `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
```

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

## צוות הפורום - מערכת Cache חכמה

האתר משתמש במערכת cache מקומית לניהול צוות הפורום:

1. **תמונות ותיאורים** נשמרים בתיקיית Google Drive
2. **סקריפט אוטומטי** מעדכן את ה-cache מקומית (`src/data/team-members.json`)
3. **האתר קורא מה-cache** - טעינה מהירה, ללא תלות ב-API בזמן ריצה
4. **עדכון אוטומטי** - GitHub Actions מעדכן כל שעה

### עדכון ידני של צוות הפורום

```bash
npm run update-team
```

הסקריפט:
- מושך תמונות מתיקיית Google Drive
- מתאים תיאורים מ-Google Docs (לפי שם הקובץ)
- ממיין אלפביתית בעברית
- שומר ב-`src/data/team-members.json`

למידע מפורט: [README-TEAM-CACHE.md](README-TEAM-CACHE.md)

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

### הגדרת GitHub Actions (עדכון אוטומטי)

1. הוסיפו את Google API Key ל-GitHub Secrets:
   - Settings → Secrets and variables → Actions
   - New repository secret: `GOOGLE_API_KEY`
2. הסקריפט `.github/workflows/update-team.yml` יעדכן את ה-cache **כל שעה**
3. השינויים יוסרו אוטומטית ל-Git

### דרישות

- כל המסמכים ב-Google Docs/Sheets חייבים להיות ציבוריים (`Anyone with the link`)
- תיקיית Google Drive לצוות חייבת להיות ציבורית
- API Key מוגדר ב-GitHub Secrets לאוטומציה

## תיעוד נוסף

- [SETUP.md](SETUP.md) - הוראות הגדרה מפורטות
- [README-TEAM-CACHE.md](README-TEAM-CACHE.md) - מערכת ה-cache של צוות הפורום
