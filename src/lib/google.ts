import DOMPurify from "isomorphic-dompurify";
import Papa from "papaparse";

export type Signatory = {
  name: string;
  field?: string;
  column3?: string;
  column4?: string;
};

const DOC_EXPORT_URL = (docId: string) =>
  `https://docs.google.com/document/d/${docId}/export?format=html`;

const SHEET_EXPORT_URL = (sheetId: string, gid = "0") =>
  `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

export async function fetchGoogleDocHtml(docId: string): Promise<string> {
  const response = await fetch(DOC_EXPORT_URL(docId), { cache: "no-store" });

  if (!response.ok) {
    throw new Error("מסמך לא זמין כעת");
  }

  const html = await response.text();
  return DOMPurify.sanitize(html);
}

export async function fetchGoogleSheetCsv(
  sheetId: string,
  gid?: string,
): Promise<string> {
  const response = await fetch(SHEET_EXPORT_URL(sheetId, gid), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("גיליון לא זמין כעת");
  }

  return response.text();
}

export type SignatoriesData = {
  headers: string[];
  rows: Signatory[];
};

export function parseSignatories(csv: string): SignatoriesData {
  const parsed = Papa.parse<string[]>(csv, {
    skipEmptyLines: true,
  });

  const [headerRow, ...dataRows] = parsed.data;

  const headers = headerRow?.map((h) => h?.trim() ?? "") ?? [];

  const rows = dataRows
    .map((row) => ({
      name: row?.[0]?.trim() ?? "",
      field: row?.[1]?.trim() ?? "",
      column3: row?.[2]?.trim() ?? "",
      column4: row?.[3]?.trim() ?? "",
    }))
    .filter((row) => row.name.length > 0);

  return { headers, rows };
}

export type TeamMember = {
  name: string;
  description: string;
  imageId: string;
  imageUrl: string;
};

type DriveFile = {
  id: string;
  name: string;
  webContentLink?: string;
  thumbnailLink?: string;
};

type DriveApiResponse = {
  files: DriveFile[];
};

export async function fetchGoogleDriveFolder(
  folderId: string,
): Promise<TeamMember[]> {
  try {
    // Using Google Drive API v3 to list files in a public folder
    const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,webContentLink,thumbnailLink)&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""}`;

    const response = await fetch(apiUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("לא ניתן לגשת לתיקיית Google Drive");
    }

    const data = (await response.json()) as DriveApiResponse;
    const files = data.files || [];

    // Extract name from filename (remove extension) and create team members
    const members: TeamMember[] = files
      .filter((file: DriveFile) => {
        const ext = file.name.toLowerCase().split(".").pop();
        return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "");
      })
      .map((file: DriveFile) => {
        // Remove file extension from name
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        // Clean up the name (replace underscores, hyphens with spaces)
        const cleanName = nameWithoutExt.replace(/[_-]/g, " ").trim();

        return {
          name: cleanName,
          description: generateDescription(),
          imageId: file.id,
          imageUrl: `https://drive.google.com/uc?export=view&id=${file.id}`,
        };
      })
      .sort((a: TeamMember, b: TeamMember) => a.name.localeCompare(b.name, "he")); // Sort alphabetically

    return members;
  } catch (error) {
    console.error("Error fetching Google Drive folder:", error);
    return [];
  }
}

function generateDescription(): string {
  // This is a placeholder function. You can customize descriptions based on names
  // or fetch them from another source (like a Google Sheet)
  return `חבר/ה בצוות הפורום להובלת הקוד האתי לפונדקאות בישראל`;
}

