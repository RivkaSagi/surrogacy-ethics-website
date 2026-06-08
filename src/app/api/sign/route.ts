import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import sharp from "sharp";

interface SignatureSlot {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SignPayload {
  name: string;
  role: string;
  email: string;
  phone: string;
  publicContact?: string;
  region: string;
  date: string;
  signature: string;
  screenshot: string; // data URL: "data:image/png;base64,..."
  drawnSignature?: string | null; // optional standalone signature PNG data URL
  signatureSlot?: SignatureSlot | null; // where to overlay the signature
}

export async function POST(request: NextRequest) {
  try {
    const data: SignPayload = await request.json();

    if (
      !data.name?.trim() ||
      !data.role?.trim() ||
      !data.email?.trim() ||
      !data.phone?.trim() ||
      !data.region?.trim() ||
      !data.date?.trim() ||
      !data.signature?.trim() ||
      !data.screenshot?.startsWith("data:image/")
    ) {
      return NextResponse.json({ error: "חסרים שדות חובה" }, { status: 400 });
    }

    const base64 = data.screenshot.replace(/^data:image\/png;base64,/, "");
    const screenshotBuffer = Buffer.from(base64, "base64");

    // Optional standalone drawn-signature PNG. When present, composite it
    // into the screenshot server-side so the final attachment contains
    // both the filled form and the signature as one page (this avoids the
    // iOS Safari html-to-image race that can blank inline imgs).
    let drawnSignatureBuffer: Buffer | null = null;
    if (
      data.drawnSignature &&
      data.drawnSignature.startsWith("data:image/")
    ) {
      const sigBase64 = data.drawnSignature.replace(
        /^data:image\/png;base64,/,
        ""
      );
      drawnSignatureBuffer = Buffer.from(sigBase64, "base64");
    }

    // Compose final declaration PNG with signature baked in.
    let finalBuffer: Buffer = screenshotBuffer;
    if (drawnSignatureBuffer && data.signatureSlot) {
      const slot = data.signatureSlot;
      try {
        // Resize the signature to fit the slot while preserving aspect ratio.
        const sigResized = sharp(drawnSignatureBuffer).resize({
          width: slot.width,
          height: slot.height,
          fit: "inside",
          withoutEnlargement: false,
        });
        const meta = await sigResized.metadata();
        const sigWidth = meta.width ?? slot.width;
        const sigHeight = meta.height ?? slot.height;
        // Place the signature toward the label (right side in RTL) and toward
        // the bottom of the slot (sitting on the underline).
        const leftoverX = Math.max(0, slot.width - sigWidth);
        const leftoverY = Math.max(0, slot.height - sigHeight);
        // leftoverX puts the signature at the slot's right edge (closest to
        // the "חתימה:" label in RTL); add an extra nudge further toward it.
        const left = slot.x + leftoverX + Math.round(slot.width * 0.35);
        const top = slot.y + Math.round((leftoverY * 4) / 5);
        const sigBuffer = await sigResized.png().toBuffer();
        finalBuffer = (await sharp(screenshotBuffer)
          .composite([
            {
              input: sigBuffer,
              top,
              left,
            },
          ])
          .png()
          .toBuffer()) as Buffer;
      } catch (e) {
        // Fall back to plain screenshot if the composite fails for any reason
        console.error("Signature composite failed, sending plain screenshot:", e);
      }
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const summaryHtml = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; line-height: 1.6;">
        <h2 style="color: #1a1a1a;">חתימה חדשה על הקוד האתי</h2>
        <table style="width: 100%; border-collapse: collapse; background: #f8f0ed; border-radius: 10px; padding: 12px;">
          <tr><td style="padding: 8px 12px;"><strong>שם:</strong></td><td style="padding: 8px 12px;">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding: 8px 12px;"><strong>עיסוק / תפקיד:</strong></td><td style="padding: 8px 12px;">${escapeHtml(data.role)}</td></tr>
          <tr><td style="padding: 8px 12px;"><strong>מייל:</strong></td><td style="padding: 8px 12px;" dir="ltr">${escapeHtml(data.email)}</td></tr>
          <tr><td style="padding: 8px 12px;"><strong>טלפון:</strong></td><td style="padding: 8px 12px;" dir="ltr">${escapeHtml(data.phone)}</td></tr>
          <tr><td style="padding: 8px 12px;"><strong>פרטי קשר לאתר:</strong></td><td style="padding: 8px 12px;">${escapeHtml(data.publicContact || "—")}</td></tr>
          <tr><td style="padding: 8px 12px;"><strong>אזור:</strong></td><td style="padding: 8px 12px;">${escapeHtml(data.region)}</td></tr>
          <tr><td style="padding: 8px 12px;"><strong>תאריך חתימה:</strong></td><td style="padding: 8px 12px;">${escapeHtml(data.date)}</td></tr>
          <tr><td style="padding: 8px 12px;"><strong>חתימה (שם מודפס):</strong></td><td style="padding: 8px 12px; font-style: italic;">${escapeHtml(data.signature)}</td></tr>
        </table>
        <p style="margin-top: 20px;">מצורף צילום מסך של הטופס החתום.</p>

        <table style="width: 100%; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <tr>
            <td style="width: 50%; text-align: center; padding: 10px;">
              <img src="https://www.surrogacyethicsil.org/Logo-new-w-text.png" alt="הקוד האתי לפונדקאות בישראל" style="height: 60px;" />
            </td>
          </tr>
        </table>
      </div>
    `;

    const signerCopyHtml = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; line-height: 1.6;">
        <h2 style="color: #1a1a1a;">שלום ${escapeHtml(data.name)},</h2>
        <p>תודה על הצטרפותך לרשימת החותמים על הקוד האתי לפונדקאות בישראל.</p>
        <p>בהמשך מצורף עותק של הטופס שחתמת. בקרוב שמך יופיע ברשימה הציבורית של החותמים באתר.</p>
        <p>אם יש לך שאלות, ניתן להשיב למייל זה.</p>
        <p style="margin-top: 24px;">תודה,<br/>פורום הקוד האתי לפונדקאות בישראל</p>

        <table style="width: 100%; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <tr>
            <td style="width: 50%; text-align: center; padding: 10px;">
              <img src="https://www.surrogacyethicsil.org/Logo-new-w-text.png" alt="הקוד האתי לפונדקאות בישראל" style="height: 60px;" />
            </td>
          </tr>
        </table>
      </div>
    `;

    const attachments: Array<{
      filename: string;
      content: Buffer;
      contentType: string;
    }> = [
      {
        filename: "signed-declaration.png",
        content: finalBuffer,
        contentType: "image/png",
      },
    ];

    // 1. Notification to organizers
    await transporter.sendMail({
      from: `"פורום הקוד האתי - חתימות" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `חתימה חדשה על הקוד: ${data.name}`,
      html: summaryHtml,
      attachments,
    });

    // 2. Copy to signer
    await transporter.sendMail({
      from: `"פורום הקוד האתי לפונדקאות בישראל" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: "אישור הצטרפות לרשימת החותמים על הקוד האתי",
      html: signerCopyHtml,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sign submission error:", error);
    return NextResponse.json({ error: "שגיאה בשליחת הטופס" }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
