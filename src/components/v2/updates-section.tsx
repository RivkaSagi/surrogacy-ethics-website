"use client";

import { useGoogleDoc } from "@/hooks/use-google-doc";
import { useEffect, useState, useRef } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!html) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const paragraphs = Array.from(doc.querySelectorAll("p, li"));

    const updateItems: Update[] = paragraphs
      .map((p) => {
        let content = p.innerHTML.trim();
        let link: string | undefined;

        const linkEl = p.querySelector("a");
        if (linkEl) {
          link = linkEl.getAttribute("href") || undefined;
        }

        const angleBracketMatch = content.match(/<(https?:\/\/[^>]+)>/);
        if (angleBracketMatch) {
          link = angleBracketMatch[1];
          content = content.replace(/<https?:\/\/[^>]+>/g, "").trim();
        }

        const encodedMatch = content.match(/&lt;(https?:\/\/[^&]+)&gt;/);
        if (encodedMatch) {
          link = encodedMatch[1];
          content = content.replace(/&lt;https?:\/\/[^&]+&gt;/g, "").trim();
        }

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

  const shouldCenter = updates.length < 3;
  const isSingleCard = updates.length === 1;

  return (
    <section className="py-8 md:py-10 px-0 md:px-20" dir="rtl">
      <div className="relative">
        {/* Mobile: horizontal scroll with no margins, screen cuts items */}
        {/* Desktop: flex-wrap to new line if more than 3 items */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-4 md:gap-8 items-stretch overflow-x-auto md:overflow-visible md:flex-wrap md:max-w-[1296px] mx-auto ${shouldCenter ? "md:justify-center" : "md:justify-center"}`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {updates.map((update, index) => (
            <div key={index} className={`shrink-0 md:shrink h-auto first:mr-5 last:ml-5 md:first:mr-0 md:last:ml-0 ${isSingleCard ? "w-[calc(100%-40px)] md:w-[600px]" : "w-[85%] md:w-[400px]"}`}>
              <UpdateCard content={update.content} link={update.link} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
