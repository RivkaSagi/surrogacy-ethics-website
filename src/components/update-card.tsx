"use client";

import { ArrowIcon } from "./arrow-icon";
import { useEffect, useState } from "react";

interface UpdateCardProps {
  content: string;
  link?: string;
}

interface ParsedContent {
  headline: string;
  body: string;
}

export function UpdateCard({ content, link }: UpdateCardProps) {
  const [parsed, setParsed] = useState<ParsedContent | null>(null);

  useEffect(() => {
    // Parse HTML content from Google Docs on client side only
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Extract text segments
    const textSegments: string[] = [];

    const extractText = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim() || "";
        if (text) {
          textSegments.push(text);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tagName = el.tagName.toLowerCase();

        // Skip links - they're handled at card level
        if (tagName === "a") {
          return;
        }

        // Process children
        el.childNodes.forEach(extractText);
      }
    };

    tempDiv.childNodes.forEach(extractText);

    // First segment is headline, rest is body
    const headline = textSegments[0] || "";
    const body = textSegments.slice(1).join(" ");

    setParsed({ headline, body });
  }, [content]);

  const hasLink = Boolean(link);

  // All cards have hover effect, cards with links also show arrow
  // Figma: w-[400px] min-w-[320px] items-end (RTL right aligned), border-b-12 on hover
  const CardContent = (
    <div className="relative bg-white rounded-lg p-6 h-full text-right transition-all duration-200 border-b-[12px] border-transparent group-hover:border-highlight flex flex-col items-end">
      <div className="w-full text-text leading-normal">
        {parsed ? (
          <>
            {parsed.headline && (
              <span className="font-bold text-lg block mb-2 text-text">{parsed.headline}</span>
            )}
            {parsed.body && (
              <span className="text-base text-text/80">{parsed.body}</span>
            )}
          </>
        ) : (
          <span className="text-base text-text/80">{content.replace(/<[^>]*>/g, " ").trim()}</span>
        )}
      </div>

      {hasLink && (
        <div className="absolute left-[14px] bottom-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowIcon className="text-text w-6 h-6" />
        </div>
      )}
    </div>
  );

  if (hasLink) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="w-full group cursor-pointer h-full">
        {CardContent}
      </a>
    );
  }

  return <div className="w-full h-full group">{CardContent}</div>;
}
