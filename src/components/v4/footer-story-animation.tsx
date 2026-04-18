"use client";

// ============================================================================
// FOOTER STORY ANIMATION - DISABLED
// ============================================================================
//
// This animation is temporarily disabled pending reimplementation.
// See docs/footer-animation-figma-data.md for extracted Figma position data.
//
// Key issues to fix:
// - Elements appearing below ground line
// - Position mismatch between Figma and rendered output
// - Animation timing too fast
// - Coordinate conversion not working correctly
//
// ============================================================================

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Animation disabled - set to true to re-enable when fixed
const ANIMATION_DISABLED = true;

// ============================================================================
// ANIMATION TIMING - SLOW AND NATURAL
// ============================================================================

const PHASE_CONFIG = {
  // Phase 1: Entry with bouncing (frames 0-10) - SLOW bouncing
  ENTRY: { start: 0, end: 10, frameDuration: 350 },
  // Pause before merge
  PAUSE_1: { start: 11, end: 11, frameDuration: 1200 },
  // Phase 2: Parents merge (frame 12)
  MERGE: { start: 12, end: 12, frameDuration: 600 },
  // Phase 3: Surrogate entry (frames 13-16)
  SURROGATE_ENTRY: { start: 13, end: 16, frameDuration: 400 },
  // Pause before connection
  PAUSE_2: { start: 17, end: 17, frameDuration: 1000 },
  // Phase 4: Connection & Balance - VERY SMOOTH (frames 18-32)
  CONNECTION: { start: 18, end: 32, frameDuration: 500 },
  // Pause at peak
  PAUSE_3: { start: 33, end: 33, frameDuration: 800 },
  // Phase 5: Birth - smooth sliding (frames 34-36)
  BIRTH: { start: 34, end: 36, frameDuration: 550 },
  // Phase 6: Separation (frames 37-39)
  SEPARATION: { start: 37, end: 39, frameDuration: 450 },
  // Phase 7: Exit with bouncing (frames 40-44)
  EXIT: { start: 40, end: 44, frameDuration: 350 },
};

function getFrameDuration(frame: number): number {
  for (const phase of Object.values(PHASE_CONFIG)) {
    if (frame >= phase.start && frame <= phase.end) {
      return phase.frameDuration;
    }
  }
  return 400;
}

function getPhase(frame: number): string {
  if (frame <= 10) return "ENTRY";
  if (frame === 11) return "PAUSE_1";
  if (frame === 12) return "MERGE";
  if (frame <= 16) return "SURROGATE_ENTRY";
  if (frame === 17) return "PAUSE_2";
  if (frame <= 32) return "CONNECTION";
  if (frame === 33) return "PAUSE_3";
  if (frame <= 36) return "BIRTH";
  if (frame <= 39) return "SEPARATION";
  return "EXIT";
}

// ============================================================================
// ELEMENT SIZES
// ============================================================================

const SIZES = {
  parent: 60,
  surrogate: { min: 70, max: 120 },
  interest: 14,
  baby: { min: 10, max: 40 },
  balance: { width: 220, height: 10 },
};

// ============================================================================
// KEYFRAME POSITIONS - EXACT FROM FIGMA
//
// Calculated using: Y = axis_top% - element_top%
// When Y < 0, element is on/below ground → clamp to 0
// X = left% from inset
//
// All Y values are PERCENTAGES of container height (will be converted to px)
// ============================================================================

interface Position {
  x: number;      // percentage of width (0-100)
  y: number;      // PERCENTAGE above ground (0 = ground, 20 = 20% of container height above ground)
  rotation?: number;
  scale?: number;
  opacity?: number;
}

interface FrameState {
  p1?: Position;
  p2?: Position;
  p?: Position;
  s?: Position;
  pi?: Position;
  si?: Position;
  bb?: Position;
  b?: Position;
}

