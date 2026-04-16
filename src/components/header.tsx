"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PrimaryButton } from "./primary-button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo with text - Right side in RTL */}
        <Link href="/" className="order-2 md:order-none">
          <Image
            src="/Logo-new-w-text.png"
            alt="הקוד האתי לפונדקאות"
            width={180}
            height={58}
            className="h-14 w-auto"
          />
        </Link>

        {/* Navigation - Left side in RTL */}
        <nav className="hidden md:flex items-center gap-8 order-1 md:order-none">
          <PrimaryButton href="mailto:surrogacy.ethics.il@gmail.com">
            צרו קשר
          </PrimaryButton>
          <Link
            href="/signatories"
            className="font-bold text-sm text-text hover:text-primary transition-colors"
          >
            אנשי המקצוע החתומים
          </Link>
          <Link
            href="/team"
            className="font-bold text-sm text-text hover:text-primary transition-colors"
          >
            מי אנחנו
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 order-1"
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
            <PrimaryButton href="mailto:surrogacy.ethics.il@gmail.com">
              צרו קשר
            </PrimaryButton>
          </nav>
        </div>
      )}
    </header>
  );
}
