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
  const pivotX = 132;
  const pivotY = 103;

  return (
    <svg
      viewBox="5 25 210 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      {/* Static elements - main circles from Figma */}
      {/* Big circle: center (92.29, 81.74), r≈41 */}
      <circle cx="92.29" cy="81.74" r="41" stroke="black" strokeWidth="2" />
      {/* Small circle (top): center (130.09, 57.22), r≈27 */}
      <circle cx="130.09" cy="57.22" r="27" stroke="black" strokeWidth="2" />
      {/* Filled dot at intersection */}
      <circle cx="113.81" cy="73.15" r="5" fill="black" />

      {/* Animated balance scale - from Figma coordinates */}
      <g
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: `${pivotX}px ${pivotY}px`,
        }}
      >
        {/* Line connecting the two small balance circles */}
        <line
          x1="10"
          y1="75"
          x2="210"
          y2="133"
          stroke="black"
          strokeWidth="2"
        />
        {/* Left small circle */}
        <circle cx="24.34" cy="67.01" r="4" stroke="black" strokeWidth="2" />
        {/* Right small circle - above the line like the left one */}
        <circle cx="196.34" cy="117" r="4" stroke="black" strokeWidth="2" />
      </g>
    </svg>
  );
}
