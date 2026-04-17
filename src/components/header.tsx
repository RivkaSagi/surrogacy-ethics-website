"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PrimaryButton } from "./primary-button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background" dir="rtl">
      <div className="flex items-center justify-between px-5 md:px-8 py-2 md:py-3">
        {/* Logo with text - Right side in RTL */}
        <Link href="/">
          <Image
            src="/Logo-new-w-text.png"
            alt="הקוד האתי לפונדקאות"
            width={180}
            height={58}
            className="h-16 md:h-20 w-auto"
          />
        </Link>

        {/* Navigation - Left side in RTL */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/team"
            className="font-bold text-sm text-text hover:text-primary transition-colors"
          >
            מי אנחנו
          </Link>
          <Link
            href="/signatories"
            className="font-bold text-sm text-text hover:text-primary transition-colors"
          >
            אנשי המקצוע החתומים
          </Link>
          <Link
            href="/TheEthicsCode.pdf"
            target="_blank"
            className="font-bold text-sm text-text hover:text-primary transition-colors"
          >
            הקוד האתי המלא
          </Link>
          <PrimaryButton href="mailto:surrogacy.ethics.il@gmail.com">
            צרו קשר
          </PrimaryButton>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border px-8 py-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="/team"
              className="font-bold text-sm text-text hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              מי אנחנו
            </Link>
            <Link
              href="/signatories"
              className="font-bold text-sm text-text hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              אנשי המקצוע החתומים
            </Link>
            <Link
              href="/TheEthicsCode.pdf"
              target="_blank"
              className="font-bold text-sm text-text hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              הקוד האתי המלא
            </Link>
            <PrimaryButton href="mailto:surrogacy.ethics.il@gmail.com">
              צרו קשר
            </PrimaryButton>
          </nav>
        </div>
      )}
    </header>
  );
}
