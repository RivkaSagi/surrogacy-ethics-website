import DOMPurify from "isomorphic-dompurify";
import Papa from "papaparse";

export type Signatory = {
  name: string;
  field?: string;
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

export function parseSignatories(csv: string): Signatory[] {
  const parsed = Papa.parse<string[]>(csv, {
    skipEmptyLines: true,
  });

  const [, ...rows] = parsed.data;

  return rows
    .map((row) => ({
      name: row?.[0]?.trim() ?? "",
      field: row?.[1]?.trim() ?? "",
    }))
    .filter((row) => row.name.length > 0);
}

