"use client";

import Link from "next/link";

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: "_blank" | "_self";
}

export function PrimaryButton({
  children,
  href,
  onClick,
  className = "",
  target,
}: PrimaryButtonProps) {
  // Use transform translateY for hover effect - moves entire button up
  // border-b-4 with transparent border to reserve space, then highlight on hover
  const baseStyles =
    "inline-flex items-center justify-center bg-primary text-white font-bold text-sm px-6 py-2 rounded-2xl border-b-4 border-transparent hover:bg-[#be4b2f] hover:border-highlight hover:-translate-y-0.5 transition-all duration-200";

  if (href) {
    if (target === "_blank") {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseStyles} ${className}`}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={`${baseStyles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${className}`}>
      {children}
    </button>
  );
}
