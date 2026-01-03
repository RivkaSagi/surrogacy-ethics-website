"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { id: "about", label: "מי אנחנו", href: "/team" },
  { id: "signatories", label: "אנשי המקצוע החתומים", href: "/signatories" },
];

type SiteHeaderProps = {
  onHeaderClick?: () => void;
};

export function SiteHeader({ onHeaderClick }: SiteHeaderProps = {}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const getNavHref = (item: { id: string; label: string; href: string }) => {
    return item.href;
  };

  return (
    <header className="sticky top-0 z-20 bg-sand/80 backdrop-blur border-b border-border" onClick={onHeaderClick}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/Logo-new-w-text.png"
            alt="לוגו הקוד האתי"
            width={150}
            height={48}
            className="h-12 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={getNavHref(item)}
              className="text-ink/80 transition hover:text-clay"
            >
              {item.label}
            </a>
          ))}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/#contact"
            className="rounded-full bg-clay px-6 py-2 text-white text-sm shadow-card transition hover:bg-clay/90"
          >
            צרו קשר
          </a>
        </nav>

        <button
          aria-label="תפריט"
          className="md:hidden rounded-full border border-border p-2"
          onClick={toggle}
        >
          <span className="sr-only">תפריט</span>
          <div className="flex flex-col gap-1.5">
            <span className="h-0.5 w-6 bg-ink" />
            <span className="h-0.5 w-6 bg-ink" />
            <span className="h-0.5 w-6 bg-ink" />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={getNavHref(item)}
                className="border-b border-border/50 py-3 text-ink/80 last:border-none"
                onClick={close}
              >
                {item.label}
              </a>
            ))}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/#contact"
              className="py-3 font-semibold text-clay"
              onClick={close}
            >
              צרו קשר
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

