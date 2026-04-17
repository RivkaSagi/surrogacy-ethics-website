"use client";

import { useGoogleDoc } from "@/hooks/use-google-doc";
import { useEffect, useState, useRef, useCallback } from "react";
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      // In RTL, scrollLeft is negative when scrolled
      setCanScrollLeft(Math.abs(scrollLeft) < scrollWidth - clientWidth - 10);
      setCanScrollRight(Math.abs(scrollLeft) > 10);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -432, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 432, behavior: "smooth" });
    }
  };

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

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, [updates, checkScroll]);

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

  const showArrow = updates.length > 3;
  const shouldCenter = updates.length < 3;
  const isSingleCard = updates.length === 1;

  return (
    <section className="py-8 md:py-10 px-5 md:px-20" dir="rtl">
      <div className="relative">
        {/* Scrollable container - max width for 3 cards */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-4 md:gap-8 items-stretch overflow-x-auto md:max-w-[1296px] mx-auto ${shouldCenter ? "md:justify-center" : ""}`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {updates.map((update, index) => (
            <div key={index} className={`shrink-0 h-auto ${isSingleCard ? "w-full md:w-[600px]" : "w-[85%] md:w-[400px]"}`}>
              <UpdateCard content={update.content} link={update.link} />
            </div>
          ))}
        </div>

        {/* Mobile scroll hint gradient */}
        {updates.length > 1 && (
          <div className="md:hidden pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
        )}

        {/* Left arrow for scrolling forward (appears when more than 3 cards) */}
        {showArrow && canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 transition-colors border border-border"
            aria-label="הצג עוד"
          >
            <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right arrow for scrolling back (appears when scrolled) */}
        {showArrow && canScrollRight && (
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 transition-colors border border-border"
            aria-label="חזרה"
          >
            <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
