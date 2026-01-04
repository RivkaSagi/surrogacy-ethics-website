import { fetchGoogleDocHtml } from "@/lib/google";
import { CONTENT_SOURCES } from "@/config/content";

export async function SummaryContent() {
  try {
    const html = await fetchGoogleDocHtml(CONTENT_SOURCES.summaryDocId);

    return (
      <article
        className="prose-content rtl-list"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (error) {
    return <p className="text-danger">שגיאה בטעינת תוכן</p>;
  }
}