const KEYFRAMES: Record<number, FrameState> = {
  // =========== s1: Empty start ===========
  0: {},

  // =========== s2: Entry begins ===========
  // axis=62.03%, p2 top=38.73% left=6.37%, p1 top=48.1% left=0%, pi top=73.67% left=11.52%
  // Y: p2=23.3%, p1=13.93%, pi=0 (below ground)
  1: {
    p1: { x: 0, y: 14, rotation: 98, opacity: 1 },
    p2: { x: 6, y: 23, rotation: 98, opacity: 1 },
    pi: { x: 12, y: 0, opacity: 1 },
  },

  // =========== s3: First bounce ===========
  // axis=62.03%, p2 top=64.81% left=8.71% (on ground), p1 top=38.73% left=16.94% (up), pi on ground
  // Y: p2=0, p1=23.3%, pi=0
  2: {
    p1: { x: 17, y: 23, rotation: 98 },
    p2: { x: 9, y: 0, rotation: 98 },
    pi: { x: 30, y: 0 },
  },

  // =========== s4: Continue bouncing ===========
  // axis=61.52%, p2 top=61.52% (ground), p1 top=42.03% left=25.77%, pi on ground
  // Y: p2=0, p1=19.5%, pi=0
  3: {
    p1: { x: 26, y: 20, rotation: 98 },
    p2: { x: 53, y: 0, rotation: 98 },
    pi: { x: 61, y: 0 },
  },

  // =========== s5-s6: More bounces (interpolated) ===========
  4: {
    p1: { x: 28, y: 0, rotation: 98 },
    p2: { x: 30, y: 18, rotation: 98 },
    pi: { x: 45, y: 8 },
  },

  5: {
    p1: { x: 30, y: 15, rotation: 98 },
    p2: { x: 32, y: 0, rotation: 98 },
    pi: { x: 48, y: 0 },
  },

  // =========== s7-s10: Settling ===========
  6: {
    p1: { x: 31, y: 0, rotation: 98 },
    p2: { x: 32, y: 10, rotation: 98 },
    pi: { x: 49, y: 5 },
  },

  7: {
    p1: { x: 32, y: 8, rotation: 98 },
    p2: { x: 33, y: 0, rotation: 98 },
    pi: { x: 50, y: 0 },
  },

  8: {
    p1: { x: 33, y: 0, rotation: 98 },
    p2: { x: 33, y: 5, rotation: 98 },
    pi: { x: 50, y: 3 },
  },

  9: {
    p1: { x: 34, y: 3, rotation: 98 },
    p2: { x: 34, y: 0, rotation: 98 },
    pi: { x: 50, y: 0 },
  },

  // =========== s10-s11: On ground, merging ===========
  // From Figma s11: p1 left=33.75%, p2 left=34.17%, both on ground
  10: {
    p1: { x: 34, y: 0, rotation: 98 },
    p2: { x: 34, y: 0, rotation: 98 },
    pi: { x: 50, y: 0 },
  },

  11: {
    p1: { x: 34, y: 0, rotation: 98 },
    p2: { x: 34, y: 0, rotation: 98 },
    pi: { x: 50, y: 0 },
  },

  // =========== s12: Merge into single p ===========
  12: {
    p: { x: 34, y: 0, rotation: 98 },
    pi: { x: 50, y: 0 },
  },

  // =========== s13-s15: Surrogate entry ===========
  13: {
    p: { x: 40, y: 10, rotation: 98 },
    s: { x: 20, y: 15, scale: 0.85, rotation: 98, opacity: 1 },
    pi: { x: 55, y: 8 },
    si: { x: 22, y: 0, opacity: 1 },
  },

  14: {
    p: { x: 45, y: 0, rotation: 98 },
    s: { x: 25, y: 0, scale: 0.88, rotation: 98 },
    pi: { x: 56, y: 0 },
    si: { x: 24, y: 10 },
  },

  15: {
    p: { x: 50, y: 8, rotation: 98 },
    s: { x: 27, y: 8, scale: 0.9, rotation: 98 },
    pi: { x: 57, y: 5 },
    si: { x: 25, y: 0 },
  },

  // =========== s16: From Figma ===========
  // axis=61.77%, p top=65.06% left=52.85% (ground), s top=59.49% left=27.45% (Y=2.28%)
  // pi top=46.08% left=57.78% (Y=15.69%), si top=75.44% left=25.41% (ground)
  16: {
    p: { x: 53, y: 0, rotation: 98 },
    s: { x: 27, y: 2, scale: 0.9, rotation: 98 },
    pi: { x: 58, y: 16 },
    si: { x: 25, y: 0 },
  },

  // =========== s17: Pause before connection ===========
  // axis=62.03%, p top=65.06% left=46.79% (ground), s top=59.49% left=60.3% (Y=2.54%)
  17: {
    p: { x: 47, y: 0, rotation: 98 },
    s: { x: 60, y: 3, scale: 0.9, rotation: 98 },
    pi: { x: 38, y: 0 },
    si: { x: 65, y: 0 },
  },

  // =========== s18-s19: Moving together ===========
  18: {
    p: { x: 48, y: 0, rotation: 80 },
    s: { x: 55, y: 2, scale: 0.92, rotation: 80 },
    pi: { x: 39, y: 0 },
    si: { x: 63, y: 0 },
  },

  19: {
    p: { x: 49, y: 0, rotation: 60 },
    s: { x: 50, y: 2, scale: 0.95, rotation: 60 },
    pi: { x: 40, y: 0 },
    si: { x: 62, y: 0 },
  },

  // =========== s20: From Figma ===========
  // axis=62.03%, p top=64.81% left=51.71% (ground), s top=59.75% left=46.61% (Y=2.28%)
  20: {
    p: { x: 52, y: 0, rotation: 40 },
    s: { x: 47, y: 2, scale: 0.97, rotation: 40 },
    pi: { x: 38, y: 0 },
    si: { x: 65, y: 0 },
  },

  // =========== s21: Approaching vertical ===========
  21: {
    p: { x: 48, y: 8, rotation: 20 },
    s: { x: 47, y: 1, scale: 0.98, rotation: 20 },
    pi: { x: 38, y: 0 },
    si: { x: 65, y: 0 },
  },

  // =========== s22: Connection forming - ELEVATED ===========
  // axis=59.49%, p top=43.62% left=47.16% (Y=15.87%), s top=58.54% left=46.76% (Y=0.95%)
  22: {
    p: { x: 47, y: 16, rotation: 0 },
    s: { x: 47, y: 1, scale: 1, rotation: 0 },
    pi: { x: 38, y: 0 },
    si: { x: 65, y: 0 },
  },

  // =========== s23: Balance line appears ===========
  23: {
    p: { x: 47, y: 16, rotation: -5 },
    s: { x: 47, y: 1, scale: 1.02, rotation: -5 },
    b: { x: 42, y: 3, rotation: -10, opacity: 0.3 },
    pi: { x: 38, y: 0 },
    si: { x: 65, y: 0 },
  },

  // =========== s24: Balance growing ===========
  24: {
    p: { x: 48, y: 15, rotation: -12 },
    s: { x: 47, y: 0, scale: 1.04, rotation: -12 },
    b: { x: 42, y: 5, rotation: -15, opacity: 0.6 },
    pi: { x: 38, y: 0 },
    si: { x: 65, y: 0 },
  },

  // =========== s25: Balance full - From Figma ===========
  // axis=58.99%, b top=51.9% left=41.92% (Y=7.09%), p top=43.8% left=47.63% (Y=15.19%)
  // s top=58.48% left=46.97% (Y=0.51%)
  25: {
    p: { x: 48, y: 15, rotation: -17 },
    s: { x: 47, y: 1, scale: 1.05, rotation: -17 },
    b: { x: 42, y: 7, rotation: -17, opacity: 1 },
    pi: { x: 38, y: 0 },
    si: { x: 65, y: 0 },
  },

  // =========== s26: Continuing ===========
  26: {
    p: { x: 48, y: 16, rotation: -10 },
    s: { x: 47, y: 1, scale: 1.08, rotation: -10 },
    b: { x: 42, y: 5, rotation: -12 },
    pi: { x: 40, y: 0 },
    si: { x: 60, y: 0 },
    bb: { x: 50, y: 0, scale: 0.2, opacity: 0 },
  },

  // =========== s27: Baby appears ===========
  27: {
    p: { x: 48, y: 16, rotation: -8 },
    s: { x: 47, y: 2, scale: 1.1, rotation: -8 },
    b: { x: 42, y: 4, rotation: -10 },
    pi: { x: 42, y: 0 },
    si: { x: 57, y: 0 },
    bb: { x: 50, y: 0, scale: 0.3, opacity: 0.4 },
  },

  // =========== s28: From Figma ===========
  // axis=62.53%, b top=59.64% left=41.88% (Y=2.89%), p top=46.21% left=47.94% (Y=16.32%)
  // bb top=62.17% left=51.98% (Y=0.36%), s top=60.47% left=46.6% (Y=2.06%)
  28: {
    p: { x: 48, y: 16, rotation: -6 },
    s: { x: 47, y: 2, scale: 1.12, rotation: -6 },
    b: { x: 42, y: 3, rotation: -14 },
    pi: { x: 42, y: 0 },
    si: { x: 57, y: 0 },
    bb: { x: 52, y: 0, scale: 0.4, opacity: 0.6 },
  },

  // =========== s29-s30: Baby growing ===========
  29: {
    p: { x: 49, y: 14, rotation: -4 },
    s: { x: 47, y: 3, scale: 1.15, rotation: -4 },
    b: { x: 43, y: 2, rotation: -10 },
    pi: { x: 43, y: 0 },
    si: { x: 56, y: 0 },
    bb: { x: 51, y: 0, scale: 0.5, opacity: 0.8 },
  },

  30: {
    p: { x: 50, y: 12, rotation: -2 },
    s: { x: 47, y: 4, scale: 1.18, rotation: -2 },
    b: { x: 44, y: 0, rotation: -5 },
    pi: { x: 44, y: 0 },
    si: { x: 56, y: 0 },
    bb: { x: 51, y: 0, scale: 0.6, opacity: 0.9 },
  },

  // =========== s31: Approaching birth ===========
  31: {
    p: { x: 50, y: 10, rotation: 0 },
    s: { x: 47, y: 5, scale: 1.2, rotation: 0 },
    b: { x: 44, y: 0, rotation: 0 },
    pi: { x: 45, y: 0 },
    si: { x: 58, y: 0 },
    bb: { x: 51, y: 0, scale: 0.7, opacity: 1 },
  },

  // =========== s32: From Figma ===========
  // axis=60%, p top=49.87% left=50.39% (Y=10.13%), s top=53.92% left=46.55% (Y=6.08%)
  // b on ground, bb on ground
  32: {
    p: { x: 50, y: 10, rotation: 0 },
    s: { x: 47, y: 6, scale: 1.2, rotation: 0 },
    b: { x: 44, y: 0, rotation: 0 },
    pi: { x: 45, y: 0 },
    si: { x: 59, y: 0 },
    bb: { x: 51, y: 0, scale: 0.75, opacity: 1 },
  },

  // =========== s33: Pause at peak ===========
  33: {
    p: { x: 50, y: 8, rotation: 0 },
    s: { x: 47, y: 5, scale: 1.18, rotation: 0 },
    b: { x: 40, y: 3, rotation: -15 },
    pi: { x: 45, y: 0 },
    si: { x: 58, y: 0 },
    bb: { x: 53, y: 0, scale: 0.8 },
  },

  // =========== s34-s36: Birth - sliding ===========
  34: {
    p: { x: 52, y: 5, rotation: 5 },
    s: { x: 48, y: 3, scale: 1.12, rotation: 5 },
    b: { x: 32, y: 6, rotation: -35, opacity: 0.8 },
    pi: { x: 44, y: 0 },
    si: { x: 57, y: 0 },
    bb: { x: 56, y: 0, scale: 0.85 },
  },

  35: {
    p: { x: 55, y: 2, rotation: 8 },
    s: { x: 49, y: 2, scale: 1.05, rotation: 8 },
    b: { x: 22, y: 8, rotation: -60, opacity: 0.5 },
    pi: { x: 43, y: 0 },
    si: { x: 56, y: 0 },
    bb: { x: 59, y: 0, scale: 0.9 },
  },

  36: {
    p: { x: 58, y: 0, rotation: 10 },
    s: { x: 50, y: 0, scale: 1, rotation: 10 },
    b: { x: 12, y: 10, rotation: -90, opacity: 0.3 },
    pi: { x: 42, y: 0 },
    si: { x: 55, y: 0 },
    bb: { x: 62, y: 0, scale: 0.95 },
  },

  // =========== s37-s39: Separation ===========
  37: {
    p: { x: 60, y: 0, rotation: 5 },
    s: { x: 50, y: 0, scale: 0.95, rotation: 5 },
    b: { x: 5, y: 8, rotation: -120, opacity: 0.15 },
    pi: { x: 43, y: 0 },
    si: { x: 54, y: 0 },
    bb: { x: 64, y: 0, scale: 1 },
  },

  38: {
    p: { x: 62, y: 0, rotation: 0 },
    s: { x: 48, y: 0, scale: 0.9, rotation: 0 },
    b: { x: 0, y: 5, rotation: -150, opacity: 0 },
    pi: { x: 44, y: 0 },
    si: { x: 53, y: 0 },
    bb: { x: 65, y: 0 },
  },

  // =========== s40: Parents separate - From Figma ===========
  // axis=60.25%, p1 top=65.06% left=66.07% (ground), p2 top=64.81% left=63% (ground)
  // s top=60.51% left=47.15% (ground), bb top=65.06% left=59.15% (ground)
  39: {
    p1: { x: 66, y: 0, rotation: 0, opacity: 1 },
    p2: { x: 63, y: 0, rotation: 0, opacity: 1 },
    s: { x: 47, y: 0, scale: 0.85, rotation: 0 },
    pi: { x: 41, y: 0 },
    si: { x: 58, y: 0 },
    bb: { x: 59, y: 0 },
  },

  // =========== s41-s44: Exit bouncing ===========
  40: {
    p1: { x: 68, y: 18, rotation: 40 },
    p2: { x: 65, y: 0, rotation: 60 },
    s: { x: 55, y: 12, scale: 0.82, rotation: 40 },
    pi: { x: 50, y: 0 },
    si: { x: 62, y: 15 },
    bb: { x: 70, y: 10 },
  },

  41: {
    p1: { x: 74, y: 0, rotation: 80 },
    p2: { x: 72, y: 20, rotation: 100 },
    s: { x: 65, y: 0, scale: 0.8, rotation: 80 },
    pi: { x: 60, y: 12 },
    si: { x: 70, y: 0 },
    bb: { x: 78, y: 18 },
  },

  42: {
    p1: { x: 82, y: 15, rotation: 120 },
    p2: { x: 80, y: 0, rotation: 140 },
    s: { x: 78, y: 15, scale: 0.78, rotation: 120 },
    pi: { x: 72, y: 0 },
    si: { x: 82, y: 10 },
    bb: { x: 88, y: 0 },
  },

  43: {
    p1: { x: 92, y: 0, rotation: 160 },
    p2: { x: 90, y: 12, rotation: 180 },
    s: { x: 90, y: 0, scale: 0.75, rotation: 160 },
    pi: { x: 85, y: 8 },
    si: { x: 92, y: 0 },
    bb: { x: 98, y: 8 },
  },

  44: {
    p1: { x: 105, y: 12, rotation: 200 },
    p2: { x: 108, y: 0, rotation: 220 },
    s: { x: 110, y: 10, scale: 0.72, rotation: 200 },
    pi: { x: 102, y: 0 },
    si: { x: 108, y: 6 },
    bb: { x: 115, y: 0 },
  },
};

