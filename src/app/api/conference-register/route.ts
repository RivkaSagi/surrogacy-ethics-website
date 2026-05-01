import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

interface RegistrationData {
  name: string;
  email: string;
  phone?: string;
  connections: string[];
  otherConnection?: string;
}

// Google Sheets setup
async function appendToSheet(data: RegistrationData) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  const timestamp = new Date().toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
  });

  // Prefix phone with apostrophe to preserve leading zeros in Sheets
  const phone = data.phone ? `'${data.phone}` : "";

  const row = [
    timestamp,
    data.name,
    data.email,
    phone,
    data.connections.join(", "),
    data.otherConnection || "",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}

// Email setup
async function sendConfirmationEmail(data: RegistrationData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Email to registrant
  await transporter.sendMail({
    from: `"פורום הקוד האתי לפונדקאות בישראל" <${process.env.GMAIL_USER}>`,
    to: data.email,
    subject: "אישור הרשמה לכנס ההשקה",
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">שלום ${data.name},</h2>
        <p>תודה על הרשמתך לכנס ההשקה של הקוד האתי לפונדקאות בישראל וספרן של פרופ׳ אלי תימן וז׳וז׳ה ברנד ״מעשה בשתי פונדקאיות״.</p>

        <div style="background: #f8f0ed; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="margin-top: 0;">פרטי הכנס:</h3>
          <p><strong>תאריך:</strong> 04.06.2026</p>
          <p><strong>שעות:</strong> 09:30-13:00</p>
          <p><strong>מיקום:</strong> המרכז האקדמי רופין, אולם הכנסים</p>
          <p><a href="https://waze.com/ul/hsv8zfrqek" style="color: #33A3F4;">ניווט ב-Waze</a></p>
          <p style="color: #666; font-size: 14px;">החניה בחניון הסטודנטים (בתשלום)</p>
        </div>

        <p>נשמח לראותך!</p>

        <table style="width: 100%; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <tr>
            <td style="width: 50%; text-align: center; padding: 10px;">
              <img src="https://www.surrogacyethicsil.org/Logo-new-w-text.png" alt="הקוד האתי לפונדקאות בישראל" style="height: 60px;" />
            </td>
            <td style="width: 50%; text-align: center; padding: 10px;">
              <img src="https://www.surrogacyethicsil.org/ruppin-logo.png" alt="המרכז האקדמי רופין" style="height: 60px;" />
            </td>
          </tr>
        </table>
      </div>
    `,
  });

  // Notification email to organizers
  await transporter.sendMail({
    from: `"פורום הקוד האתי - מערכת הרשמה" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `הרשמה חדשה לכנס: ${data.name}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h3>נרשם/ה חדש/ה לכנס:</h3>
        <ul>
          <li><strong>שם:</strong> ${data.name}</li>
          <li><strong>מייל:</strong> ${data.email}</li>
          <li><strong>טלפון:</strong> ${data.phone || "לא צוין"}</li>
          <li><strong>קשר לתחום:</strong> ${data.connections.map(c => c === "אחר" && data.otherConnection ? data.otherConnection : c).join(", ")}</li>
        </ul>
      </div>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const data: RegistrationData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.connections?.length) {
      return NextResponse.json(
        { error: "חסרים שדות חובה" },
        { status: 400 }
      );
    }

    // Save to Google Sheets
    await appendToSheet(data);

    // Send confirmation emails
    await sendConfirmationEmail(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "שגיאה בשמירת ההרשמה" },
      { status: 500 }
    );
  }
}
