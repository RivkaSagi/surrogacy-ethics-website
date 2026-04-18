"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";

/**
 * Footer Animation - Surrogacy Journey Narrative
 *
 * Slower pace with more bouncing
 * Logo matches v2 proportions exactly
 * All elements move together during balance dance
 */

// V2 Logo exact proportions (scaled down for footer)
const SCALE = 0.5;
const LOGO = {
  // From v2: Big circle center (127, 120), r=60
  surrogate: { cx: 127 * SCALE, cy: 120 * SCALE, r: 60 * SCALE, rSmall: 45 * SCALE },
  // From v2: Small circle center (176, 73), r=39
  parent: { cx: 176 * SCALE, cy: 73 * SCALE, r: 39 * SCALE },
  // From v2: Filled dot (157.9, 99.9), r=7
  baby: { cx: 157.9 * SCALE, cy: 99.9 * SCALE, r: 7 * SCALE, rGrown: 12 * SCALE },
  // From v2: Balance line and circles
  balance: {
    line: { x1: 28 * SCALE, y1: 103 * SCALE, x2: 287 * SCALE, y2: 180 * SCALE },
    left: { cx: 44.5 * SCALE, cy: 92.3 * SCALE, r: 6 * SCALE },
    right: { cx: 280 * SCALE, cy: 163 * SCALE, r: 6 * SCALE },
  },
};

// Canvas dimensions
const CANVAS = {
  width: 300,
  height: 140,
  groundY: 120,
};

// Off-screen positions
const OFFSCREEN_LEFT = -80;
const OFFSCREEN_RIGHT = CANVAS.width + 80;

// Slower timing (in seconds)
const TIMING = {
  startDelay: 1.5,
  entryDuration: 4,      // Slower entry
  connectionDuration: 3,  // Slower connection
  formationDuration: 2,
  balanceDuration: 3,    // Longer balance dance
  separationDuration: 3,
  exitDuration: 2.5,
};