// ============================================================================
// INTERPOLATION
// ============================================================================

function interpolatePosition(
  frame: number,
  element: keyof FrameState
): Position | undefined {
  const frames = Object.keys(KEYFRAMES)
    .map(Number)
    .sort((a, b) => a - b);

  let prevFrame = 0;
  let nextFrame = frames[frames.length - 1];

  for (let i = 0; i < frames.length; i++) {
    if (frames[i] <= frame) prevFrame = frames[i];
    if (frames[i] >= frame && nextFrame === frames[frames.length - 1]) {
      nextFrame = frames[i];
      break;
    }
  }

  const prevState = KEYFRAMES[prevFrame]?.[element];
  const nextState = KEYFRAMES[nextFrame]?.[element];

  if (!prevState && !nextState) return undefined;
  if (!prevState) return nextState;
  if (!nextState) return prevState;
  if (prevFrame === nextFrame) return prevState;

  const t = (frame - prevFrame) / (nextFrame - prevFrame);

  return {
    x: prevState.x + (nextState.x - prevState.x) * t,
    y: prevState.y + (nextState.y - prevState.y) * t,
    rotation:
      (prevState.rotation || 0) +
      ((nextState.rotation || 0) - (prevState.rotation || 0)) * t,
    scale:
      (prevState.scale || 1) +
      ((nextState.scale || 1) - (prevState.scale || 1)) * t,
    opacity:
      (prevState.opacity ?? 1) +
      ((nextState.opacity ?? 1) - (prevState.opacity ?? 1)) * t,
  };
}

