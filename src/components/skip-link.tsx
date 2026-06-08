"use client";

import { useEffect } from "react";

/**
 * Site-wide skip-to-main-content link.
 *
 * Renders the visually-hidden-until-focused link and also wires up a hashchange
 * listener so that activating the skip link reliably moves keyboard focus to
 * <main id="main-content"> (browsers move scroll position on hash-jump but
 * don't always move focus, even when the target has tabindex).
 */
export function SkipLink() {
  useEffect(() => {
    function focusMain() {
      if (window.location.hash !== "#main-content") return;
      const main = document.getElementById("main-content");
      if (main) {
        main.focus();
        // Reset the hash so a second activation triggers hashchange again
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
    window.addEventListener("hashchange", focusMain);
    return () => window.removeEventListener("hashchange", focusMain);
  }, []);

  return (
    <a
      href="#main-content"
      className="absolute -top-10 right-4 z-[100] bg-primary text-white font-bold px-4 py-2 rounded-lg transition-all focus:top-4 focus:outline-2 focus:outline-offset-2 focus:outline-highlight"
    >
      דלג לתוכן הראשי
    </a>
  );
}
