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

  // Extract the <style> content from Google Docs HTML to find the red color class
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  const fullStyles = styleMatch ? styleMatch[1] : '';

  // Find the class that has the red color (#980000) - these are the headers
  const redColorClassMatch = fullStyles.match(/\.(c\d+)\{[^}]*color:\s*#980000[^}]*\}/);
  const redColorClass = redColorClassMatch ? redColorClassMatch[1] : null;

  // Add summary-header class to elements with the red color class
  let htmlWithCustomClass = html;
  if (redColorClass) {
    const classRegex = new RegExp(`<span([^>]*)class="([^"]*${redColorClass}[^"]*)"([^>]*)>`, 'gi');
    htmlWithCustomClass = html.replace(classRegex, (match, before, classes, after) => {
      if (!classes.includes('summary-header')) {
        return `<span${before}class="${classes} summary-header"${after}>`;
      }
      return match;
    });
  }

  // Filter styles to keep ONLY font-weight (bold) and font-style (italic)
  // Remove all other styles that might interfere with site design
  const filteredStyles = fullStyles
    .split('}')
    .map(rule => {
      const [selector, properties] = rule.split('{');
      if (!properties) return '';

      // Extract only font-weight and font-style properties
      const relevantProps = properties
        .split(';')
        .filter(prop => {
          const trimmed = prop.trim().toLowerCase();
          return trimmed.startsWith('font-weight') ||
                 trimmed.startsWith('font-style');
        })
        .join(';');

      // Only return the rule if it has relevant properties
      return relevantProps ? `${selector}{${relevantProps}}` : '';
    })
    .filter(rule => rule.trim())
    .join('');

  // Configure DOMPurify with permissive settings
  const sanitized = DOMPurify.sanitize(htmlWithCustomClass, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'span', 'div', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3',
      'h4', 'h5', 'h6', 'blockquote', 'pre', 'code', 'table',
      'tr', 'td', 'th', 'tbody', 'thead'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id'],
    KEEP_CONTENT: true,
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });

  // Prepend only the filtered styles (bold/italic only)
  if (filteredStyles) {
    return `<style type="text/css">${filteredStyles}</style>${sanitized}`;
  }

  return sanitized;
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
  mimeType?: string;
  webContentLink?: string;
  thumbnailLink?: string;
};

type DriveApiResponse = {
  files: DriveFile[];
};

async function fetchDocContent(docId: string): Promise<string | null> {
  try {
    const docUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;
    const response = await fetch(docUrl, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    if (response.ok) {
      const text = await response.text();
      return text.trim();
    }
  } catch {
    console.warn(`Could not fetch description for doc ${docId}`);
  }
  return null;
}

export async function fetchGoogleDriveFolder(
  folderId: string,
): Promise<TeamMember[]> {
  try {
    // Using Google Drive API v3 to list files in a public folder
    const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,mimeType,webContentLink,thumbnailLink)&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""}`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error("לא ניתן לגשת לתיקיית Google Drive");
    }

    const data = (await response.json()) as DriveApiResponse;
    const files = data.files || [];

    // Separate images and documents
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const images = files.filter((file: DriveFile) => {
      const ext = file.name.toLowerCase().split(".").pop();
      return imageExtensions.includes(ext || "");
    });

    const docs = files.filter(
      (file: DriveFile) =>
        file.mimeType === "application/vnd.google-apps.document",
    );

    // Create a map of document names to their content
    const docMap = new Map<string, string>();
    for (const doc of docs) {
      const cleanDocName = doc.name.replace(/[_-]/g, " ").trim();
      const content = await fetchDocContent(doc.id);
      if (content) {
        docMap.set(cleanDocName, content);
      }
    }

    // Process images and match with descriptions
    const members: TeamMember[] = images.map((file: DriveFile) => {
      // Remove file extension from name
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      // Clean up the name (replace underscores, hyphens with spaces)
      const cleanName = nameWithoutExt.replace(/[_-]/g, " ").trim();

      // Try to find matching description
      let description = docMap.get(cleanName);

      if (!description) {
        // Try partial match (in case doc name is slightly different)
        for (const [docName, docContent] of docMap.entries()) {
          if (docName.includes(cleanName) || cleanName.includes(docName)) {
            description = docContent;
            break;
          }
        }
      }

      // Fallback to default description
      if (!description) {
        description = `חבר/ה בצוות הפורום להובלת הקוד האתי לפונדקאות בישראל`;
      }

      return {
        name: cleanName,
        description: description,
        imageId: file.id,
        imageUrl: `https://drive.google.com/uc?export=view&id=${file.id}`,
      };
    });

    // Sort alphabetically in Hebrew
    members.sort((a: TeamMember, b: TeamMember) =>
      a.name.localeCompare(b.name, "he"),
    );

    return members;
  } catch (error) {
    console.error("Error fetching Google Drive folder:", error);
    return [];
  }
}