function isElementVisible(frame: number, element: keyof FrameState): boolean {
  if (element === "p1" || element === "p2") {
    return frame < 12 || frame >= 39;
  }
  if (element === "p") {
    return frame >= 12 && frame < 39;
  }
  if (element === "s") {
    return frame >= 13;
  }
  if (element === "si") {
    return frame >= 13;
  }
  if (element === "b") {
    return frame >= 23 && frame < 39;
  }
  if (element === "bb") {
    return frame >= 26;
  }
  return true;
}

// ============================================================================
// SPRING CONFIGS - Slow and smooth
// ============================================================================

// Bouncy but slow physics for entry/exit
const bounceSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 15,
  mass: 1,
};

// Very smooth physics for middle section
const smoothSpring = {
  type: "spring" as const,
  stiffness: 40,
  damping: 20,
  mass: 2,
};

function getSpringConfig(frame: number) {
  const phase = getPhase(frame);
  if (phase === "ENTRY" || phase === "SURROGATE_ENTRY" || phase === "EXIT") {
    return bounceSpring;
  }
  return smoothSpring;
}

// ============================================================================
// COMPONENT
// ============================================================================

interface FooterStoryAnimationProps {
  onFooterHover?: (hovering: boolean) => void;
}

export function FooterStoryAnimation({
  onFooterHover,
}: FooterStoryAnimationProps) {
  const [currentFrame, setCurrentFrame] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1000);
  const [containerHeight, setContainerHeight] = useState(160);

  // Trigger animation when scrolled to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggered) return;

      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= docHeight - 200) {
        setTimeout(() => {
          setHasTriggered(true);
          setCurrentFrame(0);
          setIsPlaying(true);
        }, 800);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered]);

  // Frame advancement with variable timing
  useEffect(() => {
    if (!isPlaying || currentFrame < 0 || currentFrame >= 44) return;

    const duration = getFrameDuration(currentFrame);
    const timer = setTimeout(() => {
      setCurrentFrame((prev) => prev + 1);
    }, duration);

    return () => clearTimeout(timer);
  }, [isPlaying, currentFrame]);

  // Viewport resize handling
  useEffect(() => {
    const handleResize = () => {
      setVw(window.innerWidth);
      setContainerHeight(window.innerWidth >= 768 ? 208 : 160);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pause on hover
  const handleFooterEnter = useCallback(() => {
    setIsPlaying(false);
    onFooterHover?.(true);
  }, [onFooterHover]);

  const handleFooterLeave = useCallback(() => {
    setIsPlaying(true);
    onFooterHover?.(false);
  }, [onFooterHover]);

  // Get element style with proper coordinate conversion
  // Y is now percentage of container height - convert to pixels
  const getElementStyle = (element: keyof FrameState) => {
    if (currentFrame < 0) return { opacity: 0, x: -200 };

    const pos = interpolatePosition(currentFrame, element);
    if (!pos || !isElementVisible(currentFrame, element)) {
      return { opacity: 0, x: -200 };
    }

    // Convert x% to pixels
    const xPixels = (pos.x / 100) * vw;

    // Convert y% to pixels (y is percentage of container height above ground)
    // Clamp Y to never be negative (never below ground)
    const yPercentage = Math.max(0, pos.y);
    const yPixels = (yPercentage / 100) * containerHeight;

    return {
      x: xPixels,
      y: -yPixels, // Negative = up from bottom (bottom-0 positioning)
      rotate: pos.rotation || 0,
      scale: pos.scale || 1,
      opacity: pos.opacity ?? 1,
    };
  };

  // Dynamic surrogate size
  const getSurrogateSize = () => {
    if (currentFrame < 13) return SIZES.surrogate.min;
    if (currentFrame >= 37) {
      const shrinkProgress = Math.min((currentFrame - 37) / 7, 1);
      return SIZES.surrogate.max - (SIZES.surrogate.max - SIZES.surrogate.min) * shrinkProgress * 0.3;
    }
    const growthProgress = Math.min((currentFrame - 13) / 20, 1);
    return SIZES.surrogate.min + (SIZES.surrogate.max - SIZES.surrogate.min) * growthProgress;
  };

  // Dynamic baby size
  const getBabySize = () => {
    if (currentFrame < 26) return 0;
    const growthProgress = Math.min((currentFrame - 26) / 18, 1);
    return SIZES.baby.min + (SIZES.baby.max - SIZES.baby.min) * growthProgress;
  };

  // Render nothing if animation is disabled or not triggered
  if (ANIMATION_DISABLED || (!hasTriggered && currentFrame < 0)) {
    return <div className="h-full" />;
  }

  const springConfig = getSpringConfig(currentFrame);

  return (
    <div
      className="absolute inset-0 pointer-events-auto overflow-hidden"
      style={{ clipPath: "inset(0 0 0 0)" }}
      onMouseEnter={handleFooterEnter}
      onMouseLeave={handleFooterLeave}
    >
      {/* Parent 1 */}
      <motion.div
        className="absolute left-0 bottom-0 origin-bottom-left"
        style={{ width: SIZES.parent, height: SIZES.parent }}
        animate={getElementStyle("p1")}
        transition={springConfig}
      >
        <Image src="/animation/p.svg" alt="" fill className="object-contain" />
      </motion.div>

      {/* Parent 2 */}
      <motion.div
        className="absolute left-0 bottom-0 origin-bottom-left"
        style={{ width: SIZES.parent, height: SIZES.parent }}
        animate={getElementStyle("p2")}
        transition={springConfig}
      >
        <Image src="/animation/p.svg" alt="" fill className="object-contain" />
      </motion.div>

      {/* Merged Parent */}
      <motion.div
        className="absolute left-0 bottom-0 origin-bottom-left"
        style={{ width: SIZES.parent, height: SIZES.parent }}
        animate={getElementStyle("p")}
        transition={springConfig}
      >
        <Image src="/animation/p.svg" alt="" fill className="object-contain" />
      </motion.div>

      {/* Surrogate */}
      <motion.div
        className="absolute left-0 bottom-0 origin-bottom-left"
        style={{ width: getSurrogateSize(), height: getSurrogateSize() }}
        animate={getElementStyle("s")}
        transition={springConfig}
      >
        <Image src="/animation/s.svg" alt="" fill className="object-contain" />
      </motion.div>

      {/* Balance Line */}
      <motion.div
        className="absolute left-0 bottom-0 origin-bottom-left"
        style={{ width: SIZES.balance.width, height: SIZES.balance.height }}
        animate={getElementStyle("b")}
        transition={springConfig}
      >
        <Image src="/animation/b.svg" alt="" fill className="object-contain" />
      </motion.div>

      {/* Parent Interest */}
      <motion.div
        className="absolute left-0 bottom-0 origin-bottom-left"
        style={{ width: SIZES.interest, height: SIZES.interest }}
        animate={getElementStyle("pi")}
        transition={springConfig}
      >
        <Image src="/animation/interest.svg" alt="" fill className="object-contain" />
      </motion.div>

      {/* Surrogate Interest */}
      <motion.div
        className="absolute left-0 bottom-0 origin-bottom-left"
        style={{ width: SIZES.interest, height: SIZES.interest }}
        animate={getElementStyle("si")}
        transition={springConfig}
      >
        <Image src="/animation/interest.svg" alt="" fill className="object-contain" />
      </motion.div>

      {/* Baby */}
      <motion.div
        className="absolute left-0 bottom-0 origin-bottom-left"
        style={{ width: getBabySize(), height: getBabySize() }}
        animate={getElementStyle("bb")}
        transition={springConfig}
      >
        <Image src="/animation/bb.svg" alt="" fill className="object-contain" />
      </motion.div>

      {/* Debug info */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-2 left-2 text-xs text-white/50 bg-black/30 px-2 py-1 rounded">
          Frame: {currentFrame} | Phase: {getPhase(currentFrame)} | Playing: {isPlaying ? "yes" : "no"}
        </div>
      )}
    </div>
  );
}
