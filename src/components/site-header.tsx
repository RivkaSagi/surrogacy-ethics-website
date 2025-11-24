"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { id: "about", label: "מי אנחנו" },
  { id: "summary", label: "תמצית הקוד האתי" },
  { id: "ethics", label: "הקוד האתי" },
  { id: "signatories", label: "רשימת החותמים" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const getNavHref = (id: string) => {
    if (id === "signatories") {
      return "/signatories";
    }
    return isHomePage ? `#${id}` : `/#${id}`;
  };

  return (
    <header className="sticky top-0 z-20 bg-sand/80 backdrop-blur border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo.jpeg"
            alt="לוגו הקוד האתי"
            width={56}
            height={56}
            className="h-12 w-12 rounded-full border border-border object-cover"
          />
          <div className="text-right leading-tight">
            <p className="text-xs uppercase tracking-[0.2em] text-stone">
              קוד אתי לפונדקאות
            </p>
            <p className="text-2xl font-display text-ink">work in progress</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={getNavHref(item.id)}
              className="text-ink/80 transition hover:text-clay"
            >
              {item.label}
            </a>
          ))}
          <a
            href={getNavHref("contact")}
            className="rounded-full bg-clay px-6 py-2 text-white text-sm shadow-card transition hover:bg-clay/90"
          >
            צור קשר
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
                href={getNavHref(item.id)}
                className="border-b border-border/50 py-3 text-ink/80 last:border-none"
                onClick={close}
              >
                {item.label}
              </a>
            ))}
            <a
              href={getNavHref("contact")}
              className="py-3 font-semibold text-clay"
              onClick={close}
            >
              צור קשר
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