export function FooterAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const animationRef = useRef<boolean>(false);

  // Single control for the entire logo group (for horizontal movement)
  const logoGroupControls = useAnimationControls();

  // Individual controls for each element
  const parent1Controls = useAnimationControls();
  const parent2Controls = useAnimationControls();
  const surrogateControls = useAnimationControls();
  const balanceControls = useAnimationControls();
  const babyControls = useAnimationControls();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset all elements
  const resetAnimation = useCallback(() => {
    logoGroupControls.set({ x: 0 });
    parent1Controls.set({ x: OFFSCREEN_LEFT, y: 0, opacity: 0 });
    parent2Controls.set({ x: OFFSCREEN_LEFT, y: 0, opacity: 0 });
    surrogateControls.set({ x: OFFSCREEN_LEFT, y: 0, opacity: 0, r: LOGO.surrogate.rSmall });
    balanceControls.set({ x: OFFSCREEN_LEFT, y: 0, opacity: 0, rotate: 0 });
    babyControls.set({ opacity: 0, cx: LOGO.parent.cx, cy: LOGO.parent.cy, r: 3 });
  }, [logoGroupControls, parent1Controls, parent2Controls, surrogateControls, balanceControls, babyControls]);

  // Main animation sequence
  const runAnimation = useCallback(async () => {
    if (animationRef.current) return;
    animationRef.current = true;

    resetAnimation();
    await new Promise((r) => setTimeout(r, 100));
    await new Promise((r) => setTimeout(r, TIMING.startDelay * 1000));

    // ===== PHASE 1: ENTRY with lots of bouncing =====
    const centerX = CANVAS.width / 2;

    // Parent 1 - lots of bounces
    parent1Controls.start({
      x: centerX - 50,
      opacity: 1,
      y: [0, -40, 0, -25, 0, -15, 0, -8, 0, -3, 0],
      transition: {
        x: { type: "spring", stiffness: 30, damping: 10, duration: 2.5 },
        y: { duration: 3, times: [0, 0.12, 0.24, 0.36, 0.48, 0.58, 0.68, 0.78, 0.86, 0.94, 1], ease: "easeOut" },
        opacity: { duration: 0.5 },
      },
    });

    await new Promise((r) => setTimeout(r, 600));

    // Parent 2 - different bounce rhythm
    parent2Controls.start({
      x: centerX - 20,
      opacity: 1,
      y: [0, -35, 0, -22, 0, -12, 0, -5, 0],
      transition: {
        x: { type: "spring", stiffness: 28, damping: 12, duration: 2.8 },
        y: { duration: 2.8, times: [0, 0.14, 0.28, 0.42, 0.55, 0.68, 0.80, 0.92, 1], ease: "easeOut" },
        opacity: { duration: 0.5 },
      },
    });

    await new Promise((r) => setTimeout(r, 800));

    // Surrogate - heavier, fewer bounces
    surrogateControls.start({
      x: centerX + 30,
      opacity: 1,
      y: [0, -25, 0, -12, 0, -5, 0],
      transition: {
        x: { type: "spring", stiffness: 25, damping: 14, duration: 3 },
        y: { duration: 2.5, times: [0, 0.18, 0.36, 0.52, 0.68, 0.84, 1], ease: "easeOut" },
        opacity: { duration: 0.5 },
      },
    });

    await new Promise((r) => setTimeout(r, 1000));

    // Balance - light, lots of bounces
    balanceControls.start({
      x: centerX + 80,
      opacity: 1,
      y: [0, -45, 0, -30, 0, -18, 0, -10, 0, -4, 0],
      transition: {
        x: { type: "spring", stiffness: 22, damping: 16, duration: 3.5 },
        y: { duration: 3.5, times: [0, 0.1, 0.2, 0.32, 0.44, 0.55, 0.66, 0.77, 0.86, 0.94, 1], ease: "easeOut" },
        opacity: { duration: 0.5 },
      },
    });

    await new Promise((r) => setTimeout(r, TIMING.entryDuration * 500));

    // ===== PHASE 2: CONNECTION - elements move to form logo =====

    // Parents merge and move up to logo position
    parent1Controls.start({
      x: LOGO.parent.cx - 12,
      y: -(CANVAS.groundY - LOGO.parent.cy - LOGO.parent.r),
      transition: { duration: TIMING.connectionDuration * 0.5, ease: "easeInOut" },
    });

    parent2Controls.start({
      x: LOGO.parent.cx + 12,
      y: -(CANVAS.groundY - LOGO.parent.cy - LOGO.parent.r),
      transition: { duration: TIMING.connectionDuration * 0.5, ease: "easeInOut" },
    });

    // Surrogate moves to position
    surrogateControls.start({
      x: LOGO.surrogate.cx,
      y: -(CANVAS.groundY - LOGO.surrogate.cy - LOGO.surrogate.rSmall),
      transition: { duration: TIMING.connectionDuration * 0.5, ease: "easeInOut" },
    });

    await new Promise((r) => setTimeout(r, TIMING.connectionDuration * 600));

    // Parents fully merge into one
    parent1Controls.start({
      x: LOGO.parent.cx,
      transition: { duration: TIMING.connectionDuration * 0.4, ease: "easeInOut" },
    });
    parent2Controls.start({
      x: LOGO.parent.cx,
      opacity: 0,
      transition: { duration: TIMING.connectionDuration * 0.4, ease: "easeInOut" },
    });

    await new Promise((r) => setTimeout(r, TIMING.connectionDuration * 500));

    // Baby appears at parent and rolls to intersection
    babyControls.start({
      opacity: 1,
      cx: LOGO.baby.cx,
      cy: LOGO.baby.cy,
      r: LOGO.baby.r,
      transition: { duration: TIMING.connectionDuration * 0.6, ease: "easeOut" },
    });

    await new Promise((r) => setTimeout(r, TIMING.connectionDuration * 400));

    // ===== PHASE 3: FORMATION =====

    // Surrogate grows to full size
    surrogateControls.start({
      r: LOGO.surrogate.r,
      transition: { duration: TIMING.formationDuration, ease: "easeOut" },
    });

    // Balance line moves to attach position
    balanceControls.start({
      x: LOGO.surrogate.cx + 25,
      y: -(CANVAS.groundY - LOGO.surrogate.cy - 10),
      rotate: -20,
      transition: { duration: TIMING.formationDuration * 0.8, ease: "easeOut" },
    });

    await new Promise((r) => setTimeout(r, TIMING.formationDuration * 1200));

    // ===== PHASE 4: BALANCE DANCE - ALL ELEMENTS MOVE TOGETHER =====

    // Weeble motion - entire logo group moves horizontally
    await logoGroupControls.start({
      x: -25,
      transition: { duration: 0.7, ease: "easeInOut" },
    });
    await logoGroupControls.start({
      x: 20,
      transition: { duration: 0.6, ease: "easeInOut" },
    });
    await logoGroupControls.start({
      x: -12,
      transition: { duration: 0.5, ease: "easeInOut" },
    });
    await logoGroupControls.start({
      x: 8,
      transition: { duration: 0.4, ease: "easeInOut" },
    });
    await logoGroupControls.start({
      x: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    });

    // Also rotate balance line during dance
    balanceControls.start({
      rotate: [-20, -30, -10, -25, -20],
      transition: { duration: 2.5, times: [0, 0.25, 0.5, 0.75, 1] },
    });

    await new Promise((r) => setTimeout(r, 500));

    // ===== PHASE 5: SEPARATION =====

    // Baby rolls back toward parent and grows
    babyControls.start({
      cx: LOGO.parent.cx + 20,
      cy: LOGO.parent.cy - 10,
      r: LOGO.baby.rGrown,
      transition: { duration: TIMING.separationDuration * 0.5, ease: "easeInOut" },
    });

    // Surrogate shrinks
    surrogateControls.start({
      r: LOGO.surrogate.rSmall,
      transition: { duration: TIMING.separationDuration * 0.6, ease: "easeInOut" },
    });

    await new Promise((r) => setTimeout(r, TIMING.separationDuration * 400));

    // Parents split back
    parent1Controls.start({
      x: LOGO.parent.cx - 15,
      transition: { duration: TIMING.separationDuration * 0.4, ease: "easeOut" },
    });
    parent2Controls.start({
      x: LOGO.parent.cx + 15,
      opacity: 1,
      transition: { duration: TIMING.separationDuration * 0.4, ease: "easeOut" },
    });

    // Baby exits the circles and continues growing
    await new Promise((r) => setTimeout(r, TIMING.separationDuration * 500));

    babyControls.start({
      cx: LOGO.parent.cx + 45,
      cy: LOGO.parent.cy - 25,
      r: LOGO.baby.rGrown + 3,
      transition: { duration: TIMING.separationDuration * 0.4, ease: "easeIn" },
    });

    await new Promise((r) => setTimeout(r, TIMING.separationDuration * 300));

    // ===== PHASE 6: PLAYFUL EXIT =====

    const exitX = isMobile ? OFFSCREEN_RIGHT : OFFSCREEN_LEFT;

    // Balance exits first with bounce
    balanceControls.start({
      x: exitX,
      y: [-(CANVAS.groundY - LOGO.surrogate.cy - 10), -20, 0],
      rotate: isMobile ? 15 : -15,
      opacity: 0,
      transition: {
        x: { duration: TIMING.exitDuration, ease: "easeIn" },
        y: { duration: 1.2, times: [0, 0.5, 1] },
        opacity: { duration: TIMING.exitDuration * 0.9 },
      },
    });

    await new Promise((r) => setTimeout(r, 300));

    // Parents exit with bounces
    parent1Controls.start({
      x: exitX - 20,
      y: [-(CANVAS.groundY - LOGO.parent.cy - LOGO.parent.r), -15, 0, -8, 0],
      opacity: 0,
      transition: {
        x: { duration: TIMING.exitDuration * 0.9, ease: "easeIn" },
        y: { duration: 1.5, times: [0, 0.3, 0.5, 0.75, 1] },
        opacity: { duration: TIMING.exitDuration * 0.8, delay: 0.3 },
      },
    });

    await new Promise((r) => setTimeout(r, 250));

    parent2Controls.start({
      x: exitX - 40,
      y: [-(CANVAS.groundY - LOGO.parent.cy - LOGO.parent.r), -12, 0, -5, 0],
      opacity: 0,
      transition: {
        x: { duration: TIMING.exitDuration * 0.85, ease: "easeIn" },
        y: { duration: 1.3, times: [0, 0.3, 0.5, 0.75, 1] },
        opacity: { duration: TIMING.exitDuration * 0.75, delay: 0.2 },
      },
    });

    // Surrogate exits
    surrogateControls.start({
      x: exitX,
      y: [-(CANVAS.groundY - LOGO.surrogate.cy - LOGO.surrogate.rSmall), -10, 0],
      opacity: 0,
      transition: {
        x: { duration: TIMING.exitDuration, ease: "easeIn" },
        y: { duration: 1, times: [0, 0.6, 1] },
        opacity: { duration: TIMING.exitDuration * 0.9 },
      },
    });

    // Baby exits (continues growing)
    babyControls.start({
      cx: isMobile ? OFFSCREEN_RIGHT + 30 : OFFSCREEN_LEFT - 30,
      cy: CANVAS.groundY - 15,
      r: LOGO.baby.rGrown + 5,
      opacity: 0,
      transition: { duration: TIMING.exitDuration * 1.1, ease: "easeIn" },
    });

    await new Promise((r) => setTimeout(r, TIMING.exitDuration * 1200));

    animationRef.current = false;
  }, [isMobile, resetAnimation, logoGroupControls, parent1Controls, parent2Controls, surrogateControls, balanceControls, babyControls]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationRef.current) {
            runAnimation();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [runAnimation]);

  const groundY = CANVAS.groundY;

  return (
    <div
      ref={containerRef}
      className="w-full h-40 md:h-48 relative overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* All animated elements in a group for horizontal movement */}
        <motion.g animate={logoGroupControls}>
          {/* Surrogate (Big circle) */}
          <motion.circle
            cx={0}
            cy={groundY - LOGO.surrogate.rSmall}
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            initial={{ x: OFFSCREEN_LEFT, y: 0, opacity: 0, r: LOGO.surrogate.rSmall }}
            animate={surrogateControls}
          />

          {/* Parent circle 1 */}
          <motion.circle
            cx={0}
            cy={groundY - LOGO.parent.r}
            r={LOGO.parent.r}
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            initial={{ x: OFFSCREEN_LEFT, y: 0, opacity: 0 }}
            animate={parent1Controls}
          />

          {/* Parent circle 2 */}
          <motion.circle
            cx={0}
            cy={groundY - LOGO.parent.r}
            r={LOGO.parent.r}
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            initial={{ x: OFFSCREEN_LEFT, y: 0, opacity: 0 }}
            animate={parent2Controls}
          />

          {/* Baby (Filled circle) */}
          <motion.circle
            fill="white"
            initial={{
              opacity: 0,
              cx: LOGO.parent.cx,
              cy: LOGO.parent.cy,
              r: 3,
            }}
            animate={babyControls}
          />

          {/* Balance scale group */}
          <motion.g
            initial={{ x: OFFSCREEN_LEFT, y: 0, opacity: 0, rotate: 0 }}
            animate={balanceControls}
            style={{ transformOrigin: "50% 50%" }}
          >
            {/* Balance line - angled like v2 logo */}
            <line
              x1={-50}
              y1={groundY - 20}
              x2={50}
              y2={groundY - 5}
              stroke="white"
              strokeWidth="1.5"
            />
            {/* Left balance circle */}
            <circle
              cx={-47}
              cy={groundY - 22}
              r={LOGO.balance.left.r}
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Right balance circle */}
            <circle
              cx={47}
              cy={groundY - 3}
              r={LOGO.balance.right.r}
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
