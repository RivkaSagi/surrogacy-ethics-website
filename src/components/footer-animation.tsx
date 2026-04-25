"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

// Animation timestamps (at 60fps) for animation4.json (910x188)
const LOGO_FRAME = 1187;       // 19.78 seconds - logo centered (start position)
const LOGO_FRAME_END = 964;    // 16.07 seconds - end point of second segment
const SECOND_PART_START = 204; // 3.40 seconds - start of second part
const TOTAL_FRAMES = 1859;     // End of animation (~31 seconds)

export function FooterAnimation() {
  const [shouldPlay, setShouldPlay] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const hasStartedRef = useRef(false);

  // Check for URL parameter to enable animation
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setIsEnabled(urlParams.has("animation"));
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    fetch("/footer-animation.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, [isEnabled]);

  // Show logo at the correct frame as soon as animation data is loaded
  useEffect(() => {
    if (animationData && lottieRef.current) {
      // Small delay to ensure Lottie is fully initialized
      setTimeout(() => {
        lottieRef.current?.goToAndStop(LOGO_FRAME, true);
        setIsReady(true);
      }, 50);
    }
  }, [animationData]);

  useEffect(() => {
    if (!isEnabled) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 50;

      if (isAtBottom && !shouldPlay) {
        setTimeout(() => {
          setShouldPlay(true);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldPlay, isEnabled]);

  const runAnimationSequence = useCallback(() => {
    const lottie = lottieRef.current;
    if (!lottie || hasStartedRef.current) return;

    hasStartedRef.current = true;

    // Set playback speed to 1.33x
    lottie.setSpeed(1.33);

    // Step 1: Show logo immediately (go to logo frame) and wait 1 second
    lottie.goToAndStop(LOGO_FRAME, true);

    setTimeout(() => {
      // Step 2: Play from frame 1187 to end
      lottie.playSegments([LOGO_FRAME, TOTAL_FRAMES], true);

      // Calculate duration at 1.33x speed
      const segment1Duration = ((TOTAL_FRAMES - LOGO_FRAME) / 60 / 1.33) * 1000;

      // Step 3: After first segment, wait 1 second, then play from frame 204 to frame 964 (16.07s)
      setTimeout(() => {
        lottie.playSegments([SECOND_PART_START, LOGO_FRAME_END], true);
      }, segment1Duration + 1000);  // +1 second pause between segments
    }, 1000);  // 1 second wait at the beginning

  }, []);

  useEffect(() => {
    if (shouldPlay && lottieRef.current && animationData) {
      runAnimationSequence();
    }
  }, [shouldPlay, animationData, runAnimationSequence]);

  if (!isEnabled || !animationData) return null;

  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        style={{
          width: "910px",  // Original size of animation2.json
          height: "188px",
          opacity: isReady ? 0.6 : 0,  // Hide until at correct frame, then match copyright text opacity
        }}
      />
    </div>
  );
}
