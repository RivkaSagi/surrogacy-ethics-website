"use client";

import { useGoogleDoc } from "@/hooks/use-google-doc";
import { useEffect, useState } from "react";
import { UpdateCard } from "./update-card";

interface Update {
  content: string;
  link?: string;
}

interface Props {
  docId: string;
}

export function UpdatesSection({ docId }: Props) {
  const { html, error, isLoading } = useGoogleDoc(docId);
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    if (!html) return;

    // Parse HTML and split by paragraphs
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const paragraphs = Array.from(doc.querySelectorAll("p, li"));

    const updateItems: Update[] = paragraphs
      .map((p) => {
        let content = p.innerHTML.trim();
        let link: string | undefined;

        // Check for <a> tags first
        const linkEl = p.querySelector("a");
        if (linkEl) {
          link = linkEl.getAttribute("href") || undefined;
        }

        // Also check for links in <url> or <link> format in text
        // Google Docs encodes < > as &lt; &gt; so check both formats
        const angleBracketMatch = content.match(/<(https?:\/\/[^>]+)>/);
        if (angleBracketMatch) {
          link = angleBracketMatch[1];
          content = content.replace(/<https?:\/\/[^>]+>/g, "").trim();
        }

        // Check for HTML-encoded angle brackets: &lt;url&gt;
        const encodedMatch = content.match(/&lt;(https?:\/\/[^&]+)&gt;/);
        if (encodedMatch) {
          link = encodedMatch[1];
          content = content.replace(/&lt;https?:\/\/[^&]+&gt;/g, "").trim();
        }

        // Also check for plain URLs at the end of content (common pattern)
        const plainUrlMatch = content.match(/(https?:\/\/[^\s<>"]+)\s*$/);
        if (!link && plainUrlMatch) {
          link = plainUrlMatch[1];
          content = content.replace(/(https?:\/\/[^\s<>"]+)\s*$/, "").trim();
        }

        return { content, link };
      })
      .filter((item) => item.content.length > 0);

    setUpdates(updateItems);
  }, [html]);

  if (isLoading) {
    return (
      <section className="py-10 px-4 md:px-20">
        <p className="text-text/60 text-center">טוען עדכונים...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 px-4 md:px-20">
        <p className="text-red-600 text-center">{error}</p>
      </section>
    );
  }

  if (updates.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-10 px-5 md:px-20" dir="rtl">
      {/* Flex layout: cards are full width on mobile, 400px on desktop */}
      <div className="flex flex-wrap gap-4 md:gap-8 items-stretch">
        {updates.map((update, index) => (
          <div key={index} className="w-full md:w-[400px] shrink-0 h-auto">
            <UpdateCard content={update.content} link={update.link} />
          </div>
        ))}
      </div>
    </section>
  );
}
