"use client";

import { useEffect, useState } from "react";

export function AnimatedLogo() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.5; // Animation over 50vh

      const progress = Math.min(scrollY / maxScroll, 1);
      const newRotation = -(progress * 35); // 0 to -35 degrees (more rotation)

      setRotation(newRotation);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pivot point - where line crosses the big circle on the right side
  // Big circle: center (127, 120), r=60
  // Line intersection with circle on right: approximately (180, 148)
  const pivotX = 180;
  const pivotY = 148;

  return (
    <svg
      viewBox="20 28 270 158"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      {/* Static elements - main circles from Figma */}
      {/* Big circle: center (127, 120), r=60 */}
      <circle cx="127" cy="120" r="60" stroke="black" strokeWidth="2" />
      {/* Small circle: center (176, 73), r=39 */}
      <circle cx="176" cy="73" r="39" stroke="black" strokeWidth="2" />
      {/* Filled dot at intersection - original Figma position */}
      <circle cx="157.9" cy="99.9" r="7" fill="black" />

      {/* Animated balance scale - from Figma coordinates */}
      <g
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: `${pivotX}px ${pivotY}px`,
        }}
      >
        {/* Line: from (28, 103) to (287, 180) */}
        <line
          x1="28"
          y1="103"
          x2="287"
          y2="180"
          stroke="black"
          strokeWidth="2"
        />
        {/* Left small circle */}
        <circle cx="44.5" cy="92.3" r="6" stroke="black" strokeWidth="2" />
        {/* Right small circle */}
        <circle cx="273" cy="159" r="6" stroke="black" strokeWidth="2" />
      </g>
    </svg>
  );
}
