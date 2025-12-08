# הגדרת צוות הפורום

דף צוות הפורום משתמש במערכת cache מקומית שמתעדכנת מתיקיית Google Drive.

## איך זה עובד?

1. תמונות חברי הצוות נשמרות בתיקיית Google Drive
2. סקריפט מיוחד מעדכן קובץ cache מקומי (`src/data/team-members.json`)
3. האתר מציג את המידע מה-cache (ללא תלות ב-API בזמן ריצה)
4. כשמעדכנים את התיקייה ב-Drive, פשוט מריצים את הסקריפט שוב

## שלבי ההגדרה:

### 1. יצירת Google API Key

1. גש ל-[Google Cloud Console](https://console.cloud.google.com/)
2. צור פרויקט חדש או בחר פרויקט קיים
3. עבור ל-**APIs & Services** > **Credentials**
4. לחץ על **Create Credentials** > **API Key**
5. העתק את ה-API Key שנוצר

### 2. הפעלת Google Drive API

1. באותו הפרויקט, עבור ל-**APIs & Services** > **Library**
2. חפש "Google Drive API"
3. לחץ על **Enable**

### 3. הגבלת ה-API Key (מומלץ)

1. חזור ל-**Credentials**
2. לחץ על ה-API Key שיצרת
3. תחת **API restrictions**, בחר "Restrict key"
4. סמן רק את "Google Drive API"
5. תחת **Website restrictions** (אופציונלי), הוסף את כתובת האתר שלך
6. שמור את השינויים

### 4. הגדרת המפתח בפרויקט

1. צור קובץ `.env.local` בתיקיית הפרויקט (לצד `package.json`)
2. הוסף את השורה הבאה עם ה-API Key שלך:

```
NEXT_PUBLIC_GOOGLE_API_KEY=YOUR_API_KEY_HERE
```

3. שמור את הקובץ

**חשוב:** הקובץ `.env.local` כבר מוגדר ב-`.gitignore` ולא יועלה ל-Git

### 5. ודא שהתיקייה ב-Google Drive היא ציבורית

1. פתח את [תיקיית צוות הפורום](https://drive.google.com/drive/folders/1M5uFc8ilWS_f8it0tKBNmj35hYZbPj_z)
2. לחץ ימני על התיקייה > **Share** > **Get link**
3. שנה את ההרשאות ל-**Anyone with the link can view**
4. שמור

### 6. הוספת תמונות לתיקייה

- שם הקובץ (ללא סיומת) יהפוך לשם חבר הצוות
- לדוגמה: `דר רונית חסון.jpg` יוצג כ-"דר רונית חסון"
- חברי הצוות יוצגו בסדר אלפביתי
- תבניות נתמכות: jpg, jpeg, png, gif, webp

### 7. עדכון cache של חברי הצוות

לאחר הגדרת ה-API Key, הרץ את הפקודה לעדכון ה-cache:

```bash
npm install  # רק בפעם הראשונה
npm run update-team
```

הפקודה תושוך את התמונות והשמות מתיקיית Google Drive ותעדכן את הקובץ `src/data/team-members.json`.

### 8. הרצת האתר

```bash
npm run dev
```

עבור לכתובת: http://localhost:3000/team

## מתי להריץ את update-team?

הרץ את הפקודה `npm run update-team` כל פעם ש:
- מוסיפים תמונה חדשה לתיקיית Google Drive
- מוחקים תמונה
- משנים שם קובץ (כי השם משתמש כשם חבר הצוות)

## פתרון בעיות

### שגיאת "לא ניתן לגשת לתיקיית Google Drive"

- ודא שה-API Key נכון בקובץ `.env.local`
- ודא ש-Google Drive API מופעל בפרויקט
- ודא שהתיקייה מוגדרת כציבורית

### התמונות לא נטענות

- ודא שהקבצים בתיקייה הם קבצי תמונה (jpg, png, וכו')
- ודא שכל הקבצים בתיקייה מוגדרים לצפייה ציבורית
- הרץ `npm run update-team` שוב

### חברי צוות לא מוצגים

- הרץ `npm run update-team` לעדכון ה-cache
- בדוק שיש תמונות בתיקיית Google Drive
- ודא שה-API Key אינו מוגבל למדי

## התאמה אישית של תיאורים

כרגע כל חברי הצוות מקבלים תיאור ברירת מחדל. כדי להתאים תיאורים אישיים:

1. צור Google Sheet עם עמודות: שם, תיאור
2. עדכן את הפונקציה `generateDescription()` ב-`src/lib/google.ts` לקרוא מה-Sheet
3. או עדכן ידנית את הקומפוננטה `src/components/team-members.tsx`
